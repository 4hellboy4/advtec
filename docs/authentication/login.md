# User Login

Authenticate user and receive JWT token.

## Endpoint

```http
POST /auth/login
```

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | User's email address |
| `password` | string | Yes | User's password |
| `remember_me` | boolean | No | Extend token expiration (default: false) |

## Example Request

```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "remember_me": true
}
```

## Example Response

### Success (200 OK)

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_1234567890",
      "email": "user@example.com",
      "username": "giftguru",
      "full_name": "John Doe",
      "bio": "Love finding perfect gifts for special occasions",
      "avatar_url": "https://cdn.lovinideas.com/avatars/usr_1234567890.jpg",
      "verified": true,
      "created_at": "2026-03-20T10:15:00Z",
      "last_login": "2026-03-22T16:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 604800,
    "token_type": "Bearer"
  },
  "message": "Login successful",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

### Error (401 Unauthorized)

```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Email or password is incorrect",
    "details": null
  },
  "timestamp": "2026-03-22T16:30:00Z"
}
```

### Error (423 Locked)

```json
{
  "success": false,
  "error": {
    "code": "ACCOUNT_LOCKED",
    "message": "Account temporarily locked due to multiple failed login attempts",
    "details": {
      "unlock_at": "2026-03-22T17:30:00Z",
      "remaining_minutes": 45
    }
  },
  "timestamp": "2026-03-22T16:45:00Z"
}
```

## Token Expiration

- **Standard login**: 24 hours (86400 seconds)
- **Remember me**: 7 days (604800 seconds)

## Security Features

- **Account Lockout**: 5 failed attempts locks account for 1 hour
- **Rate Limiting**: 10 login attempts per IP per minute
- **Password Hashing**: Bcrypt with salt rounds
- **JWT Security**: Tokens include user ID, role, and expiration

## Using the Token

Include the token in all subsequent API requests:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Error Codes

| Code | Description |
|------|-------------|
| `INVALID_CREDENTIALS` | Wrong email or password |
| `ACCOUNT_LOCKED` | Too many failed login attempts |
| `EMAIL_NOT_VERIFIED` | Email verification required |
| `ACCOUNT_SUSPENDED` | Account has been suspended |
| `RATE_LIMIT_EXCEEDED` | Too many login attempts |

## cURL Example

```bash
curl -X POST https://api.lovinideas.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securePassword123",
    "remember_me": true
  }'
```

## Next Steps

1. Store JWT token securely
2. Include token in Authorization header
3. Handle token expiration
4. Begin API usage with [Create Idea](/ideas/create-idea)