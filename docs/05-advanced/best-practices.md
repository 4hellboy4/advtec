# Best practices

This document collects recommendations for building reliable production clients against the LovInIdeas API. Each recommendation is independent; apply them as appropriate to the integration.

## Token handling

Authentication tokens grant full access to the associated user account. Treat them as credentials:

- Do not log tokens, embed them in source control, or expose them in client-side code.
- Store tokens in secrets managers, environment variables, or platform-provided secure storage (iOS Keychain, Android Keystore).
- Rotate tokens by repeating the login procedure if a leak is suspected.

## Response envelope handling

All API responses share a consistent envelope. Centralize response parsing to enforce checks at a single layer:

```javascript
async function callApi(endpoint, options) {
  const response = await fetch(endpoint, options);
  const body = await response.json();
  if (!body.success) {
    throw new ApiError(body.error.code, body.error.message);
  }
  return body.data;
}
```

Always evaluate the `success` field before accessing `data`. Code that reads `response.data.ideas` directly will fail when the API returns an error response.

## Server-side filtering

Apply filters at the API level rather than fetching data and filtering on the client. Filtering 5000 items locally to retrieve 200 wastes bandwidth and quota. Use the documented query parameters for the relevant endpoint.

## Proactive rate-limit handling

Monitor the `X-RateLimit-Remaining` header and reduce request rate when the remaining quota approaches the limit. Waiting for `429` responses to throttle activity results in user-visible errors.

For implementation details, see [Rate limits](/05-advanced/rate-limits).

## Retry strategy

- Retry only on `429 Too Many Requests` and transient `5xx` errors.
- Use exponential backoff with jitter.
- Limit the number of retries (typically three).
- Always respect the `Retry-After` header when present.
- Do not retry `4xx` errors other than `429`.

## API versioning

Always include the version segment (`/v1`) in the base URL. Future versions will be published under new segments (`/v2`, and so on). Omitting the version may result in unintended migration when defaults change.

## Webhook idempotency

The same webhook event may be delivered more than once. Identify deliveries using a combination of the `event` name, `delivered_at` timestamp, and the relevant object identifier in `data`. Maintain a deduplication store to ignore repeated deliveries.

For delivery semantics, see [Webhooks](/05-advanced/webhooks).

## Caching

Cache static reference data (idea details for popular ideas, public profile information) for short periods to reduce request volume. Do not cache user-specific data such as settings or notification preferences, which must reflect the authoritative state at all times.

## Related resources

- [Rate limits](/05-advanced/rate-limits) — quotas and retry guidance.
- [Pagination](/05-advanced/pagination) — efficient traversal patterns.
- [Webhooks](/05-advanced/webhooks) — event-driven integration.
