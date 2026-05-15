# Users

Endpoints for retrieving and modifying user profiles, settings, and follow relationships.

## Endpoint summary

| Method | Path | Authorization |
|--------|------|---------------|
| `GET` | `/users/{user_id}/profile` | Not required |
| `GET` | `/users/by-username/{username}` | Not required |
| `PATCH` | `/users/me/profile` | Required |
| `GET` | `/users/me/settings` | Required |
| `PATCH` | `/users/me/settings` | Required |
| `POST` | `/users/{user_id}/follow` | Required |

## Get a user profile

```http
GET /users/{user_id}/profile
```

Returns the public profile of the specified user.

### Response

`200 OK`

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_1234567890",
      "username": "giftguru",
      "full_name": "John Doe",
      "bio": "Recommends gifts for a variety of occasions.",
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

### Status codes

| Code | Condition |
|------|-----------|
| `200` | Profile returned |
| `403` | Profile is not visible to the requester |
| `404` | User not found |

## Look up a user by username

```http
GET /users/by-username/{username}
```

Returns the same response shape as `GET /users/{user_id}/profile`.

## Update the authenticated user's profile

```http
PATCH /users/me/profile
Authorization: Bearer <token>
Content-Type: application/json
```

### Request body

| Field | Type | Constraints |
|-------|------|-------------|
| `full_name` | string | 1–100 characters |
| `bio` | string | 0–280 characters |
| `avatar_url` | string | Valid image URL |

Only the fields provided in the request body are updated.

### Status codes

| Code | Condition |
|------|-----------|
| `200` | Profile updated |
| `400` | Validation failure |
| `401` | Missing or invalid token |

## Get the authenticated user's settings

```http
GET /users/me/settings
Authorization: Bearer <token>
```

Returns notification preferences, default filters, and privacy options for the authenticated user.

## Update the authenticated user's settings

```http
PATCH /users/me/settings
Authorization: Bearer <token>
Content-Type: application/json
```

### Request body

| Field | Type | Description |
|-------|------|-------------|
| `email_notifications` | boolean | Master toggle for email notifications |
| `notify_on_comment` | boolean | Email notification when a comment is posted on an authored idea |
| `notify_on_like` | boolean | Email notification when an authored idea is liked |
| `default_currency` | string | ISO 4217 currency code (for example, `USD`, `EUR`, `RUB`) |
| `profile_visibility` | string | One of `public`, `followers_only`, `private` |

All fields are optional. Only the fields provided in the request body are updated.

## Follow a user

```http
POST /users/{user_id}/follow
Authorization: Bearer <token>
```

This endpoint toggles the follow state. A repeated call by the same user removes the follow relationship.

### Response

`200 OK`

```json
{
  "success": true,
  "data": {
    "following": true,
    "follower_count": 90
  }
}
```

### Status codes

| Code | Condition |
|------|-----------|
| `200` | Follow state toggled |
| `401` | Missing or invalid token |
| `403` | The authenticated user is the target user |
| `404` | Target user not found |

## Error codes

| Code | HTTP status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | One or more fields failed validation |
| `USER_NOT_FOUND` | 404 | No user exists with the specified identifier or username |
| `PROFILE_PRIVATE` | 403 | Profile is not visible to the requester |
| `SELF_FOLLOW_FORBIDDEN` | 403 | A user cannot follow their own account |

## Related resources

- [Errors](/04-reference/errors) — complete error code catalog.
