using IronERP.Web.Controllers;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace IronERP.Web;

[AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
public class GenericControllerAttribute : Attribute, IControllerModelConvention
{
    public void Apply(ControllerModel controller)
    {
        if (!controller.ControllerType.IsGenericType ||
            controller.ControllerType.GetGenericTypeDefinition() != typeof(CrudController<>))
        {
            return;
        }
        
        Type entityType = controller.ControllerType.GetGenericArguments()[0];
        
        controller.ControllerName = entityType.Name;
        controller.RouteValues["Controller"] = entityType.Name;
    }
}