using System.Reflection;
using System.Text.Json;
using IronERP.Core.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Core.Search;

public class MongoSearchService : ISearchService
{
    private readonly ILogger<MongoSearchService> _logger;
    private readonly IMongoDatabase _database;
    private readonly Dictionary<string, IMongoCollection<BsonDocument>> _collections = new();
    
    public MongoSearchService(MongoClient mongoClient, IConfiguration config, ILogger<MongoSearchService> logger)
    {
        _logger = logger;
        _database = mongoClient.GetDatabase(config.GetRequiredSection("MongoDB")["Database"] ?? throw new ArgumentException("missing configuration value 'MongoDB:Database'"));
        RegisterCollections();
        logger.LogInformation("MongoSearchService initialized");
    }

    private void RegisterCollections()
    {
        _logger.LogInformation("Registering collections");
        var modelTypes = Assembly.GetEntryAssembly()
            .GetTypes()
            .Where(t => typeof(IModel).IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract)
            .ToList();

        foreach (var modelType in modelTypes)
        {
            _logger.LogInformation("Registered collection {Name}", modelType.Name);
            _collections.Add(modelType.Name, _database.GetCollection<BsonDocument>(modelType.Name));
        }
    }
    
    public async Task<List<object>> Search(string searchTerm)
    {
        var allResults = new List<object>();
        foreach (var (name, col) in _collections)
        {
            var collectionResult =
                await (await col.FindAsync(Builders<BsonDocument>.Filter.Text(searchTerm))).ToListAsync();
            
            foreach (var item in collectionResult)
            {
                item.Add("$_iet", name);
            }
            
            allResults.AddRange(collectionResult);
        }
        return allResults;
    }
}