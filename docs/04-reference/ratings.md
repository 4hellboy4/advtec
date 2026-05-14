# Ratings reference

Likes and 1–5 ratings on ideas. For higher-level context, see [social interactions](/03-build/social-interactions).

## Like an idea

```http
POST /ideas/{idea_id}/like
Authorization: Bearer <token>
```

Toggles — calling again removes your like.

### Response

```json
{
  "success": true,
  "data": {
    "liked": true,
    "like_count": 46
  }
}
```

## Rate an idea

```http
POST /ideas/{idea_id}/rating
Authorization: Bearer <token>
```

### Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `score` | integer | Yes | 1–5 inclusive |
| `review` | string | No | Up to 1000 characters |

### Example

```json
{
  "score": 5,
  "review": "Gave this for our 10th anniversary. She cried."
}
```

### Response — `201 Created`

```json
{
  "success": true,
  "data": {
    "rating": {
      "id": "rat_1234567890",
      "score": 5,
      "review": "Gave this for our 10th anniversary. She cried.",
      "author": { "username": "stargazer" },
      "idea_id": "idea_9876543210",
      "created_at": "2026-05-15T12:00:00Z"
    },
    "aggregate": {
      "average_score": 4.7,
      "total_ratings": 38
    }
  }
}
```

One rating per user per idea — re-rating updates instead of duplicating.

## Get ratings for an idea

```http
GET /ideas/{idea_id}/ratings
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Default 1 |
| `limit` | integer | Default 20, max 100 |
| `sort` | string | `newest`, `highest`, `lowest` |

## Remove your rating

```http
DELETE /ideas/{idea_id}/rating
Authorization: Bearer <token>
```

Removes both `score` and `review` you previously submitted on this idea.

## Error codes

| Code | When you'll see it |
|------|---------------------|
| `VALIDATION_ERROR` | `score` outside 1–5, or `review` too long |
| `IDEA_NOT_FOUND` | No idea with that ID |
| `SELF_RATING_FORBIDDEN` | You can't rate your own idea |
| `RATE_LIMIT_EXCEEDED` | More than 50 ratings per hour |
