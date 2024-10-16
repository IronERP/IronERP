using System.Net.Mime;
using Core.Search;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.IO;

namespace IronERP.Web.Controllers;

[ApiController]
[Route("/api/v1/_search")]
public class SearchController : ControllerBase
{
    private readonly ISearchService _searchService;
    
    public SearchController(ISearchService searchService)
    {
        _searchService = searchService;
    }

    [HttpGet]
    [Produces(MediaTypeNames.Application.Json)]
    public async Task<IActionResult> Search(string query)
    {
        var res = await _searchService.Search(query);
        return new ContentResult
        {
            ContentType = "application/json",
            Content = res.ToJson(writerSettings: new JsonWriterSettings { OutputMode = JsonOutputMode.CanonicalExtendedJson })
        };
    }
}