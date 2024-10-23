namespace IronERP.Core.Schema;

/// <summary>
/// A redacted field is shown as a revealable password field in the UI
/// </summary>
[AttributeUsage(AttributeTargets.Property)]
public class RedactedFieldAttribute : Attribute
{
}