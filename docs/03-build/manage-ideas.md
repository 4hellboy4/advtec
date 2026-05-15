# Manage ideas

This guide describes how to perform the four lifecycle operations on gift ideas: create, read, update, and delete. For the complete field and parameter reference, see [Ideas](/04-reference/ideas).

## Prerequisites

- An authentication token. See [Authentication setup](/02-get-started/authentication-setup).
- Familiarity with the response envelope. See [Your first request](/02-get-started/first-request).

## Create an idea

A new idea requires `title`, `description`, `category`, `occasion`, `price_range`, and `recipient_type`. Tags are optional but improve discoverability.

```bash
curl -X POST "https://api.lovinideas.com/v1/ideas" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Personalized Star Map for Anniversary",
    "description": "Custom star map showing the stars on a specific date. High-quality print, ready to frame.",
    "category": "handmade",
    "occasion": "anniversary",
    "price_range": "25_50",
    "recipient_type": "partner",
    "tags": ["romantic", "personalized", "astronomy"]
  }'
```

### Field requirements

| Constraint | Detail |
|------------|--------|
| `title` length | 5–200 characters |
| `description` length | 20–2000 characters |
| Enumeration fields | Must use documented values; see [Ideas](/04-reference/ideas) |
| `tags` count | Maximum 10 |
| Tag format | Lowercase, no whitespace |

## Retrieve a single idea

```bash
curl "https://api.lovinideas.com/v1/ideas/idea_9876543210"
```

The response includes the idea object, the first page of comments, and aggregate statistics. To retrieve additional comments, call the comments endpoint directly. See [Comments](/04-reference/comments).

## Update an idea

Only the original author may update an idea. Include only the fields to be modified:

```bash
curl -X PUT "https://api.lovinideas.com/v1/ideas/idea_9876543210" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Personalized Star Map (updated 2026)"
  }'
```

Requests from non-authors return `403 UNAUTHORIZED_UPDATE`.

## Delete an idea

```bash
curl -X DELETE "https://api.lovinideas.com/v1/ideas/idea_9876543210" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Deletion is a soft delete with a 30-day retention period. During this window, the idea is removed from search and listing endpoints but can be restored through user settings. After 30 days, the idea is permanently deleted.

## Common errors

| Symptom | Likely cause |
|---------|--------------|
| `VALIDATION_ERROR` on create | Field length below the minimum, or an enumeration value misspelled |
| `DUPLICATE_TITLE` | The author already has an idea with the same title |
| `UNAUTHORIZED_UPDATE` | The token does not belong to the idea author |
| Empty `tags` array in response | An empty array was submitted, which is permitted |

## Related resources

- [Ideas](/04-reference/ideas) — complete endpoint reference.
- [Search and discover](/03-build/search-and-discover) — making ideas findable.
- [Social interactions](/03-build/social-interactions) — comments, likes, and ratings.
