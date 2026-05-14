# Rate limits

The API enforces rate limits so one noisy client doesn't ruin the day for everyone else. They're generous for normal use and easy to handle gracefully.

## The numbers

| Bucket | Limit |
|--------|-------|
| Authenticated requests, overall | 1000 / hour |
| Public (unauthenticated) requests | 100 / hour |
| New comments | 10 / hour |
| Comment replies | 20 / hour |
| Likes | 200 / hour |
| Ratings | 50 / hour |

Limits are per **user** for authenticated calls, per **IP** for unauthenticated.

## How to know where you stand

Every response carries three headers:

| Header | Meaning |
|--------|---------|
| `X-RateLimit-Limit` | Total quota for the current window |
| `X-RateLimit-Remaining` | What's left |
| `X-RateLimit-Reset` | Unix timestamp when the window resets |

Watch these proactively — don't wait for a `429` to back off.

## When you hit the limit

The response is `429 Too Many Requests` with:

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Slow down, please."
  }
}
```

There's also a `Retry-After` header with the number of seconds to wait. Honour it. Don't retry sooner; you'll just delay your reset further.

## A reasonable retry policy

```javascript
async function callWithBackoff(fn, attempt = 0) {
  const res = await fn();
  if (res.status !== 429) return res;

  const retryAfter = Number(res.headers.get('Retry-After') ?? 1);
  await new Promise(r => setTimeout(r, retryAfter * 1000));

  if (attempt >= 3) throw new Error('Gave up after 3 retries');
  return callWithBackoff(fn, attempt + 1);
}
```

Two principles: respect `Retry-After`, and give up after a few tries instead of looping forever.
