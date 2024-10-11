import {ApiClientCommon} from "@/lib/apiClient/ApiClientCommon";

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
    public static async LoadSchema(name: string): Promise<ModelSchema> {
        return await ApiClientCommon.FetchResource<ModelSchema>(`${name}/schema`);
    }
    
    public static async LoadGenericObjectList(name: string): Promise<any> {
        return await ApiClientCommon.FetchRaw(name);
    }
}