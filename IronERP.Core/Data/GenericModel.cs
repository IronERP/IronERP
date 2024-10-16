using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace IronERP.Core.Data;

[BsonIgnoreExtraElements]
public class GenericModel : IModel
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    
    public string Name { get; set; }
}