﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Core.Schema;

public class Model
{
    public class Field
    {
        [BsonElement("name")]
        public string? Name { get; set; }
        
        [BsonElement("label")]
        public string? Label { get; set; }
        
        [BsonElement("type")]
        public string? Type { get; set; }
        
        [BsonElement("required")]
        public bool Required { get; set; }
    }
    
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    
    [BsonElement("name")]
    public string? Name { get; set; }
    
    [BsonElement("namespace")]
    public string? Namespace { get; set; }
    
    [BsonElement("fields")]
    public List<Field>? Fields { get; set; }
}