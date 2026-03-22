# User Profile Management

Manage user profiles, including personal information, preferences, and public settings.

## Get User Profile

### Get Own Profile

```http
GET /users/me
Authorization: Bearer <token>
```

### Get Public Profile

```http
GET /users/{user_id}
```

or

```http
GET /users/username/{username}
```

### Example Response (Own Profile)

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_1234567890",
      "email": "user@example.com",
      "username": "giftguru",
      "full_name": "John Doe",
      "bio": "Love finding perfect gifts for special occasions. Always happy to help others discover amazing gift ideas!",
      "avatar_url": "https://cdn.lovinideas.com/avatars/usr_1234567890.jpg",
      "cover_image_url": "https://cdn.lovinideas.com/covers/usr_1234567890.jpg",
      "location": {
        "city": "San Francisco",
        "country": "US",
        "timezone": "America/Los_Angeles"
      },
      "social_links": {
        "website": "https://johndoe.com",
        "twitter": "johndoe_gifts",
        "instagram": "giftguru_john",
        "pinterest": "johndoe_ideas"
      },
      "preferences": {
        "favorite_categories": ["handmade", "electronics", "experiences"],
        "favorite_occasions": ["anniversary", "birthday", "wedding"],
        "price_ranges": ["25_50", "50_100"],
        "notification_settings": {
          "email_notifications": true,
          "push_notifications": false,
          "comment_notifications": true,
          "like_notifications": true,
          "follow_notifications": true
        },
        "privacy_settings": {
          "profile_visibility": "public",
          "show_liked_ideas": true,
          "show_saved_ideas": false,
          "show_email": false,
          "show_location": true
        }
      },
      "stats": {
        "ideas_posted": 23,
        "total_likes_received": 456,
        "total_comments_received": 123,
        "total_saves_received": 234,
        "followers": 89,
        "following": 67,
        "profile_views": 1247
      },
      "badges": [
        {
          "id": "early_adopter",
          "name": "Early Adopter",
          "description": "One of the first 1000 users",
          "icon_url": "https://cdn.lovinideas.com/badges/early_adopter.svg",
          "earned_at": "2026-01-15T10:30:00Z"
        },
        {
          "id": "gift_expert",
          "name": "Gift Expert",
          "description": "Posted 20+ highly-rated gift ideas",
          "icon_url": "https://cdn.lovinideas.com/badges/gift_expert.svg",
          "earned_at": "2026-03-10T14:20:00Z"
        }
      ],
      "membership": {
        "plan": "premium",
        "started_at": "2026-02-01T00:00:00Z",
        "expires_at": "2027-02-01T00:00:00Z",
        "features": ["unlimited_ideas", "advanced_analytics", "priority_support"]
      },
      "verification": {
        "email_verified": true,
        "phone_verified": false,
        "identity_verified": false,
        "verified_at": "2026-01-15T12:00:00Z"
      },
      "created_at": "2026-01-15T10:30:00Z",
      "updated_at": "2026-03-22T16:30:00Z",
      "last_active": "2026-03-22T16:25:00Z"
    }
  },
  "message": "Profile retrieved successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

### Example Response (Public Profile)

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_1234567890",
      "username": "giftguru",
      "full_name": "John Doe",
      "bio": "Love finding perfect gifts for special occasions. Always happy to help others discover amazing gift ideas!",
      "avatar_url": "https://cdn.lovinideas.com/avatars/usr_1234567890.jpg",
      "cover_image_url": "https://cdn.lovinideas.com/covers/usr_1234567890.jpg",
      "location": {
        "city": "San Francisco",
        "country": "US"
      },
      "social_links": {
        "website": "https://johndoe.com",
        "twitter": "johndoe_gifts"
      },
      "public_stats": {
        "ideas_posted": 23,
        "total_likes_received": 456,
        "followers": 89,
        "following": 67
      },
      "badges": [
        {
          "id": "early_adopter",
          "name": "Early Adopter",
          "icon_url": "https://cdn.lovinideas.com/badges/early_adopter.svg"
        }
      ],
      "recent_ideas": [
        {
          "id": "idea_9876543210",
          "title": "Personalized Star Map for Anniversary",
          "category": "handmade",
          "likes": 46,
          "created_at": "2026-03-20T14:30:00Z"
        }
      ],
      "joined_at": "2026-01-15T10:30:00Z",
      "last_active": "2026-03-22T16:25:00Z"
    }
  },
  "message": "Public profile retrieved successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Update User Profile

### Endpoint

```http
PUT /users/me
Authorization: Bearer <token>
```

### Request Body

All fields are optional. Only include fields you want to update.

```json
{
  "full_name": "John Michael Doe",
  "bio": "Passionate about finding unique and meaningful gifts. Specializing in handmade and personalized items for special occasions.",
  "location": {
    "city": "Los Angeles",
    "country": "US",
    "timezone": "America/Los_Angeles"
  },
  "social_links": {
    "website": "https://johnmichaeldoe.com",
    "twitter": "johnmdoe_gifts",
    "instagram": "giftguru_johnm",
    "pinterest": "johnm_giftideas"
  },
  "preferences": {
    "favorite_categories": ["handmade", "experiences", "books_media"],
    "favorite_occasions": ["anniversary", "wedding", "graduation"],
    "notification_settings": {
      "email_notifications": true,
      "push_notifications": true,
      "comment_notifications": true,
      "like_notifications": false,
      "follow_notifications": true
    }
  }
}
```

### Example Response

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_1234567890",
      "username": "giftguru",
      "full_name": "John Michael Doe",
      "bio": "Passionate about finding unique and meaningful gifts. Specializing in handmade and personalized items for special occasions.",
      "location": {
        "city": "Los Angeles",
        "country": "US",
        "timezone": "America/Los_Angeles"
      },
      "social_links": {
        "website": "https://johnmichaeldoe.com",
        "twitter": "johnmdoe_gifts",
        "instagram": "giftguru_johnm",
        "pinterest": "johnm_giftideas"
      },
      "updated_at": "2026-03-22T16:30:00Z"
    }
  },
  "message": "Profile updated successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Upload Profile Images

### Upload Avatar

```http
POST /users/me/avatar
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

### Upload Cover Image

```http
POST /users/me/cover-image
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

### Request Body (Form Data)

```
image: [file] (required)
```

### Image Requirements

- **Formats**: JPEG, PNG, WebP
- **Avatar**: Max 5MB, recommended 400x400px
- **Cover**: Max 10MB, recommended 1200x400px
- **Processing**: Images are automatically resized and optimized

### Example Response

```json
{
  "success": true,
  "data": {
    "image_url": "https://cdn.lovinideas.com/avatars/usr_1234567890.jpg",
    "thumbnail_url": "https://cdn.lovinideas.com/avatars/usr_1234567890_thumb.jpg",
    "upload_info": {
      "original_size": "2.3MB",
      "processed_size": "456KB",
      "dimensions": "400x400",
      "format": "jpeg"
    }
  },
  "message": "Avatar uploaded successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## User Statistics

### Get Detailed Statistics

```http
GET /users/me/statistics
Authorization: Bearer <token>
```

### Example Response

```json
{
  "success": true,
  "data": {
    "overview": {
      "total_ideas": 23,
      "total_likes_received": 456,
      "total_comments_received": 123,
      "total_saves_received": 234,
      "total_shares_received": 45,
      "profile_views": 1247
    },
    "engagement_metrics": {
      "average_likes_per_idea": 19.8,
      "average_comments_per_idea": 5.3,
      "engagement_rate": 0.24,
      "viral_coefficient": 1.15
    },
    "content_performance": {
      "top_performing_idea": {
        "id": "idea_9876543210",
        "title": "Personalized Star Map for Anniversary",
        "likes": 46,
        "comments": 12,
        "saves": 23
      },
      "most_saved_idea": {
        "id": "idea_8765432109",
        "title": "Custom Photo Book",
        "saves": 34
      },
      "trending_ideas": 3
    },
    "audience_insights": {
      "follower_demographics": {
        "age_groups": [
          {"range": "25-34", "percentage": 42},
          {"range": "35-44", "percentage": 31},
          {"range": "18-24", "percentage": 18}
        ],
        "top_locations": [
          {"country": "US", "percentage": 48},
          {"country": "CA", "percentage": 22},
          {"country": "UK", "percentage": 15}
        ]
      },
      "engagement_patterns": {
        "peak_hours": ["19:00", "20:00", "21:00"],
        "peak_days": ["Saturday", "Sunday", "Wednesday"],
        "average_session_duration": "8m 32s"
      }
    },
    "growth_trends": [
      {
        "date": "2026-03-22",
        "followers": 89,
        "likes_received": 12,
        "profile_views": 34
      },
      {
        "date": "2026-03-21",
        "followers": 87,
        "likes_received": 8,
        "profile_views": 28
      }
    ]
  },
  "message": "User statistics retrieved successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Follow/Unfollow Users

### Follow User

```http
POST /users/{user_id}/follow
Authorization: Bearer <token>
```

### Unfollow User

```http
DELETE /users/{user_id}/follow
Authorization: Bearer <token>
```

### Example Response

```json
{
  "success": true,
  "data": {
    "following": true,
    "follower_count": 90,
    "follow_relationship": {
      "id": "fol_1234567890",
      "follower_id": "usr_1234567890",
      "following_id": "usr_2345678901",
      "created_at": "2026-03-22T16:30:00Z"
    }
  },
  "message": "Successfully followed user",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Get Followers/Following

### Get Followers

```http
GET /users/{user_id}/followers
```

### Get Following

```http
GET /users/{user_id}/following
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number (default: 1) |
| `limit` | integer | Items per page (default: 20, max: 100) |
| `sort` | string | Sort order (newest, oldest, alphabetical) |

### Example Response

```json
{
  "success": true,
  "data": {
    "followers": [
      {
        "user": {
          "id": "usr_2345678901",
          "username": "stargazer",
          "full_name": "Emma Wilson",
          "avatar_url": "https://cdn.lovinideas.com/avatars/usr_2345678901.jpg",
          "bio": "Love romantic gifts and starry nights",
          "verified": true
        },
        "follow_info": {
          "followed_at": "2026-03-20T10:15:00Z",
          "mutual_follow": true
        },
        "stats": {
          "ideas_posted": 15,
          "followers": 67,
          "total_likes": 234
        }
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 20,
      "total_items": 89,
      "total_pages": 5
    }
  },
  "message": "Followers retrieved successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Error Responses

### User Not Found (404 Not Found)

```json
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "User with ID 'usr_invalid' not found",
    "details": null
  },
  "timestamp": "2026-03-22T16:30:00Z"
}
```

### Private Profile (403 Forbidden)

```json
{
  "success": false,
  "error": {
    "code": "PRIVATE_PROFILE",
    "message": "This user's profile is private",
    "details": {
      "privacy_level": "private",
      "follow_required": true
    }
  },
  "timestamp": "2026-03-22T16:30:00Z"
}
```

### Cannot Follow Self (400 Bad Request)

```json
{
  "success": false,
  "error": {
    "code": "CANNOT_FOLLOW_SELF",
    "message": "You cannot follow yourself",
    "details": null
  },
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## cURL Examples

### Get Own Profile

```bash
curl "https://api.lovinideas.com/v1/users/me" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Update Profile

```bash
curl -X PUT "https://api.lovinideas.com/v1/users/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "full_name": "John Michael Doe",
    "bio": "Passionate about finding unique gifts"
  }'
```

### Upload Avatar

```bash
curl -X POST "https://api.lovinideas.com/v1/users/me/avatar" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -F "image=@avatar.jpg"
```

### Follow User

```bash
curl -X POST "https://api.lovinideas.com/v1/users/usr_2345678901/follow" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Best Practices

1. **Profile Completeness**: Complete profiles get more engagement
2. **Quality Images**: Use high-quality avatar and cover images
3. **Regular Updates**: Keep bio and preferences current
4. **Privacy Settings**: Review privacy settings regularly
5. **Social Links**: Add relevant social media links
6. **Authentic Bio**: Write genuine, helpful bio descriptions