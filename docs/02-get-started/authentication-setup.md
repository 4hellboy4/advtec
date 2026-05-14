# Authentication setup

LovInIdeas uses JWT bearer tokens. The short version: log in once, get a token, send it on every authenticated request. Tokens last 24 hours; after that, log in again.

## Get a token

```bash
curl -X POST https://api.lovinideas.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "you@example.com",
    "password": "SecurePass123!"
  }'
```

The response:

```json
{
  "success": true,
  "data": {
    "user": { "id": "usr_...", "username": "you" },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 86400
  }
}
```

`expires_in` is seconds — 86400 = 24 hours.

## Use the token

Add it to the `Authorization` header on every authenticated request:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

That's it. No refresh tokens, no rotation — keep it simple, log in again when it expires.

## What needs auth, what doesn't

| Type of request | Auth required? |
|-----------------|----------------|
| Browsing public ideas (`GET /ideas`) | No |
| Searching (`GET /ideas/search`) | No |
| Creating / updating / deleting ideas | Yes |
| Commenting, liking, rating | Yes |
| Anything that touches a user profile | Yes |

A good rule of thumb: if the action would *create or change* something attributed to a person, it needs a token.

## Storing the token safely

- **Server-side apps:** environment variable or secrets manager. Never in your repo.
- **Browser apps:** `httpOnly` cookies set by your backend, not `localStorage`.
- **Mobile apps:** the platform keychain (iOS Keychain, Android Keystore).

## Handling expiry

When a token expires, you'll get `401 Unauthorized` with `error.code = "TOKEN_EXPIRED"`. Re-login transparently and retry the request — once. If the second attempt also fails, surface the error to the user.

## What's next

- [Your first request](/02-get-started/first-request) — make an authenticated call end-to-end.
- [Authentication reference](/04-reference/authentication) — every field, every error code.
