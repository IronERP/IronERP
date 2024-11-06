namespace IronERP.Core.Apps;

public interface IApplication
{
    string UserFriendlyName { get; }
    
    string ApplicationSlug { get; }
}