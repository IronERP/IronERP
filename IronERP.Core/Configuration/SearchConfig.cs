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

namespace IronERP.Core.Configuration;

/// <summary>
/// A container for the search section of appsettings
/// </summary>
public class SearchConfig
{
    public class BackendBlock
    {
        public string MeilisearchHost { get; set; }
        
        public string SearchKey { get; set; }
        
        public string WriteKey { get; set; }
    }

    public class FrontendBlock
    {
        public string Strategy  { get; set; }
    }
    
    public BackendBlock Backend { get; set; }
    
    public FrontendBlock Frontend { get; set; }
}