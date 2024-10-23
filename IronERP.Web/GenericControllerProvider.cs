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

using System.Reflection;
using IronERP.Core.Util;
using IronERP.Web.Controllers;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Mvc.Controllers;
using Serilog;

namespace IronERP.Web;

/// <summary>
/// A feature provider that dynamically created CRUD controllers for all loaded models.
/// </summary>
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