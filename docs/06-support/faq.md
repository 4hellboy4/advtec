# FAQ

## Is the API free to use?

For personal projects and small apps, yes. Commercial usage above 10,000 requests per day requires a paid plan — get in touch via [contact](/06-support/contact) and we'll set it up.

## Can I use the API without an account?

You can read public ideas without authenticating. Anything that creates, updates, or interacts socially needs an account.

## Do you have official SDKs?

Not yet. The API is small enough that a thin wrapper around `fetch` (or your language's HTTP client) covers it well — the [Quick Start](/02-get-started/quick-start) has a JS example. If you write one in another language, we'd love to link to it.

## How long do tokens last? Is there a refresh token?

24 hours, and no refresh token. We deliberately keep it simple: log in again when the token expires.

## What's the data retention policy?

- Deleted ideas: 30-day soft delete, then permanent.
- Deleted accounts: 14-day soft delete, then permanent. All your ideas, comments, and ratings are removed at the same time.
- Webhooks deliveries: logged for 7 days for debugging purposes.

## Can I bulk-import existing ideas?

There's no dedicated bulk endpoint right now. Posting in a loop with respectful pacing (one every few seconds) works for hundreds of ideas. If you need to import thousands, [contact us](/06-support/contact) — we can enable a temporary higher rate limit.

## Why isn't endpoint X documented?

Either (a) it's internal-only and isn't part of the public contract, or (b) we forgot. If you're seeing something in our website's network tab that isn't here, ask us.

## How do I report a security issue?

Email security@lovinideas.com — please don't open a public GitHub issue for vulnerabilities. We respond within 48 hours.

## What CORS origins are allowed?

`*` for public read endpoints. For authenticated endpoints, you'll want a server-side proxy so your JWT never reaches the browser — see [best practices](/05-advanced/best-practices).
