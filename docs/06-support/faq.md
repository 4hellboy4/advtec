# Frequently asked questions

## Is the API free to use?

The API is free for personal projects and applications below 10,000 requests per day. Higher request volumes require a commercial plan. See [Contact](/06-support/contact) for inquiries.

## Is authentication required for all endpoints?

No. Read-only endpoints for public ideas can be accessed without authentication. All endpoints that create, modify, or interact with user-specific data require an authentication token. See [Authentication setup](/02-get-started/authentication-setup).

## Are official SDKs available?

No official SDKs are currently provided. The API can be used directly with any HTTP client. A JavaScript example is included in [Quick start](/02-get-started/quick-start).

## How long are tokens valid?

Tokens are valid for 86400 seconds (24 hours). The API does not provide a refresh endpoint; to obtain a new token, repeat the login procedure.

## What is the data retention policy?

| Resource | Retention period |
|----------|------------------|
| Deleted ideas | 30 days (soft delete), then permanently removed |
| Deleted accounts | 14 days (soft delete), then permanently removed with all associated data |
| Webhook delivery logs | 7 days |

## Is bulk import supported?

The API does not provide a dedicated bulk-import endpoint. For volumes up to a few hundred ideas, sequential creation with respectful pacing is sufficient. For larger volumes, contact the API team to request a temporary increased rate limit. See [Contact](/06-support/contact).

## How are security issues reported?

Security vulnerabilities must be reported to `security@lovinideas.com` rather than through public issue trackers. The team responds within 48 hours.

## What CORS policy applies?

| Endpoint type | Allowed origins |
|---------------|------------------|
| Public read endpoints | `*` |
| Authenticated endpoints | Server-side use only; tokens must not be exposed to browser clients |

For browser-based applications that require authenticated operations, route requests through a server-side proxy. See [Best practices](/05-advanced/best-practices).

## Related resources

- [Troubleshooting](/06-support/troubleshooting) — common issues and resolutions.
- [Contact](/06-support/contact) — support channels.
