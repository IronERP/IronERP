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

using IronERP.Core.Configuration;
using IronERP.Core.Data;
using Meilisearch;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace IronERP.Core.HostedServices;

/// <summary>
/// A search adaptor for Meilisearch
/// </summary>
public class MeilisearchIndexerService
{
    private const string GlobalEntitySearchIndexName = "GlobalEntitySearchIndex";

    private readonly MeilisearchClient _client;
    
    private readonly ILogger<MeilisearchIndexerService> _logger;
    
    public MeilisearchIndexerService(IConfiguration config, ILogger<MeilisearchIndexerService> logger)
    {
        var searchConfig = config.GetRequiredSection("Search").Get<SearchConfig>() ?? throw new Exception();
        _client = new MeilisearchClient(searchConfig.Backend.MeilisearchHost, searchConfig.Backend.WriteKey);
        _logger = logger;
    }

    /// <summary>
    /// Add a document to the Meilisearch index
    /// </summary>
    /// <param name="item"></param>
    /// <param name="cancel"></param>
    public async Task Index(SearchIndexItem item, CancellationToken cancel = default) => await IndexMany([ item ], cancel);

    /// <summary>
    /// Add multiple documents to the Meilisearch index
    /// </summary>
    /// <param name="items"></param>
    /// <param name="cancel"></param>
    public async Task IndexMany(SearchIndexItem[] items, CancellationToken cancel = default)
    {
        var index = _client.Index(GlobalEntitySearchIndexName);
        await index.AddDocumentsAsync(items, cancellationToken: cancel);
    }

    /// <summary>
    /// Drop all indexes
    /// </summary>
    /// <param name="cancel"></param>
    public async Task Cleanup(CancellationToken cancel = default)
    {
        await _client.Index(GlobalEntitySearchIndexName).DeleteAsync(cancel);
    }
}