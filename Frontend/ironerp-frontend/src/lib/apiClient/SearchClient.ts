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
 * Search result structure
 */
export type SearchResult = {
    title: string;
    type: string;
    link: string;
};

export class SearchClient {
    public static allowedNameFields = [ "Name", "name", "Title", "title", "Label", "label", "Description", "description" ];

    /**
     * Try to infer which field is the Name
     * @param item
     * @constructor
     * @private
     */
    private static GetName(item: any): string {
        let name = item["_v"]["_id"]["$oid"] as string;
        
        this.allowedNameFields.forEach(field => {
            if(item["_v"][field] != null) name = item["_v"][field] as string;            
        });
        
        return name;
    }

    /**
     * Call meilisearch
     * @param query
     * @constructor
     */
    public static async Search(query: string): Promise<SearchResult[]> {
        const ret: SearchResult[] = [];
        
        const res = await ApiClientCommon.FetchRaw(`_search?query=${query}`);
        
        res.map((i: any) => {
            const itemId = i["_v"]["_id"]["$oid"];
            const entityType = i["_v"]["$_iet"];
            
            ret.push({
                title: this.GetName(i),
                type: entityType,
                link: `/entities/${entityType}/${itemId}/edit`
            });
        });
        
        return ret;
    }
}
