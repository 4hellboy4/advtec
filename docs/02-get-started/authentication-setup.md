# Authentication setup

This document describes how to obtain and use JSON Web Tokens (JWT) for authenticated API requests.

## Token lifecycle

The API uses bearer tokens with the following properties:

| Property | Value |
|----------|-------|
| Token type | JWT |
| Validity period | 86400 seconds (24 hours) |
| Refresh mechanism | None; clients must re-authenticate after expiry |

## Procedure

### Step 1. Obtain a token

Submit a login request with valid credentials:

```bash
curl -X POST https://api.lovinideas.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!"
  }'
```

The response contains the token and its validity period in seconds:

```json
{
  "success": true,
  "data": {
    "user": { "id": "usr_...", "username": "developer" },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 86400
  }
}
```

### Step 2. Include the token in requests

Add the token to the `Authorization` header of each authenticated request:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Authentication requirements by endpoint type

| Operation | Authentication |
|-----------|----------------|
| Browsing public ideas | Not required |
| Searching public ideas | Not required |
| Creating, updating, or deleting ideas | Required |
| Posting comments, likes, or ratings | Required |
| Reading or modifying user profile and settings | Required |
| Registering or managing webhooks | Required |

## Token storage

Tokens grant full access to the associated account. Store them according to the deployment environment:

| Environment | Recommended storage |
|-------------|---------------------|
| Server-side application | Environment variable or secrets manager |
| Browser application | HTTP-only cookie issued by a backend proxy |
| Mobile application | Platform secure storage (iOS Keychain, Android Keystore) |

Tokens must not be committed to source control, logged, or exposed in client-side code.

## Handling token expiry

When a token expires, the API returns `401 Unauthorized` with `error.code = "TOKEN_EXPIRED"`. The recommended client behavior is:

1. Detect the `TOKEN_EXPIRED` error code.
2. Repeat the login procedure transparently.
3. Retry the original request once.
4. If the retry also fails, surface the error to the user.

## Related resources

- [Your first request](/02-get-started/first-request) — example of an authenticated request.
- [Authentication](/04-reference/authentication) — complete endpoint reference.
- [Errors](/04-reference/errors) — error code catalog.
