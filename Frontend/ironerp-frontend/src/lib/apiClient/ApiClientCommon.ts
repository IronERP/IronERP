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

export class ApiClientCommon {
    private static apiBase = "http://localhost:5057/api/v1";

    /**
     * Fetch a generic resource identified by its type
     * @param resourceType
     * @constructor
     */
    public static async FetchResourceList<T>(resourceType: string): Promise<T> {
        const res = await fetch(`${this.apiBase}/${resourceType}`, {
            method: "GET",
            headers: { 'Accept': 'application/json' }
        });
        
        return (await res.json()) as T;
    }

    /**
     * Post a generic object to the API
     * @param resourceType
     * @param obj
     * @constructor
     */
    public static async PostObject(resourceType: string, obj: any) : Promise<number> {
        const res = await fetch(`${this.apiBase}/${resourceType}`, {
            method: "POST",
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        });
        
        return res.status;
    }

    /**
     * Fetch a raw object without a schema
     * @param resourceType
     * @constructor
     */
    public static async FetchRaw(resourceType: string): Promise<any> {
        const res = await fetch(`${this.apiBase}/${resourceType}`, {
            method: "GET",
            headers: { 'Accept': 'application/json' }
        });
        
        return (await res.json()) as any;
    }

    /**
     * Fetch a single generic object without a schema identified by an ID
     * @param resourceType
     * @param id
     * @constructor
     */
    public static async FetchOneRaw(resourceType: string, id: string): Promise<any> {
        const res = await fetch(`${this.apiBase}/${resourceType}/${id}`, {
            method: "GET",
            headers: { 'Accept': 'application/json' }
        });

        return (await res.json()) as any;
    }
    
    public static async PutRaw(resourceType: string, content: any) : Promise<any> {
        const res = await fetch(`${this.apiBase}/${resourceType}`, {
            method: "PUT",
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(content)
        });
        
        return (await res.json()) as any;
    }
}