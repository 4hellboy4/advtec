# Pagination

All collection endpoints in the API use a consistent page-based pagination scheme. This document specifies the request parameters, response format, and recommended traversal patterns.

## Request parameters

| Parameter | Type | Default | Maximum | Description |
|-----------|------|---------|---------|-------------|
| `page` | integer | `1` | — | Page number, starting from 1 |
| `limit` | integer | `20` | `100` | Number of items per page |

## Response format

Paginated responses include a `pagination` object alongside the data array:

```json
{
  "data": {
    "ideas": [ /* up to `limit` items */ ],
    "pagination": {
      "current_page": 1,
      "per_page": 20,
      "total_items": 156,
      "has_next": true
    }
  }
}
```

| Field | Description |
|-------|-------------|
| `current_page` | Page number returned in the current response |
| `per_page` | Number of items returned |
| `total_items` | Total number of items across all pages |
| `has_next` | `true` if additional pages exist; `false` otherwise |

## Traversal pattern

To retrieve all items, increment `page` until `has_next` is `false`:

```javascript
async function fetchAll(endpoint, filters = {}) {
  const results = [];
  let page = 1;

  while (true) {
    const params = new URLSearchParams({ ...filters, page, limit: 100 });
    const response = await api.request(`${endpoint}?${params}`);
    results.push(...response.data.ideas);
    if (!response.data.pagination.has_next) {
      break;
    }
    page++;
  }

  return results;
}
```

Relying on `has_next` is preferred over calculating the number of pages from `total_items / per_page`:

- New items may be inserted between requests, changing the total count.
- The implementation remains compatible if the API switches to cursor-based pagination.

## Choosing a page size

| Use case | Recommended `limit` |
|----------|---------------------|
| Interactive UI rendering | 20 |
| Bulk data retrieval | 100 (maximum) |
| Low-latency feeds | 10–20 |

Larger page sizes reduce the number of round trips but increase per-request latency.

## Deep pagination

Performance degrades for high page numbers (typically above page 500). For workloads that require deep traversal, prefer filtering or search queries that narrow the result set before pagination.

## Related resources

- [Rate limits](/05-advanced/rate-limits) — request rate constraints to consider during bulk retrieval.
- [Search and discover](/03-build/search-and-discover) — filtering and query patterns.
