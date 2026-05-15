# Your first request

This document walks through a single API request and its response, identifying the components shared by all endpoints.

## Example request

Retrieve the first page of public ideas:

```bash
curl "https://api.lovinideas.com/v1/ideas?limit=2"
```

The request consists of three components:

| Component | Value | Description |
|-----------|-------|-------------|
| Base URL | `https://api.lovinideas.com/v1` | Common prefix for all endpoints; includes the API version |
| Path | `/ideas` | Resource being accessed |
| Query parameters | `?limit=2` | Optional filtering and pagination controls |

No authentication is required because this endpoint operates on public data.

## Example response

```json
{
  "success": true,
  "data": {
    "ideas": [
      {
        "id": "idea_9876543210",
        "title": "Wireless Charging Station",
        "description": "Tech gift compatible with multiple device types.",
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

### Response fields

| Field | Description |
|-------|-------------|
| `success` | Indicates whether the request succeeded |
| `data.ideas` | Array of idea objects |
| `data.pagination` | Pagination metadata; see [Pagination](/05-advanced/pagination) |
| `timestamp` | ISO 8601 timestamp of the response |

This envelope structure is consistent across all endpoints. Error responses follow the same shape, with `data` replaced by an `error` object.

## Authenticated request

To create a resource, include an authentication token in the `Authorization` header:

```bash
curl -X POST "https://api.lovinideas.com/v1/ideas" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sourdough Starter Kit",
    "description": "Complete set for home bread baking.",
    "category": "food_drinks",
    "occasion": "just_because",
    "price_range": "25_50",
    "recipient_type": "friend"
  }'
```

If the token is missing or has expired, the API returns `401 Unauthorized`. See [Authentication setup](/02-get-started/authentication-setup) for token handling.

## Related resources

- [Manage ideas](/03-build/manage-ideas) — task-oriented walkthroughs for idea operations.
- [Search and discover](/03-build/search-and-discover) — filtering and search patterns.
- [Pagination](/05-advanced/pagination) — paginated response handling.
