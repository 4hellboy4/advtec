# Authentication reference

Complete reference for registration, login, and JWT handling. For a walkthrough, see [authentication setup](/02-get-started/authentication-setup).

## Register a user

```http
POST /auth/register
```

### Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Valid email address |
| `password` | string | Yes | At least 8 characters |
| `username` | string | Yes | 3–20 characters, unique |
| `full_name` | string | Yes | Display name |

### Example

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "username": "giftguru",
  "full_name": "John Doe"
}
```

### Response — `201 Created`

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

## Log in

```http
POST /auth/login
```

### Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Registered email |
| `password` | string | Yes | Account password |

### Response — `200 OK`

Same shape as register, minus `full_name` in the user object (already known to the client).

## Using the token

Send it on every authenticated request:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Tokens expire in **86400 seconds** (24 hours). There is no refresh endpoint — log in again to get a new one.

## Error codes

| Code | When you'll see it |
|------|---------------------|
| `VALIDATION_ERROR` | Email malformed, password too short, username out of range |
| `EMAIL_EXISTS` | The email is already registered |
| `USERNAME_TAKEN` | Someone else has that username |
| `INVALID_CREDENTIALS` | Wrong email or password (intentionally vague) |
| `ACCOUNT_LOCKED` | Too many failed attempts — try again in 15 minutes |
| `TOKEN_EXPIRED` | The JWT has expired; log in again |
| `TOKEN_INVALID` | Token is malformed or has been revoked |
