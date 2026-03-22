# Get Ratings and Statistics

Retrieve rating information, statistics, and analytics for ideas and users.

## Get Idea Ratings

### Endpoint

```http
GET /ideas/{idea_id}/ratings
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `include_likes` | boolean | Include like information (default: true) |
| `include_saves` | boolean | Include save statistics (default: true) |
| `include_shares` | boolean | Include share statistics (default: true) |
| `period` | string | Time period for analytics (day, week, month, all) |

### Example Response

```json
{
  "success": true,
  "data": {
    "idea_id": "idea_9876543210",
    "ratings": {
      "likes": {
        "count": 46,
        "recent_count": 12,
        "growth_rate": 0.35,
        "recent_users": [
          {
            "username": "giftlover",
            "avatar_url": "https://cdn.lovinideas.com/avatars/usr_3456789012.jpg",
            "liked_at": "2026-03-22T15:45:00Z"
          },
          {
            "username": "stargazer",
            "avatar_url": "https://cdn.lovinideas.com/avatars/usr_2345678901.jpg", 
            "liked_at": "2026-03-22T14:20:00Z"
          }
        ]
      },
      "saves": {
        "count": 23,
        "recent_count": 5,
        "growth_rate": 0.28
      },
      "shares": {
        "count": 8,
        "recent_count": 2,
        "platforms": {
          "twitter": 3,
          "facebook": 2,
          "pinterest": 2,
          "direct_link": 1
        }
      },
      "comments": {
        "count": 12,
        "recent_count": 3,
        "average_length": 127,
        "sentiment_score": 0.85
      },
      "views": {
        "total": 342,
        "unique": 287,
        "recent": 45,
        "average_time": 125
      }
    },
    "engagement": {
      "total_score": 89.5,
      "engagement_rate": 0.26,
      "virality_score": 0.15,
      "quality_score": 4.2,
      "trending_score": 0.73
    },
    "demographics": {
      "top_countries": [
        {"country": "US", "percentage": 45},
        {"country": "CA", "percentage": 18},
        {"country": "UK", "percentage": 12}
      ],
      "age_groups": [
        {"range": "25-34", "percentage": 38},
        {"range": "35-44", "percentage": 28},
        {"range": "18-24", "percentage": 20}
      ],
      "gender_split": {
        "female": 62,
        "male": 35,
        "other": 3
      }
    },
    "time_period": "last_7_days"
  },
  "message": "Idea ratings retrieved successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Get User Rating Activity

### Endpoint

```http
GET /users/{user_id}/rating-activity
Authorization: Bearer <token>
```

### Example Response

```json
{
  "success": true,
  "data": {
    "user_id": "usr_1234567890",
    "activity_summary": {
      "likes_given": 127,
      "likes_received": 89,
      "saves_given": 45,
      "saves_received": 67,
      "shares_given": 12,
      "shares_received": 23,
      "comments_made": 34,
      "comments_received": 56
    },
    "recent_activity": [
      {
        "type": "like",
        "action": "gave",
        "idea": {
          "id": "idea_9876543210",
          "title": "Personalized Star Map for Anniversary",
          "author": "giftguru"
        },
        "timestamp": "2026-03-22T16:15:00Z"
      },
      {
        "type": "save",
        "action": "gave", 
        "idea": {
          "id": "idea_8765432109",
          "title": "Custom Photo Book",
          "author": "memorylane"
        },
        "timestamp": "2026-03-22T14:30:00Z"
      }
    ],
    "preferences": {
      "favorite_categories": [
        {"category": "handmade", "interaction_count": 45},
        {"category": "electronics", "interaction_count": 32},
        {"category": "experiences", "interaction_count": 28}
      ],
      "favorite_occasions": [
        {"occasion": "anniversary", "interaction_count": 23},
        {"occasion": "birthday", "interaction_count": 19},
        {"occasion": "wedding", "interaction_count": 15}
      ],
      "price_preferences": {
        "most_liked_range": "25_50",
        "most_saved_range": "50_100",
        "average_liked_price": 67.50
      }
    }
  },
  "message": "User rating activity retrieved successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Trending Ideas

### Get Trending Ideas

```http
GET /ideas/trending
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `period` | string | Time period (hour, day, week, month) |
| `category` | string | Filter by category |
| `limit` | integer | Number of results (default: 20, max: 100) |
| `min_score` | number | Minimum trending score (0.0-1.0) |

### Example Response

```json
{
  "success": true,
  "data": {
    "trending_ideas": [
      {
        "idea": {
          "id": "idea_9876543210",
          "title": "Personalized Star Map for Anniversary",
          "author": {
            "username": "giftguru",
            "full_name": "John Doe"
          },
          "category": "handmade",
          "price_range": "25_50"
        },
        "trending_metrics": {
          "trending_score": 0.95,
          "velocity": 0.73,
          "acceleration": 0.45,
          "viral_coefficient": 1.2,
          "engagement_rate": 0.28
        },
        "recent_stats": {
          "likes_24h": 23,
          "comments_24h": 8,
          "saves_24h": 12,
          "shares_24h": 5,
          "views_24h": 156
        },
        "growth": {
          "likes_growth": 0.85,
          "comments_growth": 1.2,
          "saves_growth": 0.67,
          "total_growth": 0.89
        }
      }
    ],
    "trending_metadata": {
      "calculation_time": "2026-03-22T16:00:00Z",
      "next_update": "2026-03-22T17:00:00Z",
      "algorithm_version": "v2.1",
      "total_trending": 47
    }
  },
  "message": "Trending ideas retrieved successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Popular Ideas by Category

### Endpoint

```http
GET /ideas/popular/{category}
```

### Example Response

```json
{
  "success": true,
  "data": {
    "category": "electronics",
    "popular_ideas": [
      {
        "idea": {
          "id": "idea_1234567890",
          "title": "Wireless Charging Station with LED Display",
          "author": {
            "username": "techguru",
            "full_name": "Sarah Johnson"
          }
        },
        "popularity_metrics": {
          "popularity_score": 0.92,
          "total_engagement": 234,
          "like_ratio": 0.85,
          "save_ratio": 0.34,
          "comment_quality": 4.3
        },
        "stats": {
          "likes": 89,
          "saves": 45,
          "comments": 23,
          "shares": 12,
          "views": 567
        }
      }
    ],
    "category_stats": {
      "total_ideas": 1247,
      "average_popularity": 0.34,
      "top_price_range": "50_100",
      "most_active_period": "evening"
    }
  },
  "message": "Popular ideas retrieved successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Rating Analytics Dashboard

### Get Analytics Overview

```http
GET /analytics/ratings-overview
Authorization: Bearer <admin-token>
```

### Example Response

```json
{
  "success": true,
  "data": {
    "platform_stats": {
      "total_likes": 45672,
      "total_saves": 23456,
      "total_shares": 8901,
      "total_comments": 12345,
      "daily_growth": {
        "likes": 0.12,
        "saves": 0.08,
        "shares": 0.15,
        "comments": 0.09
      }
    },
    "engagement_trends": [
      {
        "date": "2026-03-22",
        "likes": 234,
        "saves": 123,
        "shares": 45,
        "comments": 67
      },
      {
        "date": "2026-03-21", 
        "likes": 198,
        "saves": 109,
        "shares": 38,
        "comments": 59
      }
    ],
    "top_performing_content": {
      "most_liked": {
        "idea_id": "idea_9876543210",
        "title": "Personalized Star Map for Anniversary",
        "likes": 156
      },
      "most_saved": {
        "idea_id": "idea_8765432109",
        "title": "Custom Photo Book",
        "saves": 89
      },
      "most_shared": {
        "idea_id": "idea_7654321098",
        "title": "Smart Home Starter Kit",
        "shares": 34
      }
    },
    "user_engagement": {
      "active_users_24h": 1247,
      "engaged_users_24h": 456,
      "power_users": 23,
      "average_session_actions": 3.4
    }
  },
  "message": "Analytics overview retrieved successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Export Rating Data

### Export User Ratings

```http
GET /users/{user_id}/ratings/export
Authorization: Bearer <token>
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `format` | string | Export format (json, csv, xlsx) |
| `date_from` | string | Start date (YYYY-MM-DD) |
| `date_to` | string | End date (YYYY-MM-DD) |
| `include_deleted` | boolean | Include deleted content |

### Example Response

```json
{
  "success": true,
  "data": {
    "export_id": "exp_1234567890",
    "download_url": "https://api.lovinideas.com/v1/exports/exp_1234567890/download",
    "expires_at": "2026-03-23T16:30:00Z",
    "file_info": {
      "format": "csv",
      "size_bytes": 15672,
      "record_count": 127,
      "columns": ["idea_id", "title", "action", "timestamp", "category"]
    }
  },
  "message": "Export prepared successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Error Responses

### Insufficient Permissions (403 Forbidden)

```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "You don't have permission to view this user's rating activity",
    "details": {
      "required_permission": "view_user_activity",
      "user_privacy_level": "private"
    }
  },
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Rate Limiting

- **Rating queries**: 200 requests per hour per user
- **Analytics queries**: 50 requests per hour per user
- **Export requests**: 10 requests per day per user

## cURL Examples

### Get Idea Ratings

```bash
curl "https://api.lovinideas.com/v1/ideas/idea_9876543210/ratings?period=week"
```

### Get Trending Ideas

```bash
curl "https://api.lovinideas.com/v1/ideas/trending?period=day&category=electronics&limit=10"
```

### Get User Rating Activity

```bash
curl "https://api.lovinideas.com/v1/users/usr_1234567890/rating-activity" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Export User Ratings

```bash
curl "https://api.lovinideas.com/v1/users/usr_1234567890/ratings/export?format=csv" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Performance Tips

1. **Use Appropriate Time Periods**: Shorter periods for real-time data, longer for trends
2. **Cache Analytics Data**: Cache frequently accessed analytics
3. **Limit Result Sets**: Use reasonable limits for better performance
4. **Batch Requests**: Combine multiple rating queries when possible
5. **Monitor Rate Limits**: Track API usage to avoid limits