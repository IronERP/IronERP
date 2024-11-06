namespace IronERP.Core.Schema;

/// <summary>
/// Fields marked with this attribute will be explicitly shown in all truncated overviews.
/// The ID and Name fields are always shown and don't need to be annotated this way!
/// </summary>
[AttributeUsage(AttributeTargets.Property)]
public class ShowInOverviewAttribute : Attribute
{
    
}