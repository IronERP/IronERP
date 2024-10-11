using IronERP.Core.Data;
using IronERP.Core.Schema;

namespace IronERP.CommandLine.Generator;

public class SchemaGenerator
{
    public void Generate(Type t)
    {
        var model = new Model
        {
            Name = t.Name,
            Namespace = t.Namespace,
            Fields = []
        };
        
        if (!typeof(IModel).IsAssignableFrom(t))
        {
            throw new ArgumentException($"Type '{t}' does not implement IModel");
        }

        foreach (var field in t.GetProperties())
        {
            model.Fields.Add(new()
            {
                Name = field.Name,
                Type = field.PropertyType.Name
            });
            
            
        }
    }
}