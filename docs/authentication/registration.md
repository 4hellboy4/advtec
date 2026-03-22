# User Registration

Create new user account.

## Endpoint

```http
POST /auth/register
```

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | User's email address |
| `password` | string | Yes | Password (min 8 characters) |
| `username` | string | Yes | Unique username (3-20 characters) |
| `full_name` | string | Yes | User's full name |
| `bio` | string | No | Short biography (max 500 characters) |

## Example Request

```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "username": "giftguru",
  "full_name": "John Doe",
  "bio": "Love finding perfect gifts for special occasions"
}
```

## Example Response

### Success (201 Created)

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
      "avatar_url": null,
      "created_at": "2026-03-22T16:30:00Z",
      "verified": false
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 86400
  },
  "message": "User registered successfully. Please verify your email.",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

### Error (400 Bad Request)

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Registration failed due to validation errors",
    "details": {
      "email": "Email already exists",
      "username": "Username must be unique"
    }
  },
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Validation Rules

- **Email**: Must be valid email format and unique
- **Password**: Minimum 8 characters, must contain letters and numbers
- **Username**: 3-20 characters, alphanumeric and underscores only, must be unique
- **Full Name**: 2-100 characters
- **Bio**: Optional, maximum 500 characters

## Rate Limiting

Registration endpoint is limited to:
- 5 attempts per IP address per hour
- 1 successful registration per IP per day

## Next Steps

1. Verify email address
2. [Login](/authentication/login) for fresh token
3. Complete profile setup

## Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Input validation failed |
| `EMAIL_EXISTS` | Email already registered |
| `USERNAME_EXISTS` | Username already taken |
| `RATE_LIMIT_EXCEEDED` | Too many registration attempts |

## cURL Example

```bash
curl -X POST https://api.lovinideas.com/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securePassword123",
    "username": "giftguru",
    "full_name": "John Doe",
    "bio": "Love finding perfect gifts for special occasions"
  }'
```