using System.Reflection;
using Core.Util;
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
        foreach (var model in AssemblyUtil.ListAllModels())
        {
            Log.Debug("Registering automagic CRUD controller for type {Type}", model.Name);
            var controllerType = typeof(CrudController<>).MakeGenericType(model).GetTypeInfo();
            feature.Controllers.Add(controllerType);
        }
    }
}