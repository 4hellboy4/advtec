# Changelog

This document records changes to the LovInIdeas API. The API follows [semantic versioning](https://semver.org/). Backward-incompatible changes increment the major version.

## v1.2.0 — 2026-05-15

### Added
- `recipient_type` filter on `GET /ideas` and `GET /ideas/search`.
- `DELETE /ideas/{id}/rating` endpoint for removing a previously submitted rating.
- `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset` headers on all responses.

### Changed
- Documentation restructured according to the Customer Journey Map. Content is preserved; navigation is reorganized.

## v1.1.0 — 2026-02-04

### Added
- Ratings endpoint (`POST /ideas/{id}/rating`) supporting a 1–5 score with optional written review.
- Webhook events: `idea.commented`, `idea.liked`, `user.followed_me`.
- `sort=popular` parameter on `GET /ideas/search`.

### Fixed
- `DUPLICATE_TITLE` no longer triggers across different users. The uniqueness constraint is now correctly scoped per author.

## v1.0.1 — 2025-12-12

### Fixed
- `pagination.has_next` no longer returns `true` on the final page in edge cases.
- Username lookup is now case-insensitive, consistent with registration behavior.

## v1.0.0 — 2025-11-01

Initial public release.
