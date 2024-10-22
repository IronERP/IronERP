export class ApiClientCommon {
    private static apiBase = "http://localhost:5057/api/v1";
    
    static async FetchResource<T>(resourceType: string): Promise<T> {
        const res = await fetch(`${this.apiBase}/${resourceType}`, {
            method: "GET",
            headers: { 'Accept': 'application/json' }
        });
        
        return (await res.json()) as T;
    }
    
    static async PostObject(resourceType: string, obj: any) : Promise<number> {
        const res = await fetch(`${this.apiBase}/${resourceType}`, {
            method: "POST",
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        });
        
        return res.status;
    }
    
    static async FetchRaw(resourceType: string): Promise<any> {
        const res = await fetch(`${this.apiBase}/${resourceType}`, {
            method: "GET",
            headers: { 'Accept': 'application/json' }
        });
        
        return (await res.json()) as any;
    }
    
    static async FetchOneRaw(resourceType: string, id: string): Promise<any> {
        const res = await fetch(`${this.apiBase}/${resourceType}/${id}`, {
            method: "GET",
            headers: { 'Accept': 'application/json' }
        });

        return (await res.json()) as any;
    }
    
    static async FetchFullRaw(uri: string): Promise<any> {
        const res = await fetch(`${this.apiBase}/${uri}`, {
            method: "GET",
            headers: { 'Accept': 'application/json' }
        });

        return (await res.json()) as any;
    }
}