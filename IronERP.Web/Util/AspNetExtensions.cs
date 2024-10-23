/*
 * This file is part of IronERP.
 * 
 * IronERP is free software: you can redistribute it and/or modify it under the terms of 
 * the GNU General Public License as published by the Free Software Foundation, either 
 * version 3 of the License, or (at your option) any later version.
 * IronERP is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR 
 * PURPOSE. See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with IronERP. 
 * If not, see <https://www.gnu.org/licenses/>.
 */

using IronERP.Core.Util;
using IronERP.Web.Controllers;

namespace IronERP.Web.Util;

/// <summary>
/// ASP configuration extension method for a cleaner Program.cs
/// </summary>
public static class AspNetExtensions
{
    /// <summary>
    /// Enable the dynamic CRUD controller functionality
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
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