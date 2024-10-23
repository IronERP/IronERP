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

using IronERP.Core.Data;
using IronERP.Core.HostedServices;
using IronERP.Core.Search;
using Microsoft.Extensions.DependencyInjection;

namespace IronERP.Core;

/// <summary>
/// ASP extension method
/// </summary>
public static class AspNetCoreExtensions
{
    /// <summary>
    /// A convenience extension method that configures all parts of the IronERP core
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    public static IServiceCollection UseIronERP(this IServiceCollection services) => services
        .AddSingleton<ISearchService, MongoSearchService>()
        .AddSingleton<MeilisearchIndexerService>()
        .AddSingleton<ModelDaoFactory>();
}