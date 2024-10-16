import {ApiClientCommon} from "@/lib/apiClient/ApiClientCommon";

export type SearchResult = {
    title: string;
    type: string;
    link: string;
};


export class SearchClient {
    public static allowedNameFields = [ "Name", "name", "Title", "title", "Label", "label", "Description", "description" ];
    
    private static GetName(item: any): string {
        let name = item["_v"]["_id"]["$oid"] as string;
        
        this.allowedNameFields.forEach(field => {
            if(item["_v"][field] != null) name = item["_v"][field] as string;            
        });
        
        return name;
    }
    
    public static async Search(query: string): Promise<SearchResult[]> {
        const ret: SearchResult[] = [];
        
        const res = await ApiClientCommon.FetchFullRaw(`_search?query=${query}`);
        
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

/*
[
  {
    "_t": "MongoDB.Bson.BsonDocument, MongoDB.Bson",
    "_v": {
      "_id": {
        "$oid": "670ceb79f6fde499a490d8dc"
      },
      "Name": "Goodbye World",
      "Secret": "secret",
      "Redacted": "redacted",
      "$_iet": "Demo"
    }
  },
  {
    "_t": "MongoDB.Bson.BsonDocument, MongoDB.Bson",
    "_v": {
      "_id": {
        "$oid": "6705289b0b6a3c1bf751c6de"
      },
      "Name": "Hello World",
      "Secret": "Secret",
      "Redacted": "Redacted",
      "$_iet": "Demo"
    }
  }
]
 */