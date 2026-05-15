# Ideas

CRUD endpoints for gift ideas.

For a procedural walkthrough, see [Manage ideas](/03-build/manage-ideas).

## Endpoint summary

| Method | Path | Authorization |
|--------|------|---------------|
| `POST` | `/ideas` | Required |
| `GET` | `/ideas` | Not required |
| `GET` | `/ideas/{idea_id}` | Not required |
| `GET` | `/ideas/search` | Not required |
| `PUT` | `/ideas/{idea_id}` | Required (author only) |
| `DELETE` | `/ideas/{idea_id}` | Required (author only) |

## Create an idea

```http
POST /ideas
Authorization: Bearer <token>
Content-Type: application/json
```

### Request body

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `title` | string | Yes | 5–200 characters; unique per author |
| `description` | string | Yes | 20–2000 characters |
| `category` | string | Yes | One of the values listed under [Enumerations](#enumerations) |
| `occasion` | string | Yes | One of the values listed under [Enumerations](#enumerations) |
| `price_range` | string | Yes | One of the values listed under [Enumerations](#enumerations) |
| `recipient_type` | string | Yes | One of the values listed under [Enumerations](#enumerations) |
| `tags` | array of string | No | Maximum 10 tags |

### Example request

```json
{
  "title": "Personalized Star Map for Anniversary",
  "description": "Custom star map showing the stars on a specific date. High-quality print, ready to frame.",
  "category": "handmade",
  "occasion": "anniversary",
  "price_range": "25_50",
  "recipient_type": "partner",
  "tags": ["romantic", "personalized", "astronomy"]
}
```

### Response

`201 Created`

```json
{
  "success": true,
  "data": {
    "idea": {
      "id": "idea_9876543210",
      "title": "Personalized Star Map for Anniversary",
      "description": "Custom star map showing the stars on a specific date...",
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

### Status codes

| Code | Condition |
|------|-----------|
| `201` | Idea created |
| `400` | Validation failure |
| `401` | Missing or invalid token |
| `409` | Duplicate title for this author |

## List ideas

```http
GET /ideas
```

### Query parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | `1` | Page number |
| `limit` | integer | `20` | Items per page; maximum 100 |
| `category` | string | — | Filter by category enumeration |
| `occasion` | string | — | Filter by occasion enumeration |
| `price_range` | string | — | Filter by price range enumeration |
| `recipient_type` | string | — | Filter by recipient type enumeration |
| `sort` | string | `newest` | One of `newest`, `oldest`, `popular` |
| `search` | string | — | Inline keyword search |

### Response

`200 OK`

```json
{
  "success": true,
  "data": {
    "ideas": [ /* idea objects */ ],
    "pagination": {
      "current_page": 1,
      "per_page": 20,
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

Returns the full idea object including the first page of comments.

### Status codes

| Code | Condition |
|------|-----------|
| `200` | Idea returned |
| `404` | Idea not found |

## Search ideas

```http
GET /ideas/search?q={query}
```

### Query parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | Yes | Search query; minimum 2 characters |
| `category` | string | No | Filter by category enumeration |
| `price_range` | string | No | Filter by price range enumeration |
| `sort` | string | No | One of `relevance` (default), `newest`, `popular` |

## Update an idea

```http
PUT /ideas/{idea_id}
Authorization: Bearer <token>
Content-Type: application/json
```

The request body accepts any subset of the fields defined in [Create an idea](#create-an-idea). Only the idea author is permitted to update.

### Status codes

| Code | Condition |
|------|-----------|
| `200` | Idea updated |
| `400` | Validation failure |
| `401` | Missing or invalid token |
| `403` | Authenticated user is not the author |
| `404` | Idea not found |

## Delete an idea

```http
DELETE /ideas/{idea_id}
Authorization: Bearer <token>
```

Performs a soft delete. The idea is hidden from search and listing endpoints for 30 days, after which it is permanently removed.

### Status codes

| Code | Condition |
|------|-----------|
| `204` | Idea deleted |
| `401` | Missing or invalid token |
| `403` | Authenticated user is not the author |
| `404` | Idea not found |

## Enumerations

**`category`:** `electronics`, `books_media`, `fashion`, `home_garden`, `food_drinks`, `experiences`, `handmade`, `sports_fitness`, `beauty_health`, `toys_games`

**`occasion`:** `birthday`, `anniversary`, `wedding`, `graduation`, `holiday`, `valentines`, `mothers_day`, `fathers_day`, `just_because`

**`price_range`:** `under_25`, `25_50`, `50_100`, `100_250`, `250_500`, `over_500`

**`recipient_type`:** `partner`, `family`, `friend`, `colleague`, `boss`, `teacher`, `child`, `elderly`, `anyone`

## Error codes

| Code | HTTP status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | One or more fields failed validation |
| `ENUM_INVALID` | 400 | An enumeration field contains an unsupported value |
| `DUPLICATE_TITLE` | 409 | The author already has an idea with this title |
| `IDEA_NOT_FOUND` | 404 | No idea exists with the specified identifier |
| `UNAUTHORIZED_UPDATE` | 403 | The authenticated user is not the idea author |

## Related resources

- [Manage ideas](/03-build/manage-ideas) — procedural guide.
- [Search and discover](/03-build/search-and-discover) — query patterns.
- [Errors](/04-reference/errors) — complete error code catalog.
