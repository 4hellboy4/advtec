# Use cases

Not sure if the API fits your project? Here are some patterns we see often.

## The "what should I get her?" chatbot

A user opens a chat, says *"my sister's 30th, she likes hiking, budget 100"*, and gets back five concrete suggestions with descriptions and prices.

What you'd use:
- `GET /ideas/search` with filters for `occasion`, `recipient_type`, `price_range`, and tags.
- The `sort=popular` parameter to surface community favourites.

## The corporate gifting tool

HR teams need to send birthday gifts to 200 employees per year without rebuilding the wheel each time.

What you'd use:
- `GET /ideas` with filters by `recipient_type=colleague` and `price_range`.
- User profile endpoints to remember each employee's preferences.

## The personal gift journal

A private app where one user tracks "what I've given to whom" so they don't repeat themselves at the next family Christmas.

What you'd use:
- Authentication for a single user.
- `POST /ideas` to save their own picks, plus tags to mark "given to mom 2025".

## The discovery feed

A public site that curates trending gift ideas for the upcoming holiday — Valentine's, Mother's Day, graduation season.

What you'd use:
- `GET /ideas` with `occasion` filters and `sort=popular`.
- Public endpoints (no auth needed for read-only browsing).

## What's next

- [Core concepts](/01-discover/concepts) — the vocabulary you'll see throughout the docs.
- [Quick Start](/02-get-started/quick-start) — make your first call in five minutes.
