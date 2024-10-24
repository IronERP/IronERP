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

using IronERP.Core.Schema;
using IronERP.Core.Data;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace IronERP.Web.Controllers;

/// <summary>
/// This is a dynamic CRUD controller.
/// IronERP will create an instance of this controller for every loaded IModel.
/// </summary>
/// <typeparam name="T"></typeparam>
[ApiController]
[Route("/api/v1/[controller]")]
[GenericController]
public class CrudController<T>(ModelDaoFactory modelDaoFactory) : Controller where T : IModel
{
    private readonly ModelDao<T> _dao = modelDaoFactory.Create<T>();

    /// <summary>
    /// Get a list of all instances of an entity.
    /// </summary>
    /// <returns></returns>
    /// TODO: Pagination (#8)
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetAll()
    {
        var items = await _dao.GetAll();
        if (items.Count > 0)
            return Ok(items);

        return NotFound();
    }

    /// <summary>
    /// Gets a specific instance of an entity, identified by its ID
    /// </summary>
    /// <param name="Id"></param>
    /// <returns></returns>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get(string Id)
    {
        var item = await _dao.Get(Builders<T>.Filter.Eq("Id", Id));
        if (item is not null) return Ok(item);
        return NotFound();
    }

    /// <summary>
    /// Inserts an entity.
    /// Throws a bad request if the model validation fails
    /// </summary>
    /// <param name="model"></param>
    /// <returns></returns>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Insert(T model)
    {
        if(await _dao.Insert(model))
            return Ok();
        return BadRequest();
    }

    /// <summary>
    /// Updated an entity. The request entity must have an ID.
    /// Throws a bad request if the model validation fails
    /// Throws 404 if nothing exists with the specified ID. Depending on your use case,
    /// you should either consider this an error or an encouragement to do an insert instead.
    /// </summary>
    /// <param name="model"></param>
    /// <returns></returns>
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(T model)
    {
        if (model.Id is null) return BadRequest("Entity ID must be present on update");
        if (false == await _dao.Exists(model.Id)) return NotFound();
        
        var result = await _dao.Update(model);
        return Ok(result);
    }

    /// <summary>
    /// Deletes an entity by ID if it exists.
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Delete(string id)
    {
        await _dao.Delete(Builders<T>.Filter.Eq("Id", id));
        return NoContent();
    }

    /// <summary>
    /// Generated a schema for a model
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    [Route("_schema")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public Task<IActionResult> Schema()
    {
        var model = new SchemaGenerator().GenerateSchema(typeof(T));
        return Task.FromResult((IActionResult)Ok(model));
    }

    /// <summary>
    /// Performs fulltext search on this model only
    /// </summary>
    /// <param name="query"></param>
    /// <returns></returns>
    [HttpGet]
    [Route("_search")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> FulltextSearch(string query)
    {
        var found = await _dao.FulltextSearch(query);
        return Ok(found);
    }
}