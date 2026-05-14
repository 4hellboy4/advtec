# Manage ideas

Task-oriented walkthrough of the idea lifecycle: create, read, update, delete. For the full field-by-field reference, see [ideas reference](/04-reference/ideas).

## Create a new idea

The minimum viable idea needs a title, description, category, occasion, price range, and recipient type. Tags are optional but help discovery a lot.

```bash
curl -X POST "https://api.lovinideas.com/v1/ideas" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Personalized Star Map for Anniversary",
    "description": "Custom star map showing the stars on your special day. High-quality print, ready to frame.",
    "category": "handmade",
    "occasion": "anniversary",
    "price_range": "25_50",
    "recipient_type": "partner",
    "tags": ["romantic", "personalized", "astronomy"]
  }'
```

**Tips that save support tickets:**

- Title must be 5–200 characters. "Speaker" is too short; pick something descriptive.
- Description is 20–2000 characters. Two or three sentences works well.
- `category`, `occasion`, `price_range`, `recipient_type` are enums — only the documented values are accepted. See [ideas reference](/04-reference/ideas) for the full lists.
- Up to 10 tags. Lowercase, no spaces.

## Read a single idea

```bash
curl "https://api.lovinideas.com/v1/ideas/idea_9876543210"
```

You'll get the idea object plus a preview of comments and aggregate stats. To paginate through *all* comments, hit `/ideas/{id}/comments` separately.

## Update an idea

Only the author can edit. Send just the fields you want to change:

```bash
curl -X PUT "https://api.lovinideas.com/v1/ideas/idea_9876543210" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Personalized Star Map — updated for 2026"
  }'
```

If someone else's token is in the header, you'll get `403 UNAUTHORIZED_UPDATE`.

## Delete an idea

```bash
curl -X DELETE "https://api.lovinideas.com/v1/ideas/idea_9876543210" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Deletion is soft for 30 days — the idea disappears from search and listings, but you can restore it through user settings during that window. After 30 days it's gone for good.

## Common pitfalls

| Symptom | Likely cause |
|---------|--------------|
| `VALIDATION_ERROR` on create | Title too short, or an enum value mistyped (`birthdays` vs `birthday`) |
| `DUPLICATE_TITLE` | You already have an idea with that exact title — titles are unique per user |
| `UNAUTHORIZED_UPDATE` | The token doesn't belong to the idea's author |
| Empty `tags` array returned | You sent an empty array — totally fine, but worth knowing |

## What's next

- [Search and discover](/03-build/search-and-discover) — make your ideas findable.
- [Social interactions](/03-build/social-interactions) — comments, likes, ratings.
