# Authentication

Endpoints for user registration, login, and JSON Web Token (JWT) handling.

For a procedural walkthrough, see [Authentication setup](/02-get-started/authentication-setup).

## Endpoint summary

| Method | Path | Authorization |
|--------|------|---------------|
| `POST` | `/auth/register` | Not required |
| `POST` | `/auth/login` | Not required |

## Register a user

Creates a new user account and returns an authentication token.

```http
POST /auth/register
Content-Type: application/json
```

### Request body

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `email` | string | Yes | Valid email address; unique across all accounts |
| `password` | string | Yes | Minimum 8 characters |
| `username` | string | Yes | 3–20 characters; unique across all accounts |
| `full_name` | string | Yes | 1–100 characters |

### Example request

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "username": "giftguru",
  "full_name": "John Doe"
}
```

### Response

`201 Created`

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
  },
  "timestamp": "2026-05-15T12:00:00Z"
}
```

### Status codes

| Code | Condition |
|------|-----------|
| `201` | Account created |
| `400` | Validation failure |
| `409` | Email or username already registered |

## Log in

Authenticates an existing user and returns a new token.

```http
POST /auth/login
Content-Type: application/json
```

### Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Registered email address |
| `password` | string | Yes | Account password |

### Response

`200 OK`

Response shape matches `POST /auth/register`, excluding the `full_name` field in the `user` object.

### Status codes

| Code | Condition |
|------|-----------|
| `200` | Authentication successful |
| `400` | Validation failure |
| `401` | Invalid credentials |
| `423` | Account locked due to repeated failed attempts |

## Token usage

Include the token in the `Authorization` header of every authenticated request:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Tokens are valid for 86400 seconds (24 hours). The API does not provide a refresh endpoint. To obtain a new token, repeat the login procedure.

## Error codes

| Code | HTTP status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | One or more fields failed validation |
| `EMAIL_EXISTS` | 409 | Email address is already registered |
| `USERNAME_TAKEN` | 409 | Username is already in use |
| `INVALID_CREDENTIALS` | 401 | Email or password is incorrect |
| `ACCOUNT_LOCKED` | 423 | Account is locked due to repeated failed attempts |
| `TOKEN_EXPIRED` | 401 | Authentication token has expired |
| `TOKEN_INVALID` | 401 | Authentication token is malformed or revoked |

## Related resources

- [Authentication setup](/02-get-started/authentication-setup) — procedural guide.
- [Errors](/04-reference/errors) — complete error code catalog.
