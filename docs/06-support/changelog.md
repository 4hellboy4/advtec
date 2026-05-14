# Changelog

All notable changes to the LovInIdeas API are listed here. We follow [semantic versioning](https://semver.org/) — breaking changes mean a new major version.

## v1.2.0 — 2026-05-15

**Added**
- `recipient_type` filter on `GET /ideas` and `/ideas/search`.
- `DELETE /ideas/{id}/rating` to remove your rating without leaving a new one.
- `X-RateLimit-*` headers on every response.

**Changed**
- Documentation restructured around the CJM journey — content is the same, the navigation is clearer.

## v1.1.0 — 2026-02-04

**Added**
- Ratings (`POST /ideas/{id}/rating`) — 1–5 score with optional review.
- Webhooks for `idea.commented`, `idea.liked`, `user.followed_me`.
- `sort=popular` on `GET /ideas/search`.

**Fixed**
- `DUPLICATE_TITLE` was firing even when the conflicting idea belonged to another user. Now scoped per-author, as intended.

## v1.0.1 — 2025-12-12

**Fixed**
- Pagination `has_next` was occasionally `true` on the final page.
- `username` validation was case-sensitive in lookup but case-insensitive on register.

## v1.0.0 — 2025-11-01

Initial public release.
