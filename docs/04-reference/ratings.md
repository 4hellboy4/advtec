# Ratings

Endpoints for liking and rating ideas.

For a procedural walkthrough, see [Social interactions](/03-build/social-interactions).

## Endpoint summary

| Method | Path | Authorization |
|--------|------|---------------|
| `POST` | `/ideas/{idea_id}/like` | Required |
| `POST` | `/ideas/{idea_id}/rating` | Required |
| `GET` | `/ideas/{idea_id}/ratings` | Not required |
| `DELETE` | `/ideas/{idea_id}/rating` | Required |

## Like an idea

```http
POST /ideas/{idea_id}/like
Authorization: Bearer <token>
```

This endpoint toggles the like state. A repeated call by the same user removes the like.

### Response

`200 OK`

```json
{
  "success": true,
  "data": {
    "liked": true,
    "like_count": 46
  }
}
```

### Status codes

| Code | Condition |
|------|-----------|
| `200` | Like state toggled |
| `401` | Missing or invalid token |
| `404` | Idea not found |
| `429` | Rate limit exceeded |

## Submit a rating

```http
POST /ideas/{idea_id}/rating
Authorization: Bearer <token>
Content-Type: application/json
```

### Request body

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `score` | integer | Yes | Value from 1 to 5 inclusive |
| `review` | string | No | Maximum 1000 characters |

Each user may submit one rating per idea. Submitting a second rating updates the existing record.

### Example request

```json
{
  "score": 5,
  "review": "Used this idea for an anniversary gift. The recipient was very satisfied."
}
```

### Response

`201 Created`

```json
{
  "success": true,
  "data": {
    "rating": {
      "id": "rat_1234567890",
      "score": 5,
      "review": "Used this idea for an anniversary gift. The recipient was very satisfied.",
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

### Status codes

| Code | Condition |
|------|-----------|
| `201` | Rating created or updated |
| `400` | Validation failure |
| `401` | Missing or invalid token |
| `403` | Authenticated user is the idea author |
| `404` | Idea not found |
| `429` | Rate limit exceeded |

## List ratings for an idea

```http
GET /ideas/{idea_id}/ratings
```

### Query parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | `1` | Page number |
| `limit` | integer | `20` | Items per page; maximum 100 |
| `sort` | string | `newest` | One of `newest`, `highest`, `lowest` |

## Remove a rating

```http
DELETE /ideas/{idea_id}/rating
Authorization: Bearer <token>
```

Removes the authenticated user's rating from the specified idea.

### Status codes

| Code | Condition |
|------|-----------|
| `204` | Rating removed |
| `401` | Missing or invalid token |
| `404` | No rating exists for this user on the specified idea |

## Error codes

| Code | HTTP status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | `score` is outside the allowed range, or `review` exceeds the length limit |
| `IDEA_NOT_FOUND` | 404 | No idea exists with the specified identifier |
| `SELF_RATING_FORBIDDEN` | 403 | The authenticated user is the idea author |
| `RATE_LIMIT_EXCEEDED` | 429 | Rate limit exceeded for this action |

## Related resources

- [Social interactions](/03-build/social-interactions) — procedural guide.
- [Errors](/04-reference/errors) — complete error code catalog.
