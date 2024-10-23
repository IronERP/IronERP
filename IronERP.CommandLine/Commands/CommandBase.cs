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
public abstract class CommandBase : ICommand
{
    protected string Name = string.Empty;
    
    protected string Description = string.Empty;

    protected readonly IDictionary<string, string> Flags = new Dictionary<string, string>();

    public string GetName() => Name;

    public string GetDescription() => Description;
    public IDictionary<string, string> GetFlags() => Flags;

    public abstract Task ExecuteAsync(string[] args);
}