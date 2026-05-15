# Overview

LovInIdeas is a community-driven gift recommendation platform. Users publish, browse, and discuss gift ideas grouped by occasion, recipient type, category, and price range.

The API exposes the full set of platform capabilities. Any operation available through the web interface is available through the API.

## Capabilities

The API supports the following operations:

- User registration, authentication, and profile management.
- Creating, listing, searching, updating, and deleting gift ideas.
- Posting and retrieving comments and replies on ideas.
- Liking ideas and submitting numeric ratings.
- Following other users and managing follower relationships.
- Receiving event notifications through webhooks.

## Intended audience

This documentation is intended for developers integrating the LovInIdeas API into their own applications. It assumes familiarity with:

- REST APIs and HTTP request/response semantics.
- JSON Web Tokens (JWT) for authentication.
- A command-line HTTP client such as `curl`, or an equivalent library in the developer's language of choice.

## Example applications

The API supports a range of integration scenarios, including:

- Chatbots that recommend gifts based on occasion and budget.
- Browser extensions that surface relevant ideas during online shopping.
- Internal corporate tools for managing employee gifts.
- Mobile applications that provide alternative clients to the LovInIdeas web interface.

For additional scenarios, see [Use cases](/01-discover/use-cases).

## Related resources

- [Use cases](/01-discover/use-cases) — detailed integration scenarios.
- [Core concepts](/01-discover/concepts) — domain model and terminology.
- [Quick start](/02-get-started/quick-start) — first API request in five minutes.
