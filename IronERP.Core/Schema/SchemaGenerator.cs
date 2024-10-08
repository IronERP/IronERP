using System.ComponentModel.DataAnnotations;

namespace Core.Schema;

public class SchemaGenerator
{
    public Model GenerateSchema(Type type)
    {
        var model = new Model();

        model.Name = type.Name;
        model.Namespace = type.Namespace;
        model.Fields = new();
        
        foreach (var field in type.GetProperties())
        {
            var f = new Model.Field
            {
                Name = field.Name,
                Type = field.PropertyType.Name,
                Required = field.CustomAttributes.Any(a => a.AttributeType == typeof(RequiredAttribute))
            };

            var attr = Attribute.GetCustomAttribute(field, typeof(FieldLabelAttribute));
            if (attr is FieldLabelAttribute a)
            {
                f.Label = a.Name;
            }
            
            model.Fields.Add(f);
        }

        return model;
    }
}