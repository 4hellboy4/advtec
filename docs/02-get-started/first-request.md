# Your first request

Let's make one call end to end and read the response carefully, so the rest of the docs feel familiar.

We'll fetch the first page of public gift ideas — no auth required.

## The call

```bash
curl "https://api.lovinideas.com/v1/ideas?limit=2"
```

Three things to notice:

1. **`https://api.lovinideas.com/v1`** is the base URL. Every endpoint hangs off this.
2. **`/ideas`** is the resource. Almost everything in this API is built around ideas.
3. **`?limit=2`** is a query parameter. Most list endpoints support `limit` and `page`.

## The response

```json
{
  "success": true,
  "data": {
    "ideas": [
      {
        "id": "idea_9876543210",
        "title": "Wireless Charging Station",
        "description": "Perfect tech gift for multiple devices...",
        "category": "electronics",
        "occasion": "birthday",
        "price_range": "50_100",
        "recipient_type": "colleague",
        "tags": ["tech", "wireless"],
        "author": { "username": "techguru" },
        "stats": { "likes": 45, "comments": 12 },
        "created_at": "2026-03-20T14:30:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 2,
      "total_items": 156,
      "has_next": true
    }
  },
  "timestamp": "2026-05-15T12:00:00Z"
}
```

Read this top-down:

- **`success`** — `true` means the request succeeded. On failure this flips to `false` and `data` is replaced by `error`.
- **`data.ideas`** — the array you actually came for.
- **`data.pagination`** — tells you whether there's more. Walk pages by incrementing `?page=`.
- **`timestamp`** — server time when the response was built. Useful for debugging clock skew.

Every successful response in the API has the same shape. Same for errors. This means you can write one response parser and reuse it everywhere.

## Now with auth

To create something, you'll need a token (see [authentication setup](/02-get-started/authentication-setup)) and the `Authorization` header:

```bash
curl -X POST "https://api.lovinideas.com/v1/ideas" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sourdough Starter Kit",
    "description": "Everything they need to bake their first loaf.",
    "category": "food_drinks",
    "occasion": "just_because",
    "price_range": "25_50",
    "recipient_type": "friend"
  }'
```

If the token is missing or expired, you'll get `401 Unauthorized` — that's your cue to log in again.

## What's next

You've covered the basics. Move on to building real features:

- [Manage ideas](/03-build/manage-ideas) — full CRUD walkthroughs.
- [Search and discover](/03-build/search-and-discover) — filters, sorting, trending.
