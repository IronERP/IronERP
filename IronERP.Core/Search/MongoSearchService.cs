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

using IronERP.Core.Util;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;

namespace IronERP.Core.Search;

/// <summary>
/// ISearchService implementation for MongoDB
/// </summary>
public class MongoSearchService : ISearchService
{
    private readonly IMongoDatabase _database;
    private readonly Dictionary<string, IMongoCollection<BsonDocument>> _collections = new();
    
    public MongoSearchService(MongoClient mongoClient, IConfiguration config)
    {
        _database = mongoClient.GetDatabase(config.GetRequiredSection("MongoDB")["Database"] ?? throw new ArgumentException("missing configuration value 'MongoDB:Database'"));
        RegisterCollections();
    }

    /// <summary>
    /// Creates a list of collections to be searched from all currently loaded implementations of IModel
    /// </summary>
    private void RegisterCollections()
    {
        foreach (var modelType in AssemblyUtil.ListAllModels())
            _collections.Add(modelType.Name, _database.GetCollection<BsonDocument>(modelType.Name));
    }
    
    /// <summary>
    /// Perform a search across all collections
    /// </summary>
    /// <param name="searchTerm"></param>
    /// <returns></returns>
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