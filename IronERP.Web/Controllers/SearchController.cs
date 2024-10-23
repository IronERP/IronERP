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

using System.Net.Mime;
using IronERP.Core.Search;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.IO;

namespace IronERP.Web.Controllers;

/// <summary>
/// A controller for search functionality
/// </summary>
[ApiController]
[Route("/api/v1/_search")]
public class SearchController(ISearchService searchService) : ControllerBase
{
    /// <summary>
    /// Performs a full-text search across all database entities
    /// </summary>
    /// <param name="query"></param>
    /// <returns></returns>
    [HttpGet]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Search(string query)
    {
        var res = await searchService.Search(query);
        return new ContentResult
        {
            ContentType = "application/json",
            Content = res.ToJson(writerSettings: new JsonWriterSettings { OutputMode = JsonOutputMode.CanonicalExtendedJson })
        };
    }
}