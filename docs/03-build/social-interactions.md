# Social interactions

The features that turn a list of ideas into a community: comments, likes, and ratings.

## Comments

### Add a comment

```bash
curl -X POST "https://api.lovinideas.com/v1/ideas/idea_9876543210/comments" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Great idea — I gave a similar gift last year and it landed perfectly."
  }'
```

To reply to an existing comment, include `parent_id`:

```json
{
  "content": "Where did you order yours from?",
  "parent_id": "cmt_1234567890"
}
```

Threads are one level deep — you can reply to a top-level comment, but you can't reply to a reply.

### Read comments

```bash
curl "https://api.lovinideas.com/v1/ideas/idea_9876543210/comments?sort=popular&limit=20"
```

The response includes nested `replies` arrays inside each top-level comment, so you don't need a second round trip to see the thread.

## Likes

Liking is a single endpoint that toggles:

```bash
curl -X POST "https://api.lovinideas.com/v1/ideas/idea_9876543210/like" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

The response tells you the new state:

```json
{
  "success": true,
  "data": {
    "liked": true,
    "like_count": 46
  }
}
```

Call it again to unlike. You can also like individual comments via `/comments/{comment_id}/like` — same toggle behaviour.

## Ratings

Ratings are 1–5 with an optional written review:

```bash
curl -X POST "https://api.lovinideas.com/v1/ideas/idea_9876543210/rating" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "score": 5,
    "review": "Gave this for our 10th anniversary. She cried."
  }'
```

One rating per user per idea — sending again updates your previous rating rather than creating a new one.

## Rate limits to keep in mind

| Action | Limit |
|--------|-------|
| New top-level comments | 10 per hour, per user |
| Replies | 20 per hour, per user |
| Likes | 200 per hour, per user |
| Ratings | 50 per hour, per user |

If you hit a limit you'll get `429 RATE_LIMIT_EXCEEDED` with a `Retry-After` header.

## What's next

- [Comments reference](/04-reference/comments) — every field, every error.
- [Best practices](/05-advanced/best-practices) — how to design retry and rate-limit handling.
