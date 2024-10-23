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

using System.ComponentModel.DataAnnotations;

namespace IronERP.Core.Schema;

public class SchemaGenerator
{
    /// <summary>
    /// Generates a schema from an IModel
    /// </summary>
    /// <param name="type"></param>
    /// <returns></returns>
    public Model GenerateSchema(Type type)
    {
        var model = new Model
        {
            Name = type.Name,
            Namespace = type.Namespace,
            Fields = []
        };

        foreach (var field in type.GetProperties())
        {
            var f = new Model.Field
            {
                Name = field.Name,
                Type = field.PropertyType.Name,
                Required = field.CustomAttributes.Any(a => a.AttributeType == typeof(RequiredAttribute)),
                Secret = field.CustomAttributes.Any(a => a.AttributeType == typeof(SecretFieldAttribute)),
                Redacted = field.CustomAttributes.Any(a => a.AttributeType == typeof(RedactedFieldAttribute))
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