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
}