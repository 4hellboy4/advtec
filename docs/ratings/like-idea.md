# Like Gift Ideas

Like or unlike gift ideas to show appreciation and help other users discover great content.

## Like an Idea

### Endpoint

```http
POST /ideas/{idea_id}/like
Authorization: Bearer <token>
```

### Example Response

```json
{
  "success": true,
  "data": {
    "liked": true,
    "like_count": 46,
    "user_like": {
      "id": "like_1234567890",
      "user_id": "usr_1234567890",
      "idea_id": "idea_9876543210",
      "created_at": "2026-03-22T16:30:00Z"
    }
  },
  "message": "Idea liked successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Unlike an Idea

### Endpoint

```http
DELETE /ideas/{idea_id}/like
Authorization: Bearer <token>
```

### Example Response

```json
{
  "success": true,
  "data": {
    "liked": false,
    "like_count": 45,
    "user_like": null
  },
  "message": "Like removed successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Toggle Like

### Endpoint

```http
PUT /ideas/{idea_id}/like
Authorization: Bearer <token>
```

Toggles like status - likes if not liked, unlikes if already liked.

### Example Response

```json
{
  "success": true,
  "data": {
    "liked": true,
    "like_count": 46,
    "action": "liked",
    "user_like": {
      "id": "like_1234567890",
      "user_id": "usr_1234567890",
      "idea_id": "idea_9876543210",
      "created_at": "2026-03-22T16:30:00Z"
    }
  },
  "message": "Idea liked successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Like Comments

### Like a Comment

```http
POST /comments/{comment_id}/like
Authorization: Bearer <token>
```

### Example Response

```json
{
  "success": true,
  "data": {
    "liked": true,
    "like_count": 8,
    "user_like": {
      "id": "like_2345678901",
      "user_id": "usr_1234567890",
      "comment_id": "cmt_9876543210",
      "created_at": "2026-03-22T16:30:00Z"
    }
  },
  "message": "Comment liked successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

### Unlike a Comment

```http
DELETE /comments/{comment_id}/like
Authorization: Bearer <token>
```

## Batch Like Operations

### Like Multiple Ideas

```http
POST /ideas/batch/like
Authorization: Bearer <token>
```

```json
{
  "idea_ids": ["idea_1", "idea_2", "idea_3"]
}
```

### Example Response

```json
{
  "success": true,
  "data": {
    "results": [
      {
        "idea_id": "idea_1",
        "liked": true,
        "like_count": 23,
        "status": "success"
      },
      {
        "idea_id": "idea_2", 
        "liked": true,
        "like_count": 15,
        "status": "success"
      },
      {
        "idea_id": "idea_3",
        "liked": false,
        "error": "IDEA_NOT_FOUND",
        "status": "error"
      }
    ],
    "summary": {
      "total_requested": 3,
      "successful": 2,
      "failed": 1
    }
  },
  "message": "Batch like operation completed",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Get Like Status

### Check Like Status for Idea

```http
GET /ideas/{idea_id}/like
Authorization: Bearer <token>
```

### Example Response

```json
{
  "success": true,
  "data": {
    "liked": true,
    "like_count": 46,
    "user_like": {
      "id": "like_1234567890",
      "created_at": "2026-03-22T16:30:00Z"
    },
    "recent_likes": [
      {
        "user": {
          "username": "giftlover",
          "avatar_url": "https://cdn.lovinideas.com/avatars/usr_3456789012.jpg"
        },
        "liked_at": "2026-03-22T15:45:00Z"
      },
      {
        "user": {
          "username": "stargazer",
          "avatar_url": "https://cdn.lovinideas.com/avatars/usr_2345678901.jpg"
        },
        "liked_at": "2026-03-22T14:20:00Z"
      }
    ]
  },
  "message": "Like status retrieved successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Like Analytics

### Get Idea Like History

```http
GET /ideas/{idea_id}/likes/history
Authorization: Bearer <token>
```

### Example Response

```json
{
  "success": true,
  "data": {
    "like_history": [
      {
        "date": "2026-03-22",
        "likes_count": 12,
        "cumulative_likes": 46
      },
      {
        "date": "2026-03-21",
        "likes_count": 8,
        "cumulative_likes": 34
      },
      {
        "date": "2026-03-20",
        "likes_count": 15,
        "cumulative_likes": 26
      }
    ],
    "stats": {
      "total_likes": 46,
      "average_likes_per_day": 7.7,
      "peak_day": {
        "date": "2026-03-20",
        "likes": 15
      },
      "like_velocity": "increasing"
    }
  },
  "message": "Like history retrieved successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## User Like Activity

### Get User's Liked Ideas

```http
GET /users/{user_id}/likes
Authorization: Bearer <token>
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number (default: 1) |
| `limit` | integer | Items per page (default: 20, max: 100) |
| `sort` | string | Sort order (newest, oldest, popular) |
| `category` | string | Filter by category |

### Example Response

```json
{
  "success": true,
  "data": {
    "liked_ideas": [
      {
        "like_id": "like_1234567890",
        "liked_at": "2026-03-22T16:30:00Z",
        "idea": {
          "id": "idea_9876543210",
          "title": "Personalized Star Map for Anniversary",
          "author": {
            "username": "giftguru",
            "full_name": "John Doe"
          },
          "category": "handmade",
          "price_range": "25_50",
          "stats": {
            "likes": 46,
            "comments": 12
          }
        }
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 20,
      "total_items": 127,
      "total_pages": 7
    },
    "user_stats": {
      "total_likes_given": 127,
      "most_liked_category": "handmade",
      "average_likes_per_week": 8.5,
      "first_like_date": "2026-01-15T10:30:00Z"
    }
  },
  "message": "User likes retrieved successfully",
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

### Cannot Like Own Idea (400 Bad Request)

```json
{
  "success": false,
  "error": {
    "code": "CANNOT_LIKE_OWN_IDEA",
    "message": "You cannot like your own ideas",
    "details": {
      "idea_author": "usr_1234567890",
      "current_user": "usr_1234567890"
    }
  },
  "timestamp": "2026-03-22T16:30:00Z"
}
```

### Already Liked (409 Conflict)

```json
{
  "success": false,
  "error": {
    "code": "ALREADY_LIKED",
    "message": "You have already liked this idea",
    "details": {
      "like_id": "like_1234567890",
      "liked_at": "2026-03-22T15:30:00Z"
    }
  },
  "timestamp": "2026-03-22T16:30:00Z"
}
```

### Rate Limit Exceeded (429 Too Many Requests)

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many like operations",
    "details": {
      "limit": "100 likes per hour",
      "reset_at": "2026-03-22T17:30:00Z"
    }
  },
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Like Notifications

### Notification Settings

Users can configure like notifications:

```http
PUT /users/me/notification-settings
Authorization: Bearer <token>
```

```json
{
  "like_notifications": {
    "email": true,
    "push": false,
    "in_app": true,
    "threshold": 5
  }
}
```

### Notification Response

```json
{
  "success": true,
  "data": {
    "notification_settings": {
      "like_notifications": {
        "email": true,
        "push": false,
        "in_app": true,
        "threshold": 5,
        "updated_at": "2026-03-22T16:30:00Z"
      }
    }
  },
  "message": "Notification settings updated successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Rate Limiting

- **Like/Unlike**: 100 operations per hour per user
- **Batch Operations**: 20 operations per hour per user
- **Like History**: 50 requests per hour per user

## Like Privacy

### Privacy Settings

```http
PUT /users/me/privacy-settings
Authorization: Bearer <token>
```

```json
{
  "like_privacy": {
    "show_liked_ideas": true,
    "show_in_recent_likes": false,
    "anonymous_likes": false
  }
}
```

## cURL Examples

### Like an Idea

```bash
curl -X POST https://api.lovinideas.com/v1/ideas/idea_9876543210/like \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Unlike an Idea

```bash
curl -X DELETE https://api.lovinideas.com/v1/ideas/idea_9876543210/like \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Toggle Like

```bash
curl -X PUT https://api.lovinideas.com/v1/ideas/idea_9876543210/like \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Check Like Status

```bash
curl https://api.lovinideas.com/v1/ideas/idea_9876543210/like \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Batch Like Ideas

```bash
curl -X POST https://api.lovinideas.com/v1/ideas/batch/like \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "idea_ids": ["idea_1", "idea_2", "idea_3"]
  }'
```

## Best Practices

1. **Use Toggle Endpoint**: Use PUT for like buttons to handle both like/unlike
2. **Show Feedback**: Provide immediate UI feedback before API response
3. **Handle Errors Gracefully**: Show appropriate messages for different error types
4. **Respect Rate Limits**: Implement client-side rate limiting
5. **Cache Like Status**: Cache like status to reduce API calls
6. **Optimistic Updates**: Update UI immediately, rollback on error