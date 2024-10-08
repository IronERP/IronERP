using System.Reflection;
using IronERP.Core.Data;
using Microsoft.AspNetCore.Mvc;

namespace IronERP.Web.Controllers;

[ApiController]
[Route("/api/v1/[controller]/[action]")]
public class ConfigurationController : Controller
{
    [HttpGet]
    public async Task<IActionResult> Models()
    {
        var modelTypes = Assembly.GetExecutingAssembly()
            .GetTypes()
            .Where(t => typeof(IModel).IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract)
            .ToList();

        return Ok(modelTypes.Select(m => m.Name).ToList());
    }
}