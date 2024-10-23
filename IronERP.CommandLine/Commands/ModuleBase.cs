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

namespace IronERP.CommandLine.Commands;

[Obsolete("The CLI is obsolete because it's useless. It will be removed in a future version.")]
public class ModuleBase : IModule
{
    protected string Name = string.Empty;
    
    protected string Description = string.Empty;

    private Dictionary<string, ICommand> _commands = new();

    public string GetName() => Name;

    public string GetDescription() => Description;
    
    protected void AddCommand(string name, ICommand command) => _commands.Add(name, command);

    protected void AddCommand(ICommand command) => _commands.Add(command.GetName(), command);

    public IDictionary<string, ICommand> GetCommands() => _commands;
    
    public async Task Dispatch(string commandName, string[] args)
    {
        if (!_commands.TryGetValue(commandName, out var command))
        {
            throw new NoSuchCommandException($"no such command '{commandName}' in module '{Name}");
        }

        await command.ExecuteAsync(args);
    }
}