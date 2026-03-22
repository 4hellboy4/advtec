# Gift Ideas

CRUD operations for gift ideas.

## Create Idea

### Endpoint
```http
POST /ideas
Authorization: Bearer <token>
```

### Request Body
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Idea title (5-200 chars) |
| `description` | string | Yes | Description (20-2000 chars) |
| `category` | string | Yes | Category (see below) |
| `occasion` | string | Yes | Occasion (see below) |
| `price_range` | string | Yes | Price range |
| `recipient_type` | string | Yes | Recipient type |
| `tags` | array | No | Tags (max 10) |

### Categories
`electronics`, `books_media`, `fashion`, `home_garden`, `food_drinks`, `experiences`, `handmade`, `sports_fitness`, `beauty_health`, `toys_games`

### Occasions  
`birthday`, `anniversary`, `wedding`, `graduation`, `holiday`, `valentines`, `mothers_day`, `fathers_day`, `just_because`

### Price Ranges
`under_25`, `25_50`, `50_100`, `100_250`, `250_500`, `over_500`

### Recipient Types
`partner`, `family`, `friend`, `colleague`, `boss`, `teacher`, `child`, `elderly`, `anyone`

### Example Request
```json
{
  "title": "Personalized Star Map for Anniversary",
  "description": "Custom star map showing stars on your special day. High-quality print, ready to frame. Perfect romantic gift.",
  "category": "handmade",
  "occasion": "anniversary", 
  "price_range": "25_50",
  "recipient_type": "partner",
  "tags": ["romantic", "personalized", "astronomy"]
}
```

### Response (201 Created)
```json
{
  "success": true,
  "data": {
    "idea": {
      "id": "idea_9876543210",
      "title": "Personalized Star Map for Anniversary",
      "description": "Custom star map showing stars on your special day...",
      "category": "handmade",
      "occasion": "anniversary",
      "price_range": "25_50",
      "recipient_type": "partner",
      "tags": ["romantic", "personalized", "astronomy"],
      "author": {
        "id": "usr_1234567890",
        "username": "giftguru"
      },
      "stats": {
        "likes": 0,
        "comments": 0
      },
      "created_at": "2026-03-22T16:30:00Z"
    }
  }
}
```

## Get Ideas

### Endpoint
```http
GET /ideas
```

### Query Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number (default: 1) |
| `limit` | integer | Items per page (default: 20, max: 100) |
| `category` | string | Filter by category |
| `occasion` | string | Filter by occasion |
| `price_range` | string | Filter by price range |
| `sort` | string | Sort: `newest`, `oldest`, `popular` |
| `search` | string | Search in title/description |

### Example Request
```http
GET /ideas?category=electronics&occasion=birthday&limit=10&sort=popular
```

### Response (200 OK)
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
        "tags": ["tech", "wireless", "charging"],
        "author": {
          "username": "techguru"
        },
        "stats": {
          "likes": 45,
          "comments": 12
        },
        "created_at": "2026-03-20T14:30:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total_items": 156,
      "has_next": true
    }
  }
}
```

## Get Single Idea

### Endpoint
```http
GET /ideas/{idea_id}
```

### Response
Returns single idea with full details including comments and stats.

## Search Ideas

### Endpoint
```http
GET /ideas/search?q=<query>
```

### Query Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| `q` | string | Search query (min 2 chars) |
| `category` | string | Filter by category |
| `price_range` | string | Filter by price range |
| `sort` | string | Sort: `relevance`, `newest`, `popular` |

### Example
```http
GET /ideas/search?q=bluetooth+speaker&category=electronics&sort=popular
```

## Update Idea

### Endpoint
```http
PUT /ideas/{idea_id}
Authorization: Bearer <token>
```

Only idea author can update. Include fields to change:

```json
{
  "title": "Updated Title",
  "description": "Updated description"
}
```

## Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Invalid input data |
| `IDEA_NOT_FOUND` | Idea doesn't exist |
| `UNAUTHORIZED_UPDATE` | Not idea author |
| `DUPLICATE_TITLE` | Title already exists |