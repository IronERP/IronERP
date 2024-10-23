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
public interface IModule
{
    /// <summary>
    /// Get the module name
    /// </summary>
    /// <returns></returns>
    string GetName();
    
    /// <summary>
    /// Get the module description
    /// </summary>
    /// <returns></returns>
    string GetDescription();
    
    /// <summary>
    /// Get a dictionary of (name, ICommand instance) pairs
    /// </summary>
    /// <returns></returns>
    IDictionary<string, ICommand> GetCommands();

    /// <summary>
    /// Dispatch a command
    /// </summary>
    /// <param name="commandName"></param>
    /// <param name="args"></param>
    /// <returns></returns>
    Task Dispatch(string commandName, string[] args);
}