/*
 * This file is part of IronERP.
 * 
 * IronERP is free software: you can redistribute it and/or modify it under the terms of 
 * the GNU General Public License as published by the Free Software Foundation, either 
 * version 3 of the License, or (at your option) any later version.
 * IronERP is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR 
 * PURPOSE. See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with IronERP. 
 * If not, see <https://www.gnu.org/licenses/>.
 */

using System.Reflection;
using IronERP.Core.HostedServices;
using IronERP.Core.Data;
using MongoDB.Driver;

namespace IronERP.Web.Services.Hosted;

/// <summary>
/// This service automatically creates Meilisearch indexes from database contents.
/// </summary>
/// <param name="indexer"></param>
/// <param name="mongoClient"></param>
/// <param name="log"></param>
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