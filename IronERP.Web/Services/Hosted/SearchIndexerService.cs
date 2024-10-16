using System.Reflection;
using Core.HostedServices;
using IronERP.Core.Data;
using MongoDB.Bson;
using MongoDB.Driver;

namespace IronERP.Web.Services.Hosted;

public class SearchIndexerService(MeilisearchIndexerService indexer,
    MongoClient mongoClient,
    ILogger<SearchIndexerService> log) : IHostedService
{
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        log.LogDebug("Starting indexer");
        
        var db = mongoClient.GetDatabase("IronERP");
        
        var modelTypes = Assembly.GetEntryAssembly()
            ?.GetTypes()
            .Where(t => typeof(IModel).IsAssignableFrom(t) && t is { IsInterface: false, IsAbstract: false })
            .ToList();

        if (modelTypes is null) return;
        
        log.LogDebug("Indexing documents for {Amount} model types...", modelTypes.Count);

        await indexer.Cleanup(cancellationToken);

        foreach (var modelType in modelTypes)
        {
            var collection = db.GetCollection<GenericModel>(modelType.Name);
            if (collection is null) return;
            
            var documents = await (await collection.FindAsync(t => true, cancellationToken: cancellationToken)).ToListAsync(cancellationToken);
            if (documents is null) return;
            
            log.LogDebug("Indexing {Amount} documents...", documents.Count);
                
            await indexer.IndexMany(documents.Select(d => new SearchIndexItem { Id = d.Id, Name = d.Name, Type = modelType.Name }).ToArray(), cancellationToken);
        }        
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }
}