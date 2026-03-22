# Get Comments

Retrieve comments for a gift idea with pagination and threading support.

## Endpoint

```http
GET /ideas/{idea_id}/comments
```

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | integer | No | Page number (default: 1) |
| `limit` | integer | No | Comments per page (default: 20, max: 100) |
| `sort` | string | No | Sort order (newest, oldest, popular) |
| `include_replies` | boolean | No | Include nested replies (default: true) |
| `max_depth` | integer | No | Maximum reply depth (default: 3, max: 3) |

## Sorting Options

- `newest` - Most recent first (default)
- `oldest` - Oldest first  
- `popular` - Most liked comments first
- `author` - Comments by idea author first

## Example Request

```http
GET /ideas/idea_9876543210/comments?sort=popular&limit=10&include_replies=true
```

## Example Response

### Success (200 OK)

```json
{
  "success": true,
  "data": {
    "comments": [
      {
        "id": "cmt_1234567890",
        "content": "This is such a great idea! I gave a similar star map to my partner last year and they absolutely loved it. The quality from **GreaterSkies** is amazing - definitely recommend that vendor over the others.",
        "author": {
          "id": "usr_2345678901",
          "username": "stargazer",
          "full_name": "Emma Wilson",
          "avatar_url": "https://cdn.lovinideas.com/avatars/usr_2345678901.jpg",
          "verified": true
        },
        "idea_id": "idea_9876543210",
        "parent_id": null,
        "level": 1,
        "mentions": [
          {
            "username": "giftguru",
            "user_id": "usr_1234567890",
            "position": 85
          }
        ],
        "stats": {
          "likes": 15,
          "replies": 3
        },
        "user_interaction": {
          "liked": false,
          "can_edit": false,
          "can_delete": false,
          "can_reply": true,
          "can_report": true
        },
        "created_at": "2026-03-21T10:15:00Z",
        "updated_at": "2026-03-21T10:15:00Z",
        "edited": false,
        "replies": [
          {
            "id": "cmt_2345678901",
            "content": "Thanks for the recommendation! Did you go with the standard size or the larger version?",
            "author": {
              "id": "usr_1234567890",
              "username": "giftguru",
              "full_name": "John Doe",
              "avatar_url": "https://cdn.lovinideas.com/avatars/usr_1234567890.jpg",
              "verified": false
            },
            "idea_id": "idea_9876543210",
            "parent_id": "cmt_1234567890",
            "level": 2,
            "mentions": [],
            "stats": {
              "likes": 3,
              "replies": 1
            },
            "user_interaction": {
              "liked": false,
              "can_edit": true,
              "can_delete": true,
              "can_reply": true,
              "can_report": false
            },
            "created_at": "2026-03-21T14:30:00Z",
            "updated_at": "2026-03-21T14:30:00Z",
            "edited": false,
            "replies": [
              {
                "id": "cmt_3456789012",
                "content": "I went with the 16x20 inch size and it looks perfect on our bedroom wall!",
                "author": {
                  "id": "usr_2345678901",
                  "username": "stargazer", 
                  "full_name": "Emma Wilson",
                  "avatar_url": "https://cdn.lovinideas.com/avatars/usr_2345678901.jpg",
                  "verified": true
                },
                "idea_id": "idea_9876543210",
                "parent_id": "cmt_2345678901",
                "level": 3,
                "mentions": [],
                "stats": {
                  "likes": 8,
                  "replies": 0
                },
                "user_interaction": {
                  "liked": true,
                  "can_edit": false,
                  "can_delete": false,
                  "can_reply": false,
                  "can_report": true
                },
                "created_at": "2026-03-21T16:45:00Z",
                "updated_at": "2026-03-21T16:45:00Z",
                "edited": false,
                "replies": []
              }
            ]
          }
        ]
      },
      {
        "id": "cmt_4567890123",
        "content": "Love this concept! For anyone looking for alternatives, I found a similar service called StarryNight that's a bit cheaper but still great quality.",
        "author": {
          "id": "usr_3456789012",
          "username": "bargainhunter",
          "full_name": "Mike Rodriguez",
          "avatar_url": "https://cdn.lovinideas.com/avatars/usr_3456789012.jpg",
          "verified": false
        },
        "idea_id": "idea_9876543210",
        "parent_id": null,
        "level": 1,
        "mentions": [],
        "stats": {
          "likes": 7,
          "replies": 0
        },
        "user_interaction": {
          "liked": false,
          "can_edit": false,
          "can_delete": false,
          "can_reply": true,
          "can_report": true
        },
        "created_at": "2026-03-22T08:20:00Z",
        "updated_at": "2026-03-22T08:20:00Z",
        "edited": false,
        "replies": []
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total_comments": 23,
      "total_pages": 3,
      "has_next": true,
      "has_prev": false,
      "next_page": 2,
      "prev_page": null
    },
    "comment_stats": {
      "total_comments": 23,
      "total_replies": 15,
      "total_likes": 89,
      "average_rating": 4.2,
      "most_active_commenter": {
        "username": "stargazer",
        "comment_count": 5
      }
    },
    "filters_applied": {
      "sort": "popular",
      "include_replies": true,
      "max_depth": 3
    }
  },
  "message": "Comments retrieved successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Get Single Comment

### Endpoint

```http
GET /comments/{comment_id}
```

### Example Response

```json
{
  "success": true,
  "data": {
    "comment": {
      "id": "cmt_1234567890",
      "content": "This is such a great idea! I gave a similar star map to my partner last year...",
      "author": {
        "id": "usr_2345678901",
        "username": "stargazer",
        "full_name": "Emma Wilson",
        "avatar_url": "https://cdn.lovinideas.com/avatars/usr_2345678901.jpg",
        "verified": true,
        "bio": "Gift enthusiast and romantic at heart"
      },
      "idea": {
        "id": "idea_9876543210",
        "title": "Personalized Star Map for Anniversary",
        "author_username": "giftguru"
      },
      "thread_context": {
        "parent_comment": null,
        "root_comment_id": "cmt_1234567890",
        "reply_count": 3,
        "thread_participants": ["stargazer", "giftguru", "romantic_soul"]
      },
      "stats": {
        "likes": 15,
        "replies": 3,
        "reports": 0
      },
      "created_at": "2026-03-21T10:15:00Z",
      "updated_at": "2026-03-21T10:15:00Z"
    }
  },
  "message": "Comment retrieved successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Comment Filtering

### Filter by Author

```http
GET /ideas/idea_9876543210/comments?author=stargazer
```

### Filter by Date Range

```http
GET /ideas/idea_9876543210/comments?from_date=2026-03-20&to_date=2026-03-22
```

### Filter by Mentions

```http
GET /ideas/idea_9876543210/comments?mentions=giftguru
```

## Flat vs Threaded Comments

### Flat Comments (include_replies=false)

```http
GET /ideas/idea_9876543210/comments?include_replies=false
```

Returns comments without nested replies structure:

```json
{
  "comments": [
    {
      "id": "cmt_1",
      "content": "Great idea!",
      "level": 1,
      "replies": []
    },
    {
      "id": "cmt_2", 
      "content": "Thanks!",
      "parent_id": "cmt_1",
      "level": 2,
      "replies": []
    }
  ]
}
```

### Threaded Comments (include_replies=true)

Returns nested comment structure with replies embedded.

## Comment Statistics

### Get Comment Statistics

```http
GET /ideas/idea_9876543210/comments/stats
```

**Response:**

```json
{
  "success": true,
  "data": {
    "stats": {
      "total_comments": 23,
      "total_replies": 15,
      "total_participants": 8,
      "average_comment_length": 127,
      "most_liked_comment": {
        "id": "cmt_1234567890",
        "likes": 15,
        "content_preview": "This is such a great idea! I gave a similar..."
      },
      "recent_activity": {
        "last_comment_at": "2026-03-22T15:30:00Z",
        "comments_today": 3,
        "comments_this_week": 12
      },
      "top_contributors": [
        {
          "username": "stargazer",
          "comment_count": 5,
          "total_likes": 23
        },
        {
          "username": "giftguru", 
          "comment_count": 3,
          "total_likes": 18
        }
      ]
    }
  },
  "message": "Comment statistics retrieved successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Error Responses

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

### Comments Disabled (403 Forbidden)

```json
{
  "success": false,
  "error": {
    "code": "COMMENTS_DISABLED",
    "message": "Comments are disabled for this idea",
    "details": {
      "reason": "idea_archived",
      "disabled_at": "2026-03-20T10:00:00Z"
    }
  },
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Performance Considerations

### Pagination Best Practices

- Use reasonable page sizes (20-50 comments)
- For mobile apps, consider smaller page sizes (10-20)
- Cache comment data when possible
- Use cursor-based pagination for real-time updates

### Threading Performance

- Limit max_depth to 3 levels for performance
- Consider flat comments for high-volume discussions
- Use include_replies=false for comment counts only

## Real-time Updates

### WebSocket Events

Subscribe to comment events for real-time updates:

```javascript
// WebSocket connection
ws.send({
  "type": "subscribe",
  "channel": "idea_comments",
  "idea_id": "idea_9876543210"
});

// Receive new comments
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'new_comment') {
    // Handle new comment
    console.log('New comment:', data.comment);
  }
};
```

## cURL Examples

### Get Comments with Replies

```bash
curl "https://api.lovinideas.com/v1/ideas/idea_9876543210/comments?sort=popular&limit=20"
```

### Get Flat Comments Only

```bash
curl "https://api.lovinideas.com/v1/ideas/idea_9876543210/comments?include_replies=false&sort=newest"
```

### Get Single Comment

```bash
curl "https://api.lovinideas.com/v1/comments/cmt_1234567890" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Get Comment Statistics

```bash
curl "https://api.lovinideas.com/v1/ideas/idea_9876543210/comments/stats"
```