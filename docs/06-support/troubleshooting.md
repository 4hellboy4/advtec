# Troubleshooting

This document describes common issues encountered when using the API, along with their causes and resolutions.

## Authentication errors

### HTTP 401 Unauthorized

**Possible causes:**

| Cause | Indicator | Resolution |
|-------|-----------|------------|
| Missing `Authorization` header | No `error.code` set; generic 401 | Add the header to the request |
| Token expired | `error.code: TOKEN_EXPIRED` | Re-authenticate; see [Authentication setup](/02-get-started/authentication-setup) |
| Malformed token | `error.code: TOKEN_INVALID` | Verify that the token was copied without truncation or extra characters |

### HTTP 403 Forbidden on update or delete

The authenticated user is not the author of the target resource. Only the original author may update or delete an idea, comment, or rating. Verify that the token belongs to the resource owner.

## Validation errors

### HTTP 400 Bad Request on resource creation

The `error.details.field` and `error.details.received` fields identify the failing field and the submitted value.

**Common causes:**

- Enumeration value misspelled (for example, `birthdays` instead of `birthday`).
- Field length below the minimum (`title` under 5 characters; `description` under 20).
- `tags` submitted as a string rather than an array.

## Search returns no results

| Cause | Resolution |
|-------|------------|
| `q` parameter shorter than 2 characters | Increase query length |
| Filter combination produces an empty set | Loosen filters; verify combinations make sense |
| Newly created idea not yet indexed | Retry after one minute |

## Slow response times

Large `limit` values combined with broad filters may produce slow responses. To improve performance:

- Reduce `limit` to a value between 20 and 50.
- Apply additional filters to narrow the result set.

Response times consistently exceeding 5 seconds for a single request indicate a server-side issue and should be reported through [Contact](/06-support/contact).

## Webhook delivery failures

| Cause | Resolution |
|-------|------------|
| Incorrect event name | Verify event name spelling; names are case-sensitive |
| Client endpoint returns non-2xx status | Inspect endpoint logs; the API retries up to four additional times |
| Event triggered on a resource not owned by the registered user | Webhooks fire only for events on the user's own resources |
| Endpoint URL changed | Re-register the webhook with the current URL |

## Unexpected rate-limit errors

When `RATE_LIMIT_EXCEEDED` is returned for an apparently low request volume, inspect the `X-RateLimit-Limit` header. Unauthenticated requests are limited to 100 per hour per IP address. Clients sharing an IP address through NAT share this quota. Authenticate to access the per-user limit of 1000 per hour.

## Related resources

- [Errors](/04-reference/errors) — complete error code catalog.
- [Rate limits](/05-advanced/rate-limits) — quotas and retry guidance.
- [Contact](/06-support/contact) — reporting unresolved issues.
