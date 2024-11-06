using System.ComponentModel.DataAnnotations;
using IronERP.Core.Attributes;
using IronERP.Core.Data;
using IronERP.Core.Schema;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace IronERP.Apps.CRM.Models;

[NoEditModel]
public class Customer : IModel
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [FieldLabel("ID")]
    public string? Id { get; set; }
    
    [Required]
    [FieldLabel("Customer Name")]
    [Search]
    public string Name { get; set; }
    
    [FieldLabel("Website")]
    public string Website { get; set; }
    
    [FieldLabel("Phone")]
    public string Phone { get; set; }
    
    #region Other Details
    [FieldLabel("Full Legal Name")]
    public string FullLegalName { get; set; }
    
    [ShowInOverview]
    [FieldLabel("National Company ID")]
    public string CompanyId { get; set; }
    
    [FieldLabel("National VAT ID")]
    public string VatId { get; set; }
    
    [FieldLabel("Internal Notes")]
    public string Notes { get; set; }
    #endregion Other Details
}