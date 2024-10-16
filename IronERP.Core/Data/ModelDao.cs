using MongoDB.Driver;

namespace IronERP.Core.Data;

public class ModelDao<T> where T : IModel
{
    private readonly IMongoDatabase _db;
    private readonly IMongoCollection<T> _collection;
    
    public ModelDao(IMongoDatabase db)
    {
        _db = db;
        _collection = _db.GetCollection<T>(typeof(T).Name);
    }

    public async Task<List<T>> GetAll() => await (await _collection.FindAsync(_ => true)).ToListAsync();

    public async Task<T?> Get(FilterDefinition<T> filter) =>
        await (await _collection.FindAsync(filter)).FirstOrDefaultAsync();

    public async Task Insert(T entity) =>
        await _collection.InsertOneAsync(entity);

    public async Task Delete(FilterDefinition<T> filter) =>
        await _collection.DeleteOneAsync(filter);

    public async Task<List<T>> FulltextSearch(string query) =>
        await (await _collection.FindAsync(Builders<T>.Filter.Text(query))).ToListAsync();
}