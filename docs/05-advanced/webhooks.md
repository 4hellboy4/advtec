# Webhooks

Webhooks deliver event notifications from the API to a client-controlled endpoint. They eliminate the need for clients to poll the API for state changes.

## Endpoint summary

| Method | Path | Authorization |
|--------|------|---------------|
| `POST` | `/webhooks` | Required |
| `GET` | `/webhooks` | Required |
| `DELETE` | `/webhooks/{webhook_id}` | Required |

## Register a webhook

```http
POST /webhooks
Authorization: Bearer <token>
Content-Type: application/json
```

### Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `url` | string | Yes | HTTPS endpoint that receives event deliveries |
| `events` | array of string | Yes | One or more event names from [Supported events](#supported-events) |
| `secret` | string | No | Shared secret used to sign payloads; generated automatically if omitted |

### Example request

```json
{
  "url": "https://your-app.example.com/hooks/lovinideas",
  "events": ["idea.commented", "user.followed_me"]
}
```

### Status codes

| Code | Condition |
|------|-----------|
| `201` | Webhook registered |
| `400` | Validation failure |
| `401` | Missing or invalid token |

## Supported events

| Event | Trigger |
|-------|---------|
| `idea.created` | A user's idea is published after moderation |
| `idea.commented` | A comment is posted on a user's idea |
| `idea.liked` | A user's idea is liked |
| `idea.rated` | A rating is submitted on a user's idea |
| `user.followed_me` | A user is followed by another user |

## Delivery format

Event deliveries are `POST` requests with the following JSON body:

```json
{
  "event": "idea.commented",
  "delivered_at": "2026-05-15T12:00:00Z",
  "data": {
    "idea": { "id": "idea_9876543210", "title": "Star Map for Anniversary" },
    "comment": {
      "id": "cmt_1234567890",
      "content": "Great idea.",
      "author": { "username": "stargazer" }
    }
  }
}
```

| Field | Description |
|-------|-------------|
| `event` | Event name |
| `delivered_at` | ISO 8601 timestamp of delivery attempt |
| `data` | Event-specific payload |

## Signature verification

Each delivery includes the header `X-LovInIdeas-Signature` with the format `sha256=<hex>`. The signature is an HMAC-SHA256 of the raw request body, keyed by the webhook secret.

Clients must verify the signature before processing the payload:

```javascript
import crypto from 'node:crypto';

function verify(rawBody, signatureHeader, secret) {
  const expected =
    'sha256=' + crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signatureHeader),
    Buffer.from(expected)
  );
}
```

Requests with invalid signatures must be rejected.

## Delivery retries

If the client endpoint does not return a `2xx` status code, the API retries the delivery according to the following schedule:

| Attempt | Delay after previous attempt |
|---------|------------------------------|
| 2 | 1 minute |
| 3 | 5 minutes |
| 4 | 30 minutes |
| 5 | 2 hours |

After five failed attempts, the delivery is dropped. The same event may be delivered more than once; client handlers must be idempotent.

## List and remove webhooks

```http
GET /webhooks
DELETE /webhooks/{webhook_id}
```

Both endpoints require the same token that registered the webhook.

## Related resources

- [Best practices](/05-advanced/best-practices) — recommendations for idempotency and signature handling.
- [Errors](/04-reference/errors) — complete error code catalog.
