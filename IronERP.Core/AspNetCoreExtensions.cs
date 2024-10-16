using Core.HostedServices;
using Core.Search;
using Microsoft.Extensions.DependencyInjection;

namespace Core;

public static class AspNetCoreExtensions
{
    public const string GlobalSearchIndexName = "GlobalSearchIndex";
    
    public static IServiceCollection UseIronERP(this IServiceCollection services) => services
        .AddSingleton<ISearchService, MongoSearchService>()
        .AddSingleton<MeilisearchIndexerService>();
}