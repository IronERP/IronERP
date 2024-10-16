using Core.Configuration;
using IronERP.Core.Data;
using Meilisearch;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Core.HostedServices;

public class MeilisearchIndexerService
{
    public const string GlobalEntitySearchIndexName = "GlobalEntitySearchIndex";
    
    private readonly SearchConfig _searchConfig;

    private readonly MeilisearchClient _client;
    
    private ILogger<MeilisearchIndexerService> _logger;
    
    public MeilisearchIndexerService(IConfiguration config, ILogger<MeilisearchIndexerService> logger)
    {
        _searchConfig = config.GetRequiredSection("Search").Get<SearchConfig>() ?? throw new Exception();
        _client = new MeilisearchClient(_searchConfig.Backend.MeilisearchHost, _searchConfig.Backend.WriteKey);
        _logger = logger;
    }

    public async Task Index(SearchIndexItem item, CancellationToken cancel = default) => await IndexMany([ item ], cancel);

    public async Task IndexMany(SearchIndexItem[] items, CancellationToken cancel = default)
    {
        var index = _client.Index(GlobalEntitySearchIndexName);
        var tinfo = await index.AddDocumentsAsync(items, cancellationToken: cancel);
        //if (tinfo is not null) _ = WatchTask(tinfo, cancel);
    }

    public async Task Cleanup(CancellationToken cancel = default)
    {
        await _client.Index(GlobalEntitySearchIndexName).DeleteAsync(cancel);
    }

    private async Task WatchTask(TaskInfo task, CancellationToken cancel = default)
    {
        _logger.LogDebug("Enqueued task {Uid}, waiting for result...", task.TaskUid);

        while (cancel.IsCancellationRequested == false)
        {
            var updatedTask = _client.GetTaskAsync(task.TaskUid, cancel);

            if (updatedTask.IsCompleted)
            {
                _logger.LogDebug("Task {Uid} has completed with status {Status}", task.TaskUid, updatedTask.Status);
                return;
            }
            
            _logger.LogDebug("Task {Uid} is processing with status {Status}, will retry in 5 seconds...", task.TaskUid, updatedTask.Status);
            await Task.Delay(TimeSpan.FromSeconds(5), cancel);
        }
    }
}