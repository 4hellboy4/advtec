# Comments

Add and retrieve comments for gift ideas.

## Add Comment

### Endpoint
```http
POST /ideas/{idea_id}/comments
Authorization: Bearer <token>
```

### Request Body
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `content` | string | Yes | Comment text (5-1000 chars) |
| `parent_id` | string | No | Parent comment ID (for replies) |

### Example Request
```json
{
  "content": "Great idea! I gave a similar gift and it worked perfectly."
}
```

### Response (201 Created)
```json
{
  "success": true,
  "data": {
    "comment": {
      "id": "cmt_9876543210",
      "content": "Great idea! I gave a similar gift and it worked perfectly.",
      "author": {
        "id": "usr_2345678901",
        "username": "stargazer"
      },
      "idea_id": "idea_9876543210",
      "parent_id": null,
      "stats": {
        "likes": 0,
        "replies": 0
      },
      "created_at": "2026-03-22T16:30:00Z"
    }
  }
}
```

## Get Comments

### Endpoint
```http
GET /ideas/{idea_id}/comments
```

### Query Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number (default: 1) |
| `limit` | integer | Comments per page (default: 20, max: 100) |
| `sort` | string | Sort: `newest`, `oldest`, `popular` |

### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "comments": [
      {
        "id": "cmt_1234567890",
        "content": "This is such a great idea! I tried something similar...",
        "author": {
          "username": "stargazer"
        },
        "idea_id": "idea_9876543210",
        "parent_id": null,
        "stats": {
          "likes": 15,
          "replies": 3
        },
        "created_at": "2026-03-21T10:15:00Z",
        "replies": [
          {
            "id": "cmt_2345678901",
            "content": "Thanks for the recommendation!",
            "author": {
              "username": "giftguru"
            },
            "parent_id": "cmt_1234567890",
            "stats": {
              "likes": 3,
              "replies": 0
            },
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

## Like Comment

### Endpoint
```http
POST /comments/{comment_id}/like
Authorization: Bearer <token>
```

### Response
```json
{
  "success": true,
  "data": {
    "liked": true,
    "like_count": 8
  }
}
```

## Rate Limits

- Comments: 10 per hour per user
- Replies: 20 per hour per user

## Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Invalid comment content |
| `IDEA_NOT_FOUND` | Idea doesn't exist |
| `COMMENTS_DISABLED` | Comments disabled for idea |
| `RATE_LIMIT_EXCEEDED` | Too many comments |