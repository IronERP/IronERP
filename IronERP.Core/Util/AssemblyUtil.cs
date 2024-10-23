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

using System.Reflection;
using IronERP.Core.Data;

namespace IronERP.Core.Util;

/// <summary>
/// Utility functions for working with assemblies
/// </summary>
public static class AssemblyUtil
{
    /// <summary>
    /// Get a list of all loaded IModels
    /// </summary>
    /// <returns></returns>
    public static List<Type> ListAllModels() => Assembly.GetCallingAssembly()
        .GetTypes()
        .Where(t => typeof(IModel).IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract)
        .ToList();

    /// <summary>
    /// Get the assembly version
    /// </summary>
    /// <returns></returns>
    public static string? GetVersion() => Assembly.GetExecutingAssembly()
        .GetCustomAttribute<AssemblyInformationalVersionAttribute>()
        ?.InformationalVersion?.Split("+").FirstOrDefault();
}