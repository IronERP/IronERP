using IronERP.Core.Attributes;
using IronERP.Core.Data;

namespace IronERP.Apps.CRM.Models;

[NoEditModel]
public class Customer : IModel
{
    public string? Id { get; set; }
    
    public string Name { get; set; }
    
    public string CustomerName { get; set; }
}