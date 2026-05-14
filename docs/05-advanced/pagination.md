# Pagination

Every list endpoint paginates the same way. Once you know the pattern, it works everywhere.

## The shape

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

Two parameters control it:

- `page` — 1-based page number (default `1`).
- `limit` — items per page, default `20`, max `100`.

## Walk every page

The safe pattern is to loop until `has_next` is `false`:

```javascript
async function fetchAll(endpoint, filters = {}) {
  const out = [];
  let page = 1;

  while (true) {
    const res = await api.request(
      `${endpoint}?${new URLSearchParams({ ...filters, page, limit: 100 })}`
    );
    out.push(...res.data.ideas);
    if (!res.data.pagination.has_next) break;
    page++;
  }

  return out;
}
```

Two reasons to prefer this over counting pages from `total_items / per_page`:
1. New items can appear between requests; trusting `has_next` is correct, while pre-calculating drifts.
2. If the API ever switches to cursor pagination, `has_next` keeps working.

## Picking a `limit`

| You're doing... | Good `limit` |
|------------------|--------------|
| Rendering a UI page | 20 (snappy) |
| Bulk export, throughput matters | 100 (max — fewer round trips) |
| Live feed, latency matters | 10–20 |

Bigger `limit` reduces request count but increases latency *per request*. Pick what fits.

## A note on deep pagination

Deep pages (page 500+) get slower. If you find yourself there often, you probably want a filter or search query instead of paginating through everything.
