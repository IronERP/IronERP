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

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace IronERP.Core.Schema;

/// <summary>
/// A POCO for the IronERP Model Schema
/// </summary>
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
        
        [BsonElement("secret")]
        public bool Secret { get; set; }
        
        [BsonElement("redacted")]
        public bool Redacted { get; set; }
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