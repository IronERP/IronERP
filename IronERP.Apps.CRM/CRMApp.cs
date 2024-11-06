using IronERP.Core.Apps;

namespace IronERP.Apps.CRM;

public class CRMApp : IApplication
{
    public string UserFriendlyName => "CRM";
    
    public string ApplicationSlug => "crm";
}