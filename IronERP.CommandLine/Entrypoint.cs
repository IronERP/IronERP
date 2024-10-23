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

using IronERP.CommandLine.Commands;
using IronERP.CommandLine.Commands.Impl.Help;
using IronERP.CommandLine.Commands.Impl.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using Spectre.Console;

namespace IronERP.CommandLine;

/// <summary>
/// An entrypoint class for the IronERP CLI.
/// </summary>
[Obsolete("The CLI is obsolete because it's useless. It will be removed in a future version.")]
public class Entrypoint
{
    private Dictionary<string, IModule> _modules = new();

    private void AddModule(IModule module) => _modules.Add(module.GetName(), module);

    public async Task PreConfigure(IServiceCollection serviceCollection, IConfiguration config)
    {
        
    }
    
    public async Task Configure(IServiceProvider serviceProvider, IConfiguration configuration)
    {
        var mongoClient = serviceProvider.GetRequiredService<MongoClient>();
        var databaseName = configuration.GetRequiredSection("MongoDB")["Database"] 
                           ?? throw new ArgumentException("missing configuration value 'MongoDB:Database'");
        
        AddModule(new HelpModule(_modules));
        AddModule(new ModelsModule(mongoClient, databaseName));
    }
    
    public async Task<int> Execute(string[] args, IServiceProvider provider)
    {
        if(args.Length < 1) throw new ArgumentException("You must specify a command");
        
        var split = args[0].Split(":");

        if (!_modules.TryGetValue(split[0], out var module))
            throw new ArgumentException($"no such module '{split[0]}'");

        if (split.Length < 2)
        {
            AnsiConsole.MarkupLine("[bold red]no command specified[/]");
            AnsiConsole.MarkupLine($"[white]Available commands for module[/] [green]{split[0]}[/][white]:[/]");
            foreach (var (cmdName, cmd) in module.GetCommands())
            {
                AnsiConsole.MarkupLine($"  [green]{module.GetName()}[/]:[cyan]{cmdName}[/] ==> {cmd.GetDescription()}");
            }

            return 0;
        }
        
        try
        {
            await module.Dispatch(split[1], args);
        }
        catch (NoSuchCommandException ex)
        {
            Console.WriteLine(ex.Message);
        }

        return 0;
    }
}
