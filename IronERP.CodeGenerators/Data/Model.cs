using System.Collections.Generic;
using Newtonsoft.Json;

namespace IronERP.CodeGenerators.Data;

public class Model
{
    public class Field
    {
      [JsonProperty("name")]
      public string Name { get; set; }
      
      [JsonProperty("label")]
      public string Label { get; set; }
      
      [JsonProperty("type")]
      public string Type { get; set; }
      
      [JsonProperty("required")]
      public bool Required { get; set; }
    }
    
    [JsonProperty("name")]
    public string Name { get; set; }
    
    [JsonProperty("namespace")]
    public string Namespace { get; set; }
    
    
    [JsonProperty("fields")]
    public List<Field> Fields { get; set; }
}