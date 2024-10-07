using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IronERP.CommandLine;

public class Entrypoint
{
    public async Task Configure(IServiceCollection serviceCollection, IConfiguration configuration)
    {
        
    }
    
    public async Task<int> Execute(string[] args, IServiceProvider provider)
    {
        return 0;
    }
}
