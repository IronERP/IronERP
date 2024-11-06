namespace IronERP.Core.Attributes;

/// <summary>
/// Models marked with this attribute cannot be edited from the UI
/// </summary>
[AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
public class NoEditModelAttribute : Attribute { }