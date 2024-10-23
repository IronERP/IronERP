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

using Spectre.Console;

namespace IronERP.CommandLine.Commands.Impl.Help;

[Obsolete("The CLI is obsolete because it's useless. It will be removed in a future version.")]
public class HelpCommand : CommandBase
{
    private IDictionary<string, IModule> _modules;
    
    public HelpCommand(IDictionary<string, IModule> modules)
    {
        _modules = modules;
        
        Name = "help";
        Description = "Prints this help text.";
    }
    
    public override Task ExecuteAsync(string[] args)
    {
        AnsiConsole.MarkupLine("[white]Available modules:[/]");
        foreach (var (modName, module) in _modules)
        {
            AnsiConsole.MarkupLine($"  [green]{modName}[/] ==> {module.GetDescription()}");
            foreach (var (cmdName, command) in module.GetCommands())
            {
                AnsiConsole.MarkupLine($"    [green]{modName}[/]:[cyan]{cmdName}[/] ==> {command.GetDescription()}");
                if (command.GetFlags().Count > 0)
                {
                    foreach (var (flagName, flagDescription) in command.GetFlags())
                    {
                        AnsiConsole.MarkupLine($"          [purple]{flagName}[/] - {flagDescription}");
                    }
                }
            }
        }
        
        return Task.CompletedTask;
    }
}