# Core concepts

A short tour of the vocabulary you'll see in every endpoint.

## Idea

The central object. An idea is a gift suggestion someone posted — a star map for an anniversary, a wireless charger for a colleague's birthday, a cookbook for a friend who just moved into their first kitchen.

Every idea has:
- A **title** and **description** written by the author.
- A **category** (`electronics`, `handmade`, `experiences`, …) — what *kind* of thing it is.
- An **occasion** (`birthday`, `wedding`, `just_because`, …) — *when* you'd give it.
- A **recipient type** (`partner`, `colleague`, `child`, …) — *who* it's for.
- A **price range** (`under_25`, `25_50`, `50_100`, …) — budget bucket.
- Optional **tags** for free-form description (`romantic`, `eco-friendly`, `last-minute`).

These five facets are what powers search. The better the metadata, the better the recommendations.

## User

Anyone with an account. Users author ideas, leave comments, give likes and ratings, and follow other users whose taste they trust.

A user has a **profile** (public) and **settings** (private). The profile is what other users see; settings are things like notification preferences and default filters.

## Comment

A reply attached to an idea. Comments can themselves have replies (one level of nesting), giving you a small discussion thread per idea.

## Rating (and like)

A **like** is binary — a quick "yes, I'd give this." A **rating** is a 1–5 score with optional text. Together they signal which ideas the community values most, which drives the `sort=popular` ordering.

## Authentication

Almost everything that *writes* requires authentication. Browsing public ideas does not. Auth is JWT-based — see [authentication setup](/02-get-started/authentication-setup).

## The response envelope

Every response looks like this:

```json
{
  "success": true,
  "data": { /* the actual result */ },
  "timestamp": "2026-05-15T12:00:00Z"
}
```

On failure, `success: false` and an `error` object replaces `data`. This consistency means you can write one parser for everything.

## What's next

- [Quick Start](/02-get-started/quick-start) — make your first request.
