using IronERP.Core.Data;

namespace Core.Search;

public interface ISearchService
{
    
    Task<List<object>> Search(string searchTerm);
}