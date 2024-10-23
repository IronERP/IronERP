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

using MongoDB.Driver;

namespace IronERP.Core.Data;

/// <summary>
/// A generic data access object for MongoDB entitites
/// </summary>
/// <typeparam name="T"></typeparam>
public class ModelDao<T>(IMongoDatabase db) where T : IModel
{
    private readonly IMongoCollection<T> _collection = db.GetCollection<T>(typeof(T).Name);

    /// <summary>
    /// Get everything from this collection
    /// </summary>
    /// <returns></returns>
    public async Task<List<T>> GetAll() => await (await _collection.FindAsync(_ => true)).ToListAsync();

    /// <summary>
    /// Get one entity
    /// </summary>
    /// <param name="filter"></param>
    /// <returns></returns>
    public async Task<T?> Get(FilterDefinition<T> filter) =>
        await (await _collection.FindAsync(filter)).FirstOrDefaultAsync();

    /// <summary>
    /// Insert an entity
    /// </summary>
    /// <param name="entity"></param>
    /// <returns></returns>
    public async Task<bool> Insert(T? entity)
    {
        if (entity == null || entity.Id != null) return false;
        await _collection.InsertOneAsync(entity);
        return true;
    }
    
    /// <summary>
    /// Delete an entity
    /// </summary>
    /// <param name="filter"></param>
    public async Task Delete(FilterDefinition<T> filter) =>
        await _collection.DeleteOneAsync(filter);

    /// <summary>
    /// Perform a full-text search on this collection
    /// </summary>
    /// <param name="query"></param>
    /// <returns></returns>
    public async Task<List<T>> FulltextSearch(string query) =>
        await (await _collection.FindAsync(Builders<T>.Filter.Text(query))).ToListAsync();
}