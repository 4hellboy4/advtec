# Comments reference

Full reference for the comments resource. For a walkthrough with examples, see [social interactions](/03-build/social-interactions).

## Add a comment

```http
POST /ideas/{idea_id}/comments
Authorization: Bearer <token>
```

### Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `content` | string | Yes | 5–1000 characters |
| `parent_id` | string | No | Comment ID, when replying |

### Example

```json
{
  "content": "Great idea — I gave a similar gift and it worked perfectly."
}
```

### Response — `201 Created`

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

## Get comments

```http
GET /ideas/{idea_id}/comments
```

### Query parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Default 1 |
| `limit` | integer | Default 20, max 100 |
| `sort` | string | `newest`, `oldest`, `popular` |

### Response shape

Top-level comments arrive with `replies` nested inline (so you don't need to fetch each thread separately):

```json
{
  "success": true,
  "data": {
    "comments": [
      {
        "id": "cmt_1234567890",
        "content": "This is such a great idea...",
        "author": { "username": "stargazer" },
        "idea_id": "idea_9876543210",
        "parent_id": null,
        "stats": { "likes": 15, "replies": 3 },
        "created_at": "2026-03-21T10:15:00Z",
        "replies": [
          {
            "id": "cmt_2345678901",
            "content": "Thanks for the recommendation!",
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

Toggles — call once to like, again to unlike.

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

- New top-level comments: **10 per hour per user**
- Replies: **20 per hour per user**

## Error codes

| Code | When you'll see it |
|------|---------------------|
| `VALIDATION_ERROR` | Content too short, too long, or empty |
| `IDEA_NOT_FOUND` | The idea doesn't exist |
| `COMMENT_NOT_FOUND` | The `parent_id` doesn't resolve to an existing comment |
| `COMMENTS_DISABLED` | Author has disabled comments on this idea |
| `RATE_LIMIT_EXCEEDED` | You're posting faster than the limits above |
