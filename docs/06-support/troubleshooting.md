# Troubleshooting

If something isn't working, scan this page before opening a ticket. Most issues are one of these.

## "Why am I getting 401?"

Three usual suspects:

1. **No `Authorization` header.** The endpoint requires auth and you didn't send a token.
2. **Token expired.** Tokens last 24 hours. Log in again — see [authentication setup](/02-get-started/authentication-setup).
3. **Token malformed.** Often a copy-paste issue — missing a trailing character, or you included literal quotes around the value.

Look at the `error.code` to tell them apart: `TOKEN_EXPIRED` vs `TOKEN_INVALID` vs simply no error code (no header sent).

## "Why am I getting 403 on update?"

You're authenticated, but you don't own the thing you're trying to modify. Only the author can update or delete an idea, comment, or rating.

## "Why am I getting 400 on create?"

Almost always validation. Check the response — `error.details.field` tells you which field failed and why.

Top three sources:
- Enum typo — `birthdays` instead of `birthday`.
- Title too short (under 5 chars) or description too short (under 20 chars).
- `tags` is not an array (sending a comma-separated string instead).

## "Why is my search returning nothing?"

- `q` must be at least 2 characters.
- Filters are AND-ed — `category=electronics&occasion=wedding&price_range=under_25` may legitimately have zero matches.
- New ideas can take a minute to be indexed. Wait and retry.

## "Why is my request randomly slow?"

Big `limit` values (close to 100) on heavily filtered queries can be slow. Try reducing `limit` to 20–50, or narrowing your filters.

If a single request consistently takes more than 5 seconds, something is genuinely wrong on our side — [contact us](/06-support/contact).

## "My webhook isn't firing"

In order of likelihood:

1. The event name is wrong. They're case-sensitive — `idea.commented`, not `Idea.Commented`.
2. Your endpoint returned a non-2xx response. Check your logs; we retry up to 5 times then give up.
3. The action happened on someone *else's* idea. Webhooks fire for objects you own.
4. Your URL changed. Re-register the webhook with the new URL.

## "I get `RATE_LIMIT_EXCEEDED` even though I'm not making many requests"

Check `X-RateLimit-Limit` — for unauthenticated requests it's 100/hour *per IP*. If you're behind a shared NAT, you're sharing that bucket. Authenticate to get the 1000/hour per-user limit.

## Still stuck?

Open an issue or email us — [contact](/06-support/contact). Include the full `error` object and the request you sent (with the token redacted, please).
