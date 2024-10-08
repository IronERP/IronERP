using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace IronERP.Core.Data;

public class ModelDaoFactory
{
    private readonly MongoClient _client;
    private readonly IConfiguration _config;
    
    public ModelDaoFactory(MongoClient client, IConfiguration config)
    {
        _client = client;
        _config = config;
    }

    public ModelDao<T> Create<T>() where T : IModel
    {
        var db = _client.GetDatabase(_config.GetRequiredSection("MongoDB")["Database"]
                                     ?? throw new ArgumentException("missing configuration value MongoDB:Database"));
        
        return new ModelDao<T>(db);
    }
}