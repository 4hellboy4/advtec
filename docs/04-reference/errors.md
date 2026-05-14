# Errors reference

A single catalogue of every error code the API can return, plus the HTTP status it travels with.

## Anatomy of an error response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Title must be at least 5 characters",
    "details": {
      "field": "title",
      "received": "TV"
    }
  },
  "timestamp": "2026-05-15T12:00:00Z"
}
```

Always check `success` first. If it's `false`, the `error.code` is your switch statement key — `error.message` is for humans, `error.details` is contextual extras.

## HTTP status codes used

| Status | Meaning |
|--------|---------|
| `400` | Bad request — usually validation |
| `401` | Missing or invalid token |
| `403` | Authenticated, but not allowed to do this |
| `404` | The resource doesn't exist |
| `409` | Conflict — duplicate, or state collision |
| `422` | The request is valid syntactically but semantically wrong |
| `429` | Rate limit hit |
| `500` | Something broke on our side |

## Codes by area

### Authentication
| Code | Status | Meaning |
|------|--------|---------|
| `VALIDATION_ERROR` | 400 | Field failed validation |
| `EMAIL_EXISTS` | 409 | Email already registered |
| `USERNAME_TAKEN` | 409 | Username already taken |
| `INVALID_CREDENTIALS` | 401 | Wrong email/password |
| `ACCOUNT_LOCKED` | 401 | Too many failed attempts |
| `TOKEN_EXPIRED` | 401 | JWT has expired |
| `TOKEN_INVALID` | 401 | JWT is malformed or revoked |

### Ideas
| Code | Status | Meaning |
|------|--------|---------|
| `IDEA_NOT_FOUND` | 404 | No idea with that ID |
| `UNAUTHORIZED_UPDATE` | 403 | You're not the author |
| `DUPLICATE_TITLE` | 409 | You already have that title |
| `ENUM_INVALID` | 400 | Category/occasion/etc. value not in allowed list |

### Comments
| Code | Status | Meaning |
|------|--------|---------|
| `COMMENT_NOT_FOUND` | 404 | `parent_id` doesn't resolve |
| `COMMENTS_DISABLED` | 403 | Author has turned off comments |

### Ratings
| Code | Status | Meaning |
|------|--------|---------|
| `SELF_RATING_FORBIDDEN` | 403 | Can't rate your own idea |

### Users
| Code | Status | Meaning |
|------|--------|---------|
| `USER_NOT_FOUND` | 404 | No user with that ID/username |
| `PROFILE_PRIVATE` | 403 | Profile isn't viewable by you |
| `SELF_FOLLOW_FORBIDDEN` | 403 | Can't follow yourself |

### Global
| Code | Status | Meaning |
|------|--------|---------|
| `RATE_LIMIT_EXCEEDED` | 429 | You're hitting the API too fast |
| `INTERNAL_ERROR` | 500 | We broke something — please retry |
| `MAINTENANCE` | 503 | Brief planned downtime |
