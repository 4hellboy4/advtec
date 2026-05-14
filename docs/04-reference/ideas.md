# Ideas reference

Full CRUD reference for gift ideas. For a task-oriented walkthrough, see [manage ideas](/03-build/manage-ideas).

## Create an idea

```http
POST /ideas
Authorization: Bearer <token>
```

### Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | 5–200 characters |
| `description` | string | Yes | 20–2000 characters |
| `category` | string | Yes | One of the categories below |
| `occasion` | string | Yes | One of the occasions below |
| `price_range` | string | Yes | One of the price ranges below |
| `recipient_type` | string | Yes | One of the recipient types below |
| `tags` | array of string | No | Up to 10 tags |

### Enum values

**Categories:** `electronics`, `books_media`, `fashion`, `home_garden`, `food_drinks`, `experiences`, `handmade`, `sports_fitness`, `beauty_health`, `toys_games`

**Occasions:** `birthday`, `anniversary`, `wedding`, `graduation`, `holiday`, `valentines`, `mothers_day`, `fathers_day`, `just_because`

**Price ranges:** `under_25`, `25_50`, `50_100`, `100_250`, `250_500`, `over_500`

**Recipient types:** `partner`, `family`, `friend`, `colleague`, `boss`, `teacher`, `child`, `elderly`, `anyone`

### Example request

```json
{
  "title": "Personalized Star Map for Anniversary",
  "description": "Custom star map showing the stars on your special day. High-quality print, ready to frame.",
  "category": "handmade",
  "occasion": "anniversary",
  "price_range": "25_50",
  "recipient_type": "partner",
  "tags": ["romantic", "personalized", "astronomy"]
}
```

### Response — `201 Created`

```json
{
  "success": true,
  "data": {
    "idea": {
      "id": "idea_9876543210",
      "title": "Personalized Star Map for Anniversary",
      "description": "Custom star map showing the stars on your special day...",
      "category": "handmade",
      "occasion": "anniversary",
      "price_range": "25_50",
      "recipient_type": "partner",
      "tags": ["romantic", "personalized", "astronomy"],
      "author": { "id": "usr_1234567890", "username": "giftguru" },
      "stats": { "likes": 0, "comments": 0 },
      "created_at": "2026-03-22T16:30:00Z"
    }
  }
}
```

## List ideas

```http
GET /ideas
```

### Query parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Default 1 |
| `limit` | integer | Default 20, max 100 |
| `category` | string | Filter by category enum |
| `occasion` | string | Filter by occasion enum |
| `price_range` | string | Filter by price range enum |
| `recipient_type` | string | Filter by recipient type enum |
| `sort` | string | `newest`, `oldest`, `popular` |
| `search` | string | Inline keyword search |

### Response — `200 OK`

```json
{
  "success": true,
  "data": {
    "ideas": [ /* idea objects */ ],
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total_items": 156,
      "has_next": true
    }
  }
}
```

## Get a single idea

```http
GET /ideas/{idea_id}
```

Returns one idea with full details, plus the first page of comments.

## Search ideas

```http
GET /ideas/search?q={query}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `q` | string | Required, min 2 chars |
| `category` | string | Same enum as filter |
| `price_range` | string | Same enum as filter |
| `sort` | string | `relevance` (default), `newest`, `popular` |

## Update an idea

```http
PUT /ideas/{idea_id}
Authorization: Bearer <token>
```

Send only fields you want to change. Only the author can update.

```json
{
  "title": "Updated title",
  "description": "Updated description"
}
```

## Delete an idea

```http
DELETE /ideas/{idea_id}
Authorization: Bearer <token>
```

Soft delete for 30 days, then permanent.

## Error codes

| Code | When you'll see it |
|------|---------------------|
| `VALIDATION_ERROR` | A field failed validation |
| `IDEA_NOT_FOUND` | No idea with that ID |
| `UNAUTHORIZED_UPDATE` | You're not the author |
| `DUPLICATE_TITLE` | You already have an idea with this exact title |
| `ENUM_INVALID` | A category/occasion/etc. value isn't in the allowed list |
