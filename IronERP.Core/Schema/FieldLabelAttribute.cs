namespace IronERP.Core.Schema;

[AttributeUsage(AttributeTargets.Property)]
public class FieldLabelAttribute(string name) : Attribute
{
    public string Name = name;
}