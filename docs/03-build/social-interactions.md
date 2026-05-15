# Social interactions

This guide describes how to use the social features of the API: comments, likes, and ratings.

## Comments

### Post a comment

```bash
curl -X POST "https://api.lovinideas.com/v1/ideas/idea_9876543210/comments" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Used this idea last year. The recipient appreciated it."
  }'
```

To reply to an existing comment, include `parent_id`:

```json
{
  "content": "Which retailer did you use?",
  "parent_id": "cmt_1234567890"
}
```

Comment threads support a single level of nesting. Replies cannot themselves be replied to.

### List comments

```bash
curl "https://api.lovinideas.com/v1/ideas/idea_9876543210/comments?sort=popular&limit=20"
```

The response includes nested `replies` arrays within each top-level comment. A separate request for replies is not required.

## Likes

The like endpoint toggles state. A repeated call by the same user removes the like.

```bash
curl -X POST "https://api.lovinideas.com/v1/ideas/idea_9876543210/like" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Response

```json
{
  "success": true,
  "data": {
    "liked": true,
    "like_count": 46
  }
}
```

Likes can also be applied to comments through `POST /comments/{comment_id}/like`, which exhibits identical toggle behavior.

## Ratings

Submit a numeric rating with an optional written review:

```bash
curl -X POST "https://api.lovinideas.com/v1/ideas/idea_9876543210/rating" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "score": 5,
    "review": "Used this idea for an anniversary gift. The recipient was very satisfied."
  }'
```

Each user may submit one rating per idea. A subsequent rating from the same user updates the existing record.

## Rate limits

| Action | Limit per user per hour |
|--------|--------------------------|
| Top-level comments | 10 |
| Replies | 20 |
| Likes | 200 |
| Ratings | 50 |

Exceeding a limit returns `429 Too Many Requests` with a `Retry-After` header. See [Rate limits](/05-advanced/rate-limits).

## Related resources

- [Comments](/04-reference/comments) — complete endpoint reference.
- [Ratings](/04-reference/ratings) — complete endpoint reference.
- [Best practices](/05-advanced/best-practices) — recommended retry and rate-limit handling.
