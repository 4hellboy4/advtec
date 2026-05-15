# Comments

Endpoints for creating, listing, and liking comments on ideas.

For a procedural walkthrough, see [Social interactions](/03-build/social-interactions).

## Endpoint summary

| Method | Path | Authorization |
|--------|------|---------------|
| `POST` | `/ideas/{idea_id}/comments` | Required |
| `GET` | `/ideas/{idea_id}/comments` | Not required |
| `POST` | `/comments/{comment_id}/like` | Required |

## Create a comment

```http
POST /ideas/{idea_id}/comments
Authorization: Bearer <token>
Content-Type: application/json
```

### Request body

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `content` | string | Yes | 5–1000 characters |
| `parent_id` | string | No | Identifier of a top-level comment, when posting a reply |

Replies may be attached only to top-level comments. Nested replies are not supported.

### Example request

```json
{
  "content": "Great idea — I gave a similar gift and it worked perfectly."
}
```

### Response

`201 Created`

```json
{
  "success": true,
  "data": {
    "comment": {
      "id": "cmt_9876543210",
      "content": "Great idea — I gave a similar gift and it worked perfectly.",
      "author": { "id": "usr_2345678901", "username": "stargazer" },
      "idea_id": "idea_9876543210",
      "parent_id": null,
      "stats": { "likes": 0, "replies": 0 },
      "created_at": "2026-03-22T16:30:00Z"
    }
  }
}
```

### Status codes

| Code | Condition |
|------|-----------|
| `201` | Comment created |
| `400` | Validation failure |
| `401` | Missing or invalid token |
| `403` | Comments are disabled for the target idea |
| `404` | Idea or parent comment not found |
| `429` | Rate limit exceeded |

## List comments

```http
GET /ideas/{idea_id}/comments
```

### Query parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | `1` | Page number |
| `limit` | integer | `20` | Items per page; maximum 100 |
| `sort` | string | `newest` | One of `newest`, `oldest`, `popular` |

### Response

Top-level comments include nested `replies` arrays. Replies are not paginated separately.

```json
{
  "success": true,
  "data": {
    "comments": [
      {
        "id": "cmt_1234567890",
        "content": "This is such a great idea.",
        "author": { "username": "stargazer" },
        "idea_id": "idea_9876543210",
        "parent_id": null,
        "stats": { "likes": 15, "replies": 3 },
        "created_at": "2026-03-21T10:15:00Z",
        "replies": [
          {
            "id": "cmt_2345678901",
            "content": "Thanks for the recommendation.",
            "author": { "username": "giftguru" },
            "parent_id": "cmt_1234567890",
            "stats": { "likes": 3, "replies": 0 },
            "created_at": "2026-03-21T14:30:00Z"
          }
        ]
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 20,
      "total_comments": 23
    }
  }
}
```

## Like a comment

```http
POST /comments/{comment_id}/like
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
    "like_count": 8
  }
}
```

## Rate limits

| Action | Limit per user per hour |
|--------|--------------------------|
| Top-level comments | 10 |
| Replies | 20 |
| Comment likes | 200 |

When a limit is exceeded, the API returns `429 Too Many Requests` with a `Retry-After` header. See [Rate limits](/05-advanced/rate-limits).

## Error codes

| Code | HTTP status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Content is too short, too long, or empty |
| `IDEA_NOT_FOUND` | 404 | No idea exists with the specified identifier |
| `COMMENT_NOT_FOUND` | 404 | The `parent_id` does not reference an existing comment |
| `COMMENTS_DISABLED` | 403 | Comments are disabled for this idea |
| `RATE_LIMIT_EXCEEDED` | 429 | Rate limit exceeded for this action |

## Related resources

- [Social interactions](/03-build/social-interactions) — procedural guide.
- [Rate limits](/05-advanced/rate-limits) — full rate limit specification.
- [Errors](/04-reference/errors) — complete error code catalog.
