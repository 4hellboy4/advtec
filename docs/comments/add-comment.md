# Add Comment

Add a comment to a gift idea to share your thoughts, experiences, or ask questions.

## Endpoint

```http
POST /ideas/{idea_id}/comments
Authorization: Bearer <token>
```

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `content` | string | Yes | Comment text (5-1000 characters) |
| `parent_id` | string | No | ID of parent comment (for replies) |
| `mentions` | array | No | Array of usernames to mention |

## Example Request

### Add Top-Level Comment

```json
{
  "content": "This is such a great idea! I gave a similar star map to my partner last year and they absolutely loved it. The quality from GreaterSkies is amazing - definitely recommend that vendor over the others.",
  "mentions": ["@giftguru"]
}
```

### Reply to Comment

```json
{
  "content": "Thanks for the recommendation! Did you go with the standard size or the larger version?",
  "parent_id": "cmt_1234567890"
}
```

## Example Response

### Success (201 Created)

```json
{
  "success": true,
  "data": {
    "comment": {
      "id": "cmt_9876543210",
      "content": "This is such a great idea! I gave a similar star map to my partner last year and they absolutely loved it. The quality from GreaterSkies is amazing - definitely recommend that vendor over the others.",
      "author": {
        "id": "usr_2345678901",
        "username": "stargazer",
        "full_name": "Emma Wilson",
        "avatar_url": "https://cdn.lovinideas.com/avatars/usr_2345678901.jpg"
      },
      "idea_id": "idea_9876543210",
      "parent_id": null,
      "mentions": [
        {
          "username": "giftguru",
          "user_id": "usr_1234567890",
          "position": 85
        }
      ],
      "stats": {
        "likes": 0,
        "replies": 0
      },
      "user_interaction": {
        "liked": false,
        "can_edit": true,
        "can_delete": true
      },
      "created_at": "2026-03-22T16:30:00Z",
      "updated_at": "2026-03-22T16:30:00Z",
      "edited": false
    }
  },
  "message": "Comment added successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Comment Threading

Comments support nested replies up to 3 levels deep:

```
Comment (Level 1)
├── Reply (Level 2)
│   ├── Reply to Reply (Level 3)
│   └── Reply to Reply (Level 3)
└── Reply (Level 2)
```

### Thread Structure Example

```json
{
  "comment": {
    "id": "cmt_1",
    "content": "Great idea!",
    "parent_id": null,
    "level": 1,
    "replies": [
      {
        "id": "cmt_2", 
        "content": "I agree, very creative!",
        "parent_id": "cmt_1",
        "level": 2,
        "replies": [
          {
            "id": "cmt_3",
            "content": "Where did you buy yours?",
            "parent_id": "cmt_2", 
            "level": 3,
            "replies": []
          }
        ]
      }
    ]
  }
}
```

## Mentions and Notifications

### Mentioning Users

Use `@username` in comment content and include in mentions array:

```json
{
  "content": "Hey @giftguru, thanks for sharing this! @stargazer might also find this interesting.",
  "mentions": ["giftguru", "stargazer"]
}
```

### Mention Response

```json
{
  "mentions": [
    {
      "username": "giftguru",
      "user_id": "usr_1234567890", 
      "position": 4,
      "notified": true
    },
    {
      "username": "stargazer",
      "user_id": "usr_2345678901",
      "position": 45,
      "notified": true
    }
  ]
}
```

## Comment Formatting

### Supported Markdown

Comments support basic Markdown formatting:

- **Bold**: `**text**` or `__text__`
- *Italic*: `*text*` or `_text_`
- `Code`: `` `code` ``
- [Links]: `[text](url)`
- Line breaks: Two spaces at end of line

### Example with Formatting

```json
{
  "content": "**Highly recommend** this gift! I bought it from [GreaterSkies](https://greaterskies.com) and the `quality` was *amazing*. \n\nPerfect for anniversaries!"
}
```

## Error Responses

### Invalid Content (400 Bad Request)

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid comment content",
    "details": {
      "content": "Comment must be between 5 and 1000 characters",
      "mentions": "User 'nonexistent' not found"
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

### Comment Disabled (403 Forbidden)

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

### Rate Limit Exceeded (429 Too Many Requests)

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many comments posted recently",
    "details": {
      "limit": "10 comments per hour",
      "reset_at": "2026-03-22T17:30:00Z"
    }
  },
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Comment Moderation

### Content Guidelines

Comments are subject to moderation and must follow guidelines:

- ✅ Constructive feedback and experiences
- ✅ Questions about the gift idea
- ✅ Additional suggestions and tips
- ✅ Vendor recommendations and warnings
- ❌ Spam or promotional content
- ❌ Off-topic discussions
- ❌ Personal attacks or harassment
- ❌ Inappropriate language

### Automatic Moderation

Comments are automatically screened for:

- Spam patterns
- Inappropriate language
- Excessive self-promotion
- Duplicate content

### Manual Review

Comments may be flagged for manual review if they:

- Contain multiple external links
- Include controversial topics
- Are reported by other users
- Come from new accounts

## Rate Limiting

- **Comments**: 10 per hour per user
- **Replies**: 20 per hour per user  
- **Mentions**: 5 mentions per comment
- **Edit Window**: 15 minutes after posting

## Comment Permissions

### User Permissions

| Action | Owner | Others | Admin |
|--------|-------|--------|-------|
| Add Comment | ✅ | ✅ | ✅ |
| Edit Comment | ✅ (15 min) | ❌ | ✅ |
| Delete Comment | ✅ | ❌ | ✅ |
| Like Comment | ❌ | ✅ | ✅ |
| Report Comment | ❌ | ✅ | ✅ |

## cURL Examples

### Add Simple Comment

```bash
curl -X POST https://api.lovinideas.com/v1/ideas/idea_9876543210/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "content": "Great idea! I tried something similar and it worked perfectly."
  }'
```

### Reply to Comment

```bash
curl -X POST https://api.lovinideas.com/v1/ideas/idea_9876543210/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "content": "Thanks for sharing your experience!",
    "parent_id": "cmt_1234567890"
  }'
```

### Comment with Mentions

```bash
curl -X POST https://api.lovinideas.com/v1/ideas/idea_9876543210/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "content": "Hey @giftguru, where did you find this vendor?",
    "mentions": ["giftguru"]
  }'
```

## Best Practices

1. **Be Constructive**: Provide helpful feedback and experiences
2. **Stay On Topic**: Keep comments relevant to the gift idea
3. **Share Experiences**: Personal experiences are most valuable
4. **Ask Questions**: Engage with the community
5. **Use Mentions Sparingly**: Only mention when directly relevant
6. **Format Well**: Use Markdown for better readability
7. **Respect Others**: Follow community guidelines