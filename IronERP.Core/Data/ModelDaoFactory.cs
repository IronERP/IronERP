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

using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace IronERP.Core.Data;

/// <summary>
/// The model DAO factory creates MongoDB data access objects for IModel implementations
/// </summary>
public class ModelDaoFactory(MongoClient client, IConfiguration config)
{
    /// <summary>
    /// Create a ModelDato for Type
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <returns></returns>
    /// <exception cref="ArgumentException"></exception>
    public ModelDao<T> Create<T>() where T : IModel
    {
        var db = client.GetDatabase(config.GetRequiredSection("MongoDB")["Database"]
                                     ?? throw new ArgumentException("missing configuration value MongoDB:Database"));
        
        return new ModelDao<T>(db);
    }
}