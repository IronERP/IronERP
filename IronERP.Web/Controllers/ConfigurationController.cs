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

using IronERP.Core.Attributes;
using IronERP.Core.Util;
using IronERP.Web.Data.Responses;
using Microsoft.AspNetCore.Mvc;

namespace IronERP.Web.Controllers;

/// <summary>
/// This controller provides utility endpoints for the Frontend
/// </summary>
[ApiController]
[Route("/api/v1/[controller]/[action]")]
public class ConfigurationController : Controller
{
    /// <summary>
    /// Returns a list of available model types
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public Task<IActionResult> Models() => Task.FromResult((IActionResult)Ok(AssemblyUtil.ListAllModels().Select(m => m.Name).ToList()));

    /// <summary>
    /// Returns a list of available model types
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public Task<IActionResult> ModelsV2()
    {
        var models = AssemblyUtil.ListAllModels();
        var o = new List<SimpleModelSpec>();
        
        models.ForEach(m => o.Add(new() { Name = m.Name, IsGenerated = m.CustomAttributes.Any(a => a.AttributeType == typeof(NoEditModelAttribute))}));

        return Task.FromResult<IActionResult>(Ok(o));
    }
}