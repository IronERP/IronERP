namespace IronERP.Core.Attributes;

/// <summary>
/// Models with this attribute won't have CRUD controller generated
/// </summary>
[AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
public class NoGenerateCrudAttribute : Attribute { }