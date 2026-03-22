# Get Gift Ideas

Retrieve gift ideas from the LovInIdeas platform with filtering and pagination.

## Endpoint

```http
GET /ideas
```

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | integer | No | Page number (default: 1) |
| `limit` | integer | No | Items per page (default: 20, max: 100) |
| `category` | string | No | Filter by category |
| `occasion` | string | No | Filter by occasion |
| `price_range` | string | No | Filter by price range |
| `recipient_type` | string | No | Filter by recipient type |
| `tags` | string | No | Comma-separated tags to filter by |
| `author` | string | No | Filter by author username |
| `sort` | string | No | Sort order (see sorting options) |
| `search` | string | No | Search in title and description |

## Sorting Options

- `newest` - Most recently created (default)
- `oldest` - Oldest first
- `popular` - Most liked and commented
- `trending` - Popular in last 7 days
- `most_liked` - Highest number of likes
- `most_commented` - Most comments
- `alphabetical` - Title A-Z

## Example Request

```http
GET /ideas?category=electronics&occasion=birthday&price_range=50_100&sort=popular&limit=10
```

## Example Response

### Success (200 OK)

```json
{
  "success": true,
  "data": {
    "ideas": [
      {
        "id": "idea_9876543210",
        "title": "Wireless Charging Station with LED Display",
        "description": "Perfect tech gift for someone who has multiple devices. This charging station can charge phone, watch, and earbuds simultaneously...",
        "category": "electronics",
        "occasion": "birthday",
        "price_range": "50_100",
        "recipient_type": "colleague",
        "tags": ["tech", "wireless", "charging", "practical"],
        "images": [
          "https://cdn.lovinideas.com/ideas/idea_9876543210_1.jpg",
          "https://cdn.lovinideas.com/ideas/idea_9876543210_2.jpg"
        ],
        "purchase_links": [
          {
            "store": "Amazon",
            "url": "https://amazon.com/wireless-charging-station",
            "price": "$75"
          }
        ],
        "author": {
          "id": "usr_1234567890",
          "username": "techguru",
          "full_name": "Sarah Johnson",
          "avatar_url": "https://cdn.lovinideas.com/avatars/usr_1234567890.jpg"
        },
        "stats": {
          "likes": 45,
          "comments": 12,
          "saves": 23,
          "views": 342
        },
        "user_interaction": {
          "liked": false,
          "saved": false,
          "commented": false
        },
        "created_at": "2026-03-20T14:30:00Z",
        "updated_at": "2026-03-20T14:30:00Z"
      },
      {
        "id": "idea_9876543211",
        "title": "Smart Fitness Tracker with Heart Rate Monitor",
        "description": "Great for fitness enthusiasts or someone starting their health journey...",
        "category": "electronics",
        "occasion": "birthday",
        "price_range": "50_100",
        "recipient_type": "friend",
        "tags": ["fitness", "health", "wearable", "motivation"],
        "images": [
          "https://cdn.lovinideas.com/ideas/idea_9876543211_1.jpg"
        ],
        "purchase_links": [
          {
            "store": "Best Buy",
            "url": "https://bestbuy.com/fitness-tracker",
            "price": "$89"
          }
        ],
        "author": {
          "id": "usr_2345678901",
          "username": "fitnesspal",
          "full_name": "Mike Chen",
          "avatar_url": "https://cdn.lovinideas.com/avatars/usr_2345678901.jpg"
        },
        "stats": {
          "likes": 38,
          "comments": 8,
          "saves": 19,
          "views": 287
        },
        "user_interaction": {
          "liked": true,
          "saved": false,
          "commented": false
        },
        "created_at": "2026-03-19T09:15:00Z",
        "updated_at": "2026-03-19T09:15:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total_items": 156,
      "total_pages": 16,
      "has_next": true,
      "has_prev": false,
      "next_page": 2,
      "prev_page": null
    },
    "filters_applied": {
      "category": "electronics",
      "occasion": "birthday",
      "price_range": "50_100",
      "sort": "popular"
    }
  },
  "message": "Ideas retrieved successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Get Single Idea

### Endpoint

```http
GET /ideas/{idea_id}
```

### Example Response

```json
{
  "success": true,
  "data": {
    "idea": {
      "id": "idea_9876543210",
      "title": "Wireless Charging Station with LED Display",
      "description": "Perfect tech gift for someone who has multiple devices. This charging station can charge phone, watch, and earbuds simultaneously. The LED display shows the time and charging status. I bought this for my colleague's birthday and he uses it every day at his desk. The build quality is excellent and it supports fast charging for all major phone brands.",
      "category": "electronics",
      "occasion": "birthday",
      "price_range": "50_100",
      "recipient_type": "colleague",
      "tags": ["tech", "wireless", "charging", "practical", "office"],
      "images": [
        "https://cdn.lovinideas.com/ideas/idea_9876543210_1.jpg",
        "https://cdn.lovinideas.com/ideas/idea_9876543210_2.jpg",
        "https://cdn.lovinideas.com/ideas/idea_9876543210_3.jpg"
      ],
      "purchase_links": [
        {
          "store": "Amazon",
          "url": "https://amazon.com/wireless-charging-station",
          "price": "$75"
        },
        {
          "store": "Best Buy",
          "url": "https://bestbuy.com/charging-station-led",
          "price": "$79"
        }
      ],
      "author": {
        "id": "usr_1234567890",
        "username": "techguru",
        "full_name": "Sarah Johnson",
        "avatar_url": "https://cdn.lovinideas.com/avatars/usr_1234567890.jpg",
        "bio": "Tech enthusiast who loves finding practical gadgets"
      },
      "stats": {
        "likes": 45,
        "comments": 12,
        "saves": 23,
        "views": 342,
        "shares": 8
      },
      "user_interaction": {
        "liked": false,
        "saved": false,
        "commented": false,
        "rated": null
      },
      "created_at": "2026-03-20T14:30:00Z",
      "updated_at": "2026-03-20T14:30:00Z",
      "status": "published"
    }
  },
  "message": "Idea retrieved successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Filtering Examples

### By Multiple Tags

```http
GET /ideas?tags=romantic,personalized&occasion=anniversary
```

### By Author and Category

```http
GET /ideas?author=giftguru&category=handmade&sort=newest
```

### Search with Filters

```http
GET /ideas?search=bluetooth&category=electronics&price_range=under_25
```

## User Interaction Fields

When authenticated, each idea includes `user_interaction` object:

- `liked`: Boolean - Has user liked this idea
- `saved`: Boolean - Has user saved this idea
- `commented`: Boolean - Has user commented on this idea
- `rated`: Number|null - User's rating (1-5 stars) or null

## Error Responses

### Invalid Parameters (400 Bad Request)

```json
{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETERS",
    "message": "Invalid query parameters",
    "details": {
      "limit": "Limit must be between 1 and 100",
      "sort": "Invalid sort option"
    }
  },
  "timestamp": "2026-03-22T16:30:00Z"
}
```

### Idea Not Found (404 Not Found)

```json
{
  "success": false,
  "error": {
    "code": "IDEA_NOT_FOUND",
    "message": "Idea with ID 'idea_invalid' not found",
    "details": null
  },
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Rate Limiting

- **Authenticated users**: 500 requests per hour
- **Unauthenticated users**: 100 requests per hour

## cURL Examples

### Get Popular Electronics

```bash
curl "https://api.lovinideas.com/v1/ideas?category=electronics&sort=popular&limit=5"
```

### Get Specific Idea

```bash
curl "https://api.lovinideas.com/v1/ideas/idea_9876543210" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Search with Authentication

```bash
curl "https://api.lovinideas.com/v1/ideas?search=anniversary&price_range=25_50" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Performance Tips

1. **Use Pagination**: Don't request more than 50 items at once
2. **Cache Results**: Cache responses for better performance
3. **Specific Filters**: Use specific filters to reduce response size
4. **Authentication**: Authenticated requests get higher rate limits