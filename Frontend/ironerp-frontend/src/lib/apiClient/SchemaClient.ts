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

import {ApiClientCommon} from "@/lib/apiClient/ApiClientCommon";

/**
 * A model schema structure
 */
export interface ModelSchema {
    id: string;
    name: string;
    namespace: string;
    fields: {
        name: string;
        label: string;
        type: string;
        required: boolean;
        secret: boolean;
        redacted: boolean;
    }[];
}

export class SchemaClient {
    /**
     * Load a schema definition from the backend
     * @param name
     * @constructor
     */
    public static async LoadSchema(name: string): Promise<ModelSchema> {
        return await ApiClientCommon.FetchResourceList<ModelSchema>(`${name}/_schema`);
    }

    /**
     * Fetch a list of entities of the specified model
     * @param name
     * @constructor
     */
    public static async LoadGenericObjectList(name: string): Promise<any> {
        return await ApiClientCommon.FetchRaw(name);
    }

    /**
     * Fetch an instance of a specific entity by ID
     * @param name
     * @param id
     * @constructor
     */
    public static async LoadGenericObject(name: string, id: string): Promise<any> {
        return await ApiClientCommon.FetchOneRaw(name, id);
    }

    /**
     * Post an instance of an entity
     * @param model
     * @param content
     * @constructor
     */
    public static async PostGenericObject(model: string, content: any) : Promise<number> {
        return await ApiClientCommon.PostObject(model, content);
    }
    
    public static async PutGenericObject(model: string, content: any) : Promise<any>
    {
        return await ApiClientCommon.PutRaw(model, content);
    }
}