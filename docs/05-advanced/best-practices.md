# Best practices

Things we've watched developers learn the hard way. None of them are rules — they're shortcuts past common mistakes.

## Treat tokens like passwords

A JWT is bearer auth: whoever holds it *is* the user. Never log it, never commit it, never paste it into a screenshot. Rotate by re-logging in if you suspect leakage.

## Always check `success` before reading `data`

The response envelope is consistent for a reason. Code that reads `response.data.ideas` without first checking `response.success` will crash exactly when the API is having its worst day.

```javascript
const res = await api.getIdeas();
if (!res.success) {
  return handleError(res.error);
}
const ideas = res.data.ideas;
```

## Cache lookup data, not user data

`GET /ideas/{id}` for a popular idea is fine to cache for a few minutes. `GET /users/me/settings` is not — it changes when the user changes it, and a stale cache will confuse them.

## Use filters server-side, not client-side

If you're fetching 5000 ideas and filtering for `category=electronics` in your code, you're paying for 5000 items when you wanted 200. Push the filter into the query string.

## Honour rate-limit headers proactively

Don't wait for `429`. If `X-RateLimit-Remaining` is below 10% of your limit, slow down voluntarily. Your users will never see an error.

## Make your retry policy boring

Bounded retries with exponential backoff and a jitter component. Three retries max. Always respect `Retry-After`. Never retry `4xx` errors that aren't `429` — they won't get better.

## Webhooks must be idempotent

The same event can be delivered twice. Use the `event` + `delivered_at` + the underlying object's ID as a dedupe key.

## Pin to `v1`

The base URL has a version segment for a reason. Always include `/v1` explicitly — don't strip it "because it works without". When we ship `/v2`, your code will keep working.

## Build for the response envelope

Centralise response parsing. One function that takes a raw response, checks `success`, surfaces `error` consistently, and returns `data`. Every call site stays clean.
