# Search and discover

This guide describes how to retrieve ideas using two approaches: filtered listing and full-text search.

## Filtered listing

Use `GET /ideas` to retrieve ideas matching one or more filter criteria:

```bash
curl "https://api.lovinideas.com/v1/ideas?category=electronics&occasion=birthday&sort=popular&limit=10"
```

### Available filters

| Parameter | Description |
|-----------|-------------|
| `category` | Category enumeration value |
| `occasion` | Occasion enumeration value |
| `price_range` | Price range enumeration value |
| `recipient_type` | Recipient type enumeration value |
| `sort` | One of `newest`, `oldest`, `popular` |
| `page` / `limit` | Pagination controls; maximum 100 items per page |

Filters combine with logical AND. Combining `category`, `recipient_type`, and `price_range` produces narrow result sets suitable for specific scenarios such as office gift selection.

## Full-text search

Use `GET /ideas/search` for keyword-based queries:

```bash
curl "https://api.lovinideas.com/v1/ideas/search?q=bluetooth+speaker&category=electronics&sort=popular"
```

### Query requirements

| Parameter | Requirement |
|-----------|-------------|
| `q` | Required; minimum 2 characters |
| `category`, `price_range`, `sort` | Optional; combined with the search query |

The search query is matched against `title`, `description`, and `tags`. Filters and search queries combine; they do not override each other.

### Sort behavior

| Sort value | Behavior |
|------------|----------|
| `relevance` (default) | Combines text match quality with engagement metrics |
| `newest` | Most recent first; ignores relevance |
| `popular` | Highest engagement first; ignores relevance |

## Trending content

The API does not provide a dedicated trending endpoint. Trending content can be approximated using the standard listing endpoint with `sort=popular` and an occasion filter:

```bash
curl "https://api.lovinideas.com/v1/ideas?occasion=valentines&sort=popular&limit=20"
```

## Pagination guidance

Always evaluate `pagination.has_next` before assuming a result set is complete:

```javascript
let page = 1;
const allIdeas = [];

while (true) {
  const response = await api.getIdeas({ category: 'books_media', page, limit: 50 });
  allIdeas.push(...response.data.ideas);
  if (!response.data.pagination.has_next) {
    break;
  }
  page++;
}
```

For bulk retrieval, use `limit=100` to minimize the number of requests. For details, see [Pagination](/05-advanced/pagination).

## Related resources

- [Ideas](/04-reference/ideas) — complete endpoint reference.
- [Pagination](/05-advanced/pagination) — pagination format and traversal patterns.
- [Social interactions](/03-build/social-interactions) — comments, likes, and ratings.
