# Authentication

User registration and login endpoints.

## Register User

### Endpoint
```http
POST /auth/register
```

### Request Body
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | User email |
| `password` | string | Yes | Password (min 8 chars) |
| `username` | string | Yes | Username (3-20 chars) |
| `full_name` | string | Yes | Full name |

### Example Request
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "username": "giftguru",
  "full_name": "John Doe"
}
```

### Response (201 Created)
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_1234567890",
      "email": "user@example.com",
      "username": "giftguru",
      "full_name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 86400
  }
}
```

## Login User

### Endpoint
```http
POST /auth/login
```

### Request Body
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | User email |
| `password` | string | Yes | User password |

### Example Request
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_1234567890",
      "username": "giftguru",
      "email": "user@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 86400
  }
}
```

## Using JWT Token

Include token in all API requests:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Token expires in 24 hours.** Login again to get new token.

## Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Invalid input data |
| `EMAIL_EXISTS` | Email already registered |
| `INVALID_CREDENTIALS` | Wrong email/password |
| `ACCOUNT_LOCKED` | Too many failed attempts |