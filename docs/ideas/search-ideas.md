# Search Gift Ideas

Advanced search functionality for finding specific gift ideas on LovInIdeas.

## Endpoint

```http
GET /ideas/search
```

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | Yes | Search query (min 2 characters) |
| `page` | integer | No | Page number (default: 1) |
| `limit` | integer | No | Items per page (default: 20, max: 50) |
| `category` | string | No | Filter by category |
| `occasion` | string | No | Filter by occasion |
| `price_range` | string | No | Filter by price range |
| `recipient_type` | string | No | Filter by recipient type |
| `sort` | string | No | Sort order (relevance, newest, popular) |

## Search Features

### Full-Text Search
- Searches in title, description, and tags
- Supports partial word matching
- Case-insensitive search
- Automatic stemming (e.g., "running" matches "run")

### Search Operators

| Operator | Example | Description |
|----------|---------|-------------|
| `+` | `+bluetooth +speaker` | Both terms must be present |
| `-` | `bluetooth -expensive` | Exclude term |
| `"` | `"smart watch"` | Exact phrase match |
| `*` | `gift*` | Wildcard matching |

## Example Requests

### Basic Search

```http
GET /ideas/search?q=bluetooth speaker&limit=10
```

### Advanced Search with Filters

```http
GET /ideas/search?q="anniversary gift"&category=handmade&price_range=25_50&sort=popular
```

### Search with Operators

```http
GET /ideas/search?q=+tech +gadget -expensive&occasion=birthday
```

## Example Response

### Success (200 OK)

```json
{
  "success": true,
  "data": {
    "results": [
      {
        "id": "idea_9876543210",
        "title": "Portable Bluetooth Speaker with LED Lights",
        "description": "Amazing sound quality in a compact design. Perfect for outdoor parties or just listening at home...",
        "category": "electronics",
        "occasion": "birthday",
        "price_range": "25_50",
        "recipient_type": "friend",
        "tags": ["bluetooth", "speaker", "portable", "music", "party"],
        "images": [
          "https://cdn.lovinideas.com/ideas/idea_9876543210_1.jpg"
        ],
        "author": {
          "id": "usr_1234567890",
          "username": "musiclover",
          "full_name": "Alex Rivera",
          "avatar_url": "https://cdn.lovinideas.com/avatars/usr_1234567890.jpg"
        },
        "stats": {
          "likes": 32,
          "comments": 8,
          "saves": 15,
          "views": 245
        },
        "relevance_score": 0.95,
        "match_highlights": {
          "title": "Portable <mark>Bluetooth Speaker</mark> with LED Lights",
          "description": "Amazing sound quality... Perfect for outdoor parties...",
          "tags": ["<mark>bluetooth</mark>", "<mark>speaker</mark>", "portable"]
        },
        "created_at": "2026-03-20T14:30:00Z"
      }
    ],
    "search_info": {
      "query": "bluetooth speaker",
      "total_results": 47,
      "search_time_ms": 23,
      "suggestions": [
        "wireless speaker",
        "portable audio",
        "bluetooth headphones"
      ]
    },
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total_items": 47,
      "total_pages": 5,
      "has_next": true,
      "has_prev": false
    },
    "filters_applied": {
      "category": null,
      "occasion": null,
      "price_range": null,
      "sort": "relevance"
    }
  },
  "message": "Search completed successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Search Suggestions

### Get Search Suggestions

```http
GET /ideas/search/suggestions?q=bluet
```

**Response:**

```json
{
  "success": true,
  "data": {
    "suggestions": [
      "bluetooth",
      "bluetooth speaker",
      "bluetooth headphones",
      "bluetooth watch"
    ],
    "popular_searches": [
      "bluetooth speaker",
      "anniversary gift",
      "tech gadgets",
      "personalized gifts"
    ]
  },
  "message": "Suggestions retrieved successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Search Analytics

### Popular Search Terms

```http
GET /ideas/search/trending
```

**Response:**

```json
{
  "success": true,
  "data": {
    "trending_searches": [
      {
        "query": "anniversary gift",
        "searches_count": 1247,
        "trend": "up"
      },
      {
        "query": "tech gadgets",
        "searches_count": 892,
        "trend": "stable"
      },
      {
        "query": "personalized gifts",
        "searches_count": 743,
        "trend": "up"
      }
    ],
    "time_period": "last_7_days"
  },
  "message": "Trending searches retrieved successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Search Filters

### Category-Specific Search

```http
GET /ideas/search?q=wireless&category=electronics&sort=newest
```

### Price Range Search

```http
GET /ideas/search?q=luxury&price_range=over_500&sort=popular
```

### Occasion-Based Search

```http
GET /ideas/search?q=romantic&occasion=valentines&recipient_type=partner
```

## Error Responses

### Invalid Query (400 Bad Request)

```json
{
  "success": false,
  "error": {
    "code": "INVALID_SEARCH_QUERY",
    "message": "Search query is too short or invalid",
    "details": {
      "query": "Query must be at least 2 characters long",
      "allowed_characters": "Letters, numbers, spaces, and basic punctuation"
    }
  },
  "timestamp": "2026-03-22T16:30:00Z"
}
```

### No Results Found (200 OK)

```json
{
  "success": true,
  "data": {
    "results": [],
    "search_info": {
      "query": "nonexistent product",
      "total_results": 0,
      "search_time_ms": 12,
      "suggestions": [
        "Try broader terms",
        "Check spelling",
        "Remove filters"
      ]
    },
    "pagination": {
      "current_page": 1,
      "per_page": 20,
      "total_items": 0,
      "total_pages": 0
    }
  },
  "message": "No results found for your search",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Search Tips for Users

### Effective Search Strategies

1. **Use Specific Terms**: "wireless earbuds" vs "audio"
2. **Include Context**: "office desk gift" vs "desk"
3. **Try Synonyms**: "present", "gift", "surprise"
4. **Use Filters**: Combine search with category/price filters
5. **Check Spelling**: Use suggestions for misspelled terms

### Search Examples

| Goal | Search Query |
|------|-------------|
| Find tech gifts under $50 | `tech gadgets` + price_range: `under_50` |
| Anniversary gifts for wife | `"anniversary gift" +romantic +wife` |
| Office gifts for colleagues | `office colleague` + recipient_type: `colleague` |
| DIY personalized gifts | `+DIY +personalized +handmade` |

## Rate Limiting

- **Search requests**: 200 per hour per user
- **Suggestions**: 500 per hour per user
- **Trending**: 100 per hour per user

## Performance Optimization

### Search Performance Tips

1. **Use Specific Queries**: More specific = faster results
2. **Limit Results**: Don't request more than 50 items
3. **Cache Suggestions**: Cache autocomplete suggestions
4. **Debounce Input**: Wait for user to stop typing

### Search Index Updates

- New ideas are indexed within 5 minutes
- Search rankings update every hour
- Trending searches update every 6 hours

## cURL Examples

### Basic Search

```bash
curl "https://api.lovinideas.com/v1/ideas/search?q=bluetooth+speaker&limit=5"
```

### Advanced Search

```bash
curl "https://api.lovinideas.com/v1/ideas/search?q=\"smart+watch\"&category=electronics&price_range=100_250" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Get Suggestions

```bash
curl "https://api.lovinideas.com/v1/ideas/search/suggestions?q=anniv"
```