# Rate limits

The API enforces per-user and per-IP rate limits to ensure fair usage and protect service availability. This document specifies the limits, the response format when a limit is exceeded, and a recommended retry strategy.

## Rate limit values

| Action | Limit | Scope |
|--------|-------|-------|
| Authenticated requests, overall | 1000 / hour | Per user |
| Public (unauthenticated) requests | 100 / hour | Per IP address |
| Top-level comments | 10 / hour | Per user |
| Comment replies | 20 / hour | Per user |
| Likes (ideas and comments) | 200 / hour | Per user |
| Ratings | 50 / hour | Per user |

## Quota headers

Every API response includes the following headers:

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Total quota allocated for the current window |
| `X-RateLimit-Remaining` | Requests remaining in the current window |
| `X-RateLimit-Reset` | Unix timestamp at which the quota resets |

Clients should monitor these headers and adjust their request rate proactively, rather than relying on `429` responses for flow control.

## Exceeded-limit response

When a rate limit is exceeded, the API returns:

- HTTP status: `429 Too Many Requests`
- `Retry-After` header: number of seconds to wait before retrying

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded for this action."
  },
  "timestamp": "2026-05-15T12:00:00Z"
}
```

Clients must wait at least the duration specified in `Retry-After` before retrying. Earlier retries may delay the quota reset.

## Recommended retry implementation

The following implementation respects `Retry-After` and limits the number of retries:

```javascript
async function callWithBackoff(fn, maxAttempts = 3) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const response = await fn();
    if (response.status !== 429) {
      return response;
    }
    const retryAfter = Number(response.headers.get('Retry-After') ?? 1);
    await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
  }
  throw new Error('Maximum retry attempts exceeded');
}
```

The following principles apply to any retry implementation:

- Always respect the `Retry-After` value.
- Limit the number of retries to prevent infinite loops.
- Do not retry HTTP `4xx` responses other than `429`.

## Related resources

- [Best practices](/05-advanced/best-practices) — broader recommendations for production clients.
- [Errors](/04-reference/errors) — complete error code catalog.
