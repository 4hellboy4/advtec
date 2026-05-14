# Search and discover

Two flavours of finding things: **browse** (list ideas with filters) and **search** (full-text query, optionally with the same filters).

## Browse with filters

```bash
curl "https://api.lovinideas.com/v1/ideas?category=electronics&occasion=birthday&sort=popular&limit=10"
```

Useful parameters:

| Parameter | What it does |
|-----------|--------------|
| `category` | One of the category enums (`electronics`, `handmade`, …) |
| `occasion` | `birthday`, `anniversary`, `wedding`, … |
| `price_range` | `under_25`, `25_50`, … |
| `recipient_type` | `partner`, `colleague`, `child`, … |
| `sort` | `newest`, `oldest`, `popular` |
| `page` / `limit` | Pagination, max 100 per page |

Combine them freely. `category=electronics&recipient_type=colleague&price_range=50_100` is the classic "office birthday" query.

## Full-text search

```bash
curl "https://api.lovinideas.com/v1/ideas/search?q=bluetooth+speaker&category=electronics&sort=popular"
```

`q` is required and must be at least two characters. It searches across `title`, `description`, and `tags`. You can still apply filters on top — search and filter combine, they don't conflict.

When you sort by `relevance` (the default for search), the ranking takes into account text match quality *and* engagement (likes, comments). When you sort by `popular`, relevance is ignored — pure popularity.

## Trending ideas

There isn't a dedicated `/trending` endpoint. Instead, use the regular list with a tight time window:

```bash
curl "https://api.lovinideas.com/v1/ideas?occasion=valentines&sort=popular&limit=20"
```

For "what's hot right now", filter by the relevant occasion and sort by popularity.

## Pagination, in practice

Always check `pagination.has_next` before assuming you've seen everything:

```javascript
let page = 1;
let allIdeas = [];

while (true) {
  const res = await api.getIdeas({ category: 'books_media', page, limit: 50 });
  allIdeas.push(...res.data.ideas);
  if (!res.data.pagination.has_next) break;
  page++;
}
```

For large pulls, prefer the maximum `limit=100` to halve your request count.

## What's next

- [Social interactions](/03-build/social-interactions) — comments, likes, ratings.
- [Pagination patterns](/05-advanced/pagination) — cursor vs page, when each makes sense.
