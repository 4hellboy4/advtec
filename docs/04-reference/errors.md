# Errors

Complete catalog of error codes returned by the API, grouped by domain.

## Error response format

All error responses share the following structure:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable description.",
    "details": {
      "field": "title",
      "received": "TV"
    }
  },
  "timestamp": "2026-05-15T12:00:00Z"
}
```

| Field | Description |
|-------|-------------|
| `success` | Always `false` for error responses |
| `error.code` | Machine-readable error identifier; use this for programmatic handling |
| `error.message` | Human-readable description; intended for logging and user display |
| `error.details` | Optional object containing contextual information specific to the error |
| `timestamp` | ISO 8601 timestamp of the response |

## HTTP status codes

| Status | Meaning |
|--------|---------|
| `400` | Bad request; typically a validation failure |
| `401` | Authentication required or token invalid |
| `403` | Authenticated, but not authorized for this operation |
| `404` | Resource does not exist |
| `409` | Conflict with existing resource or state |
| `422` | Request is syntactically valid but semantically incorrect |
| `423` | Resource is locked |
| `429` | Rate limit exceeded |
| `500` | Internal server error |
| `503` | Service temporarily unavailable |

## Authentication errors

| Code | HTTP status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | One or more fields failed validation |
| `EMAIL_EXISTS` | 409 | Email address is already registered |
| `USERNAME_TAKEN` | 409 | Username is already in use |
| `INVALID_CREDENTIALS` | 401 | Email or password is incorrect |
| `ACCOUNT_LOCKED` | 423 | Account is locked due to repeated failed attempts |
| `TOKEN_EXPIRED` | 401 | Authentication token has expired |
| `TOKEN_INVALID` | 401 | Authentication token is malformed or revoked |

## Idea errors

| Code | HTTP status | Description |
|------|-------------|-------------|
| `IDEA_NOT_FOUND` | 404 | No idea exists with the specified identifier |
| `UNAUTHORIZED_UPDATE` | 403 | The authenticated user is not the idea author |
| `DUPLICATE_TITLE` | 409 | The author already has an idea with this title |
| `ENUM_INVALID` | 400 | An enumeration field contains an unsupported value |

## Comment errors

| Code | HTTP status | Description |
|------|-------------|-------------|
| `COMMENT_NOT_FOUND` | 404 | The referenced comment does not exist |
| `COMMENTS_DISABLED` | 403 | Comments are disabled for the target idea |

## Rating errors

| Code | HTTP status | Description |
|------|-------------|-------------|
| `SELF_RATING_FORBIDDEN` | 403 | A user cannot rate their own idea |

## User errors

| Code | HTTP status | Description |
|------|-------------|-------------|
| `USER_NOT_FOUND` | 404 | No user exists with the specified identifier or username |
| `PROFILE_PRIVATE` | 403 | Profile is not visible to the requester |
| `SELF_FOLLOW_FORBIDDEN` | 403 | A user cannot follow their own account |

## Global errors

| Code | HTTP status | Description |
|------|-------------|-------------|
| `RATE_LIMIT_EXCEEDED` | 429 | Rate limit exceeded; see the `Retry-After` header |
| `INTERNAL_ERROR` | 500 | An unexpected error occurred on the server |
| `MAINTENANCE` | 503 | The API is temporarily unavailable due to planned maintenance |

## Related resources

- [Rate limits](/05-advanced/rate-limits) — rate limit specifications and retry guidance.
- [Authentication](/04-reference/authentication) — token lifecycle and renewal.
