# Search

IronERP provides various search facilities in different contexts.

## Search Types

### Global Search

Using global search, you can search for any entity by Name.

### Model Search

Advanced search for entities under a specific model

## Backend

IronERP uses Meilisearch as the search engine. All relevant database contents
are automatically indexed on start.

!!!WARNING
    Indexing a large database can take a long time. For larger deployments, you should
    use persistent storage for your Meilisearch instance(s) and configure the IronERP
    indexer for incremental indexing.

## API

The backend does not directly expose any search-related endpoints. The frontend should
always talk directly to the search engine for optimal performance. Please refer to the
[Meilisearch Docs](https://www.meilisearch.com/docs) for more information.

## Configuration

This section outlines the relevant configuration options for the Search functionality. Below
is a complete example of the search configuration block with notes explaining each 
configuration option.

```javascript
{
    "Search": {
        "Backend": {
            "MeilisearchHost": "http://localhost:7700", // (1)
            "SearchKey": "abc123", // (2)
            "WriteKey": "456def"     // (3)
        },
        "Indexing": {
            "Strategy": "incremental" // (4)
        }
    }
}
```

1. The Meilisearch API host
2. The read-only search key that is passed to the frontend
3. The read-write key used for indexing documents
4. The indexing strategy. See below for more info.

### Indexing Strategy

IronERP supports two indexing strategies out of the box.

#### `full` (default)

With the `full` indexing strategy, IronERP will drop all indexes (if they exist) on
start and index all documents from the database. This is useful for development as it
helps ensure you always have fresh data in the search engine. Not recommended for
production deployments as this could make startup very slow with larger databases.

#### `incremental`

With the `incremental` strategy, IronERP will use the timestamps and IDs of indexed
documents and other heuristics to determine what data needs to be indexed and only indexes
documents that aren't already present in the search engine.

For optimal performance, your Meilisearch instance needs to be configured with persistent
storage.