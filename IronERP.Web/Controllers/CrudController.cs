using IronERP.Core.Data;
using Microsoft.AspNetCore.Mvc;

namespace IronERP.Web.Controllers;

[ApiController]
[Route("/api/v1/[controller]")]
[GenericController]
public class CrudController<T> : Controller where T : IModel
{
    private readonly ModelDaoFactory _modelDaoFactory;
    private readonly ModelDao<T> _dao;
    private ILogger<CrudController<T>> _log;

    public CrudController(ModelDaoFactory modelDaoFactory, ILogger<CrudController<T>> log)
    {
        _modelDaoFactory = modelDaoFactory;
        _dao = _modelDaoFactory.Create<T>();
        _log = log;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _dao.GetAll();
        if (items.Count > 0)
            return Ok(items);
        else
            return Ok("Hello");
    }
}