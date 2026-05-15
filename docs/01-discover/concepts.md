# Core concepts

This document defines the terminology used throughout the API.

## Idea

An idea represents a single gift recommendation authored by a user. Each idea has the following attributes:

| Attribute | Description |
|-----------|-------------|
| Title | Short descriptive name |
| Description | Detailed explanation of the gift |
| Category | Type of item, such as `electronics` or `handmade` |
| Occasion | Event for which the gift is suitable, such as `birthday` or `anniversary` |
| Recipient type | Intended recipient, such as `partner` or `colleague` |
| Price range | Budget bucket, such as `25_50` or `100_250` |
| Tags | Optional free-form keywords for additional classification |

These attributes form the basis for search, filtering, and discovery.

## User

A user is an account holder. Users author ideas, post comments, submit likes and ratings, and follow other users.

A user has two distinct data sets:

| Set | Visibility | Description |
|-----|------------|-------------|
| Profile | Public | Username, display name, bio, avatar, aggregate statistics |
| Settings | Private | Notification preferences, default filters, privacy options |

## Comment

A comment is a textual response attached to an idea. Comments support one level of nesting: replies may be posted to top-level comments but not to other replies.

## Rating

A rating is a numeric score from 1 to 5, optionally accompanied by a written review. Each user may submit one rating per idea. Aggregated ratings contribute to the `popular` sort order.

## Like

A like is a binary indicator of approval. Likes can be applied to ideas and to comments. Like counts contribute to the `popular` sort order.

## Authentication

The API uses JSON Web Tokens (JWT). Operations that create or modify data require an authenticated request. Read-only operations on public data do not require authentication.

For details, see [Authentication setup](/02-get-started/authentication-setup).

## Response envelope

All API responses share a common structure:

```json
{
  "success": true,
  "data": { /* response payload */ },
  "timestamp": "2026-05-15T12:00:00Z"
}
```

Error responses replace `data` with an `error` object. See [Errors](/04-reference/errors) for the complete format specification.

## Related resources

- [Quick start](/02-get-started/quick-start) — first API request.
- [Overview](/01-discover/overview) — high-level platform description.
