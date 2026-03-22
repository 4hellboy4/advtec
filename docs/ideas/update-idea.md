# Update Gift Idea

Update an existing gift idea. Only the author or administrators can update ideas.

## Endpoint

```http
PUT /ideas/{idea_id}
Authorization: Bearer <token>
```

## Request Body

All fields are optional. Only include fields you want to update.

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Gift idea title (5-200 characters) |
| `description` | string | Detailed description (20-2000 characters) |
| `category` | string | Gift category |
| `occasion` | string | Occasion type |
| `price_range` | string | Price range category |
| `recipient_type` | string | Who is this gift for |
| `tags` | array | Array of tags (max 10) |
| `images` | array | Array of image URLs (max 5) |
| `purchase_links` | array | Where to buy this gift |
| `status` | string | Idea status (published, draft, archived) |

## Example Request

```json
{
  "title": "Personalized Star Map for Anniversary - Updated",
  "description": "A beautiful custom star map showing how the stars aligned on your special day. Perfect for anniversaries, weddings, or any romantic occasion. Updated with new vendor information and better pricing options.",
  "tags": ["romantic", "personalized", "wall-art", "astronomy", "custom", "anniversary"],
  "purchase_links": [
    {
      "store": "GreaterSkies",
      "url": "https://greaterskies.com/star-maps",
      "price": "$32"
    },
    {
      "store": "TheNightSky", 
      "url": "https://thenightsky.com/custom-maps",
      "price": "$38"
    },
    {
      "store": "StarMapStudio",
      "url": "https://starmapstudio.com/personalized",
      "price": "$35"
    }
  ]
}
```

## Example Response

### Success (200 OK)

```json
{
  "success": true,
  "data": {
    "idea": {
      "id": "idea_9876543210",
      "title": "Personalized Star Map for Anniversary - Updated",
      "description": "A beautiful custom star map showing how the stars aligned on your special day. Perfect for anniversaries, weddings, or any romantic occasion. Updated with new vendor information and better pricing options.",
      "category": "handmade",
      "occasion": "anniversary",
      "price_range": "25_50",
      "recipient_type": "partner",
      "tags": ["romantic", "personalized", "wall-art", "astronomy", "custom", "anniversary"],
      "images": [
        "https://cdn.lovinideas.com/ideas/idea_9876543210_1.jpg",
        "https://cdn.lovinideas.com/ideas/idea_9876543210_2.jpg"
      ],
      "purchase_links": [
        {
          "store": "GreaterSkies",
          "url": "https://greaterskies.com/star-maps",
          "price": "$32"
        },
        {
          "store": "TheNightSky",
          "url": "https://thenightsky.com/custom-maps", 
          "price": "$38"
        },
        {
          "store": "StarMapStudio",
          "url": "https://starmapstudio.com/personalized",
          "price": "$35"
        }
      ],
      "author": {
        "id": "usr_1234567890",
        "username": "giftguru",
        "full_name": "John Doe",
        "avatar_url": "https://cdn.lovinideas.com/avatars/usr_1234567890.jpg"
      },
      "stats": {
        "likes": 23,
        "comments": 5,
        "saves": 12,
        "views": 156
      },
      "created_at": "2026-03-20T14:30:00Z",
      "updated_at": "2026-03-22T16:30:00Z",
      "status": "published",
      "edit_history": {
        "total_edits": 2,
        "last_edited_by": "usr_1234567890",
        "last_edit_reason": "Updated pricing and vendor information"
      }
    }
  },
  "message": "Gift idea updated successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Partial Updates

You can update individual fields without affecting others:

### Update Only Title

```json
{
  "title": "New Amazing Gift Idea Title"
}
```

### Update Only Tags

```json
{
  "tags": ["new-tag", "updated", "fresh"]
}
```

### Update Status

```json
{
  "status": "draft"
}
```

## Status Values

- `published` - Visible to all users (default)
- `draft` - Only visible to author
- `archived` - Hidden from search but accessible via direct link
- `under_review` - Being reviewed by moderators
- `rejected` - Rejected by moderators

## Edit History

The API tracks edit history for ideas:

```json
{
  "edit_history": {
    "total_edits": 3,
    "last_edited_by": "usr_1234567890",
    "last_edit_reason": "Updated pricing information",
    "recent_edits": [
      {
        "edited_at": "2026-03-22T16:30:00Z",
        "edited_by": "usr_1234567890",
        "fields_changed": ["title", "purchase_links"],
        "reason": "Updated pricing information"
      },
      {
        "edited_at": "2026-03-21T10:15:00Z", 
        "edited_by": "usr_1234567890",
        "fields_changed": ["description", "tags"],
        "reason": "Added more details"
      }
    ]
  }
}
```

## Error Responses

### Unauthorized (403 Forbidden)

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED_UPDATE",
    "message": "You can only update your own ideas",
    "details": {
      "idea_author": "usr_9876543210",
      "current_user": "usr_1234567890"
    }
  },
  "timestamp": "2026-03-22T16:30:00Z"
}
```

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

### Validation Error (400 Bad Request)

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid update data",
    "details": {
      "title": "Title must be between 5 and 200 characters",
      "tags": "Maximum 10 tags allowed",
      "status": "Invalid status value"
    }
  },
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Update Restrictions

### Time Limits
- Ideas can be updated within 24 hours without moderation
- Updates after 24 hours may require moderator approval
- Ideas with 50+ likes require moderator approval for major changes

### Content Guidelines
- Updates must follow the same content guidelines as new ideas
- Significant changes to highly-liked ideas may be rejected
- Spam or promotional updates will result in account warnings

### Admin Updates
Administrators can update any idea and have additional fields:

```json
{
  "status": "under_review",
  "moderator_notes": "Updated for policy compliance",
  "featured": true,
  "admin_tags": ["featured", "trending"]
}
```

## Bulk Updates

### Update Multiple Ideas (Admin Only)

```http
PUT /ideas/bulk
Authorization: Bearer <admin-token>
```

```json
{
  "idea_ids": ["idea_1", "idea_2", "idea_3"],
  "updates": {
    "status": "archived",
    "admin_tags": ["bulk-update"]
  }
}
```

## Version Control

Ideas maintain version history:

### Get Edit History

```http
GET /ideas/{idea_id}/history
Authorization: Bearer <token>
```

### Revert to Previous Version (Author Only)

```http
POST /ideas/{idea_id}/revert
Authorization: Bearer <token>
```

```json
{
  "version_id": "ver_1234567890",
  "reason": "Reverting to previous pricing"
}
```

## cURL Examples

### Update Title and Description

```bash
curl -X PUT https://api.lovinideas.com/v1/ideas/idea_9876543210 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "title": "Updated Gift Idea Title",
    "description": "New and improved description with more details"
  }'
```

### Change Status to Draft

```bash
curl -X PUT https://api.lovinideas.com/v1/ideas/idea_9876543210 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "status": "draft"
  }'
```

### Update Purchase Links

```bash
curl -X PUT https://api.lovinideas.com/v1/ideas/idea_9876543210 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "purchase_links": [
      {
        "store": "Amazon",
        "url": "https://amazon.com/new-link",
        "price": "$45"
      }
    ]
  }'
```

## Best Practices

1. **Update Gradually**: Make small, incremental updates rather than major overhauls
2. **Preserve Engagement**: Don't drastically change highly-liked ideas
3. **Add Value**: Updates should improve the idea's usefulness
4. **Maintain Quality**: Follow the same quality standards as new ideas
5. **Document Changes**: Use clear edit reasons for transparency