using Core.Util;
using IronERP.Web.Controllers;

namespace IronERP.Web.Util;

public static class AspNetExtensions
{
    public static IServiceCollection UseDynamicControllers(this IServiceCollection services)
    {
        foreach (var model in AssemblyUtil.ListAllModels())
        {
            var controllerType = typeof(CrudController<>).MakeGenericType(model);
            services.AddTransient(controllerType);
        }

        return services;
    }
}