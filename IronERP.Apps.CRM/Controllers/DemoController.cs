using Microsoft.AspNetCore.Mvc;

namespace IronERP.Apps.CRM.Controllers;

[ApiController]
[Route("/api/v1/crm/[controller]/[action]")]
class DemoController : Controller
{
    
    public IActionResult Index()
    {
        return Ok("Hello World CRM");
    }
}