using System.Numerics;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace IronERP.Core.Data;

public class Currency : IModel
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    
    public string Name { get; set; }
    
    public string MajorSymbol { get; set; }
    
    public string MinorSymbol { get; set; }
    
    public int MinimumFraction { get; set; }
    
    public int Precision { get; set; }
}