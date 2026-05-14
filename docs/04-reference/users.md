# Users reference

Read and update user profiles and settings.

## Get a user profile

```http
GET /users/{user_id}/profile
```

Public endpoint — no auth needed.

### Response

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_1234567890",
      "username": "giftguru",
      "full_name": "John Doe",
      "bio": "I just like helping people find better presents.",
      "avatar_url": "https://cdn.lovinideas.com/avatars/usr_1234567890.jpg",
      "stats": {
        "ideas_posted": 42,
        "likes_received": 1203,
        "followers": 89,
        "following": 31
      },
      "joined_at": "2025-08-12T10:00:00Z"
    }
  }
}
```

You can also use `GET /users/by-username/{username}` if you only have the handle.

## Update your profile

```http
PATCH /users/me/profile
Authorization: Bearer <token>
```

### Request body

| Field | Type | Description |
|-------|------|-------------|
| `full_name` | string | 1–100 chars |
| `bio` | string | Up to 280 chars |
| `avatar_url` | string | URL, image only |

Send only the fields you want to change.

## Get your settings

```http
GET /users/me/settings
Authorization: Bearer <token>
```

Returns notification preferences, default filters, privacy options.

## Update your settings

```http
PATCH /users/me/settings
Authorization: Bearer <token>
```

### Request body (all fields optional)

| Field | Type | Description |
|-------|------|-------------|
| `email_notifications` | boolean | Master toggle for email |
| `notify_on_comment` | boolean | Email when someone comments on your idea |
| `notify_on_like` | boolean | Email when someone likes your idea |
| `default_currency` | string | ISO 4217 code (e.g. `USD`, `EUR`, `RUB`) |
| `profile_visibility` | string | `public`, `followers_only`, `private` |

## Follow a user

```http
POST /users/{user_id}/follow
Authorization: Bearer <token>
```

Toggles — call again to unfollow. Response includes the new state and follower count.

## Error codes

| Code | When you'll see it |
|------|---------------------|
| `USER_NOT_FOUND` | No user with that ID or username |
| `VALIDATION_ERROR` | A field failed validation |
| `PROFILE_PRIVATE` | The profile exists but isn't viewable by you |
| `SELF_FOLLOW_FORBIDDEN` | You can't follow yourself |
