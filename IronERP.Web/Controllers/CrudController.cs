using Core.Schema;
using IronERP.Core.Data;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Newtonsoft.Json.Schema.Generation;

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

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(string Id)
    {
        var item = await _dao.Get(Builders<T>.Filter.Eq("Id", Id));
        return Ok(item);
    }

    [HttpPost]
    public async Task<IActionResult> Insert(T model)
    {
        await _dao.Insert(model);
        return Ok();
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(string id)
    {
        await _dao.Delete(Builders<T>.Filter.Eq("Id", id));
        return Ok();
    }

    [HttpGet]
    [Route("schema")]
    //[Produces(System.Net.Mime.MediaTypeNames.Application.Json)]
    public async Task<IActionResult> Schema()
    {
        var model = new SchemaGenerator().GenerateSchema(typeof(T));
        return Ok(model);
    }
}