namespace Core.Configuration;

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