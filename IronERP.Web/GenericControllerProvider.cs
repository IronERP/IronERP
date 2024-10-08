using System.Reflection;
using IronERP.Core.Data;
using IronERP.Web.Controllers;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Mvc.Controllers;
using Serilog;

namespace IronERP.Web;

public class GenericControllerProvider : IApplicationFeatureProvider<ControllerFeature>
{
    public void PopulateFeature(IEnumerable<ApplicationPart> parts, ControllerFeature feature)
    {
        var modelTypes = Assembly.GetExecutingAssembly()
            .GetTypes()
            .Where(t => typeof(IModel).IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract)
            .ToList();
        
        foreach (var model in modelTypes)
        {
            Log.Debug("Registering automagic CRUD controller for type {Type}", model.Name);
            var controllerType = typeof(CrudController<>).MakeGenericType(model).GetTypeInfo();
            feature.Controllers.Add(controllerType);
        }
    }
}