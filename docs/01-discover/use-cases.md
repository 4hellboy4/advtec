# Use cases

This document describes representative integration scenarios for the LovInIdeas API, along with the endpoints required for each.

## Gift recommendation chatbot

**Scenario:** A conversational interface (Telegram, Slack, Discord) accepts criteria such as recipient type, occasion, and budget, and returns suggested gift ideas.

**Endpoints used:**

- `GET /ideas/search` with `q`, `recipient_type`, `price_range`, and `occasion` filters.
- `sort=popular` to prioritize community-favored ideas.

## Corporate gifting tool

**Scenario:** An internal HR application generates gift suggestions for employees on birthdays and work anniversaries.

**Endpoints used:**

- `GET /ideas` with `recipient_type=colleague` and `price_range` filters.
- User profile endpoints to store preferences per employee.

## Personal gift journal

**Scenario:** A private application that records gifts a user has given, indexed by recipient.

**Endpoints used:**

- Authentication endpoints for a single-user setup.
- `POST /ideas` to save selected items.
- Tags to associate gifts with recipients and dates.

## Curated discovery feed

**Scenario:** A public website that surfaces trending gift ideas for upcoming holidays such as Valentine's Day, Mother's Day, or graduation season.

**Endpoints used:**

- `GET /ideas` with `occasion` filters and `sort=popular`.
- No authentication required for read-only browsing.

## Related resources

- [Core concepts](/01-discover/concepts) — terminology used in API requests and responses.
- [Quick start](/02-get-started/quick-start) — first API request.
