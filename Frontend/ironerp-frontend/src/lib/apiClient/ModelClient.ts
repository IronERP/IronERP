import {ApiClientCommon} from "@/lib/apiClient/ApiClientCommon";

export class ModelClient {
    public static async ListModels(): Promise<string[]> {
        return await ApiClientCommon.FetchResource<string[]>("Configuration/Models");
    }
}