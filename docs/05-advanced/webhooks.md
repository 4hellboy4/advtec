# Webhooks

If you want to *react* to things happening in LovInIdeas — a new comment on your idea, someone following you — webhooks let the API call your server instead of you polling ours.

## Register a webhook

```http
POST /webhooks
Authorization: Bearer <token>
```

### Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `url` | string | Yes | Your HTTPS endpoint |
| `events` | array | Yes | At least one event from the list below |
| `secret` | string | No | We'll sign payloads with this; if you skip it, we generate one |

### Example

```json
{
  "url": "https://your-app.example.com/hooks/lovinideas",
  "events": ["idea.commented", "user.followed_me"]
}
```

## Available events

| Event | Fires when |
|-------|------------|
| `idea.created` | One of *your* ideas is published (after moderation) |
| `idea.commented` | Someone comments on your idea |
| `idea.liked` | Someone likes your idea |
| `idea.rated` | Someone rates your idea |
| `user.followed_me` | Someone follows you |

## Payload shape

Every webhook delivery is a `POST` with a JSON body:

```json
{
  "event": "idea.commented",
  "delivered_at": "2026-05-15T12:00:00Z",
  "data": {
    "idea": { "id": "idea_9876543210", "title": "Star Map for Anniversary" },
    "comment": {
      "id": "cmt_1234567890",
      "content": "Great idea!",
      "author": { "username": "stargazer" }
    }
  }
}
```

## Verifying the signature

Each delivery includes `X-LovInIdeas-Signature: sha256=<hex>` — HMAC-SHA256 of the raw body using your `secret`.

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

Reject any request where the signature doesn't match — it isn't from us.

## Retries

If your endpoint responds with anything outside `2xx`, we retry: after 1 minute, 5 minutes, 30 minutes, 2 hours, then give up. Keep your handler idempotent — duplicates can happen.

## Listing and removing webhooks

```http
GET /webhooks
DELETE /webhooks/{webhook_id}
```

Both require the same token that registered them.
