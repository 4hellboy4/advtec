# LovInIdeas API documentation

REST API documentation for the LovInIdeas gift recommendation platform.

This documentation is organized according to the Customer Journey Map. Each section represents a stage in the developer's progression from initial discovery to production integration.

## Where to start

| If you are... | Start here |
|---------------|------------|
| New to the API | [Overview](/01-discover/overview), then [Quick start](/02-get-started/quick-start) |
| Integrating an existing application | [API reference](/04-reference/authentication) |
| Investigating an issue | [Troubleshooting](/06-support/troubleshooting), [FAQ](/06-support/faq) |
| Contributing to the documentation | [Contributing guide](/contributing) |

## Documentation structure

| Section | Purpose |
|---------|---------|
| **1. Discover** | Platform overview, use cases, terminology |
| **2. Get started** | Quick start, authentication, first request |
| **3. Build** | Task-oriented guides for implementing features |
| **4. Reference** | Endpoint-by-endpoint specifications |
| **5. Advanced** | Rate limits, pagination, webhooks, best practices |
| **6. Support** | Troubleshooting, FAQ, changelog, contact |

## API summary

| Property | Value |
|----------|-------|
| Base URL | `https://api.lovinideas.com/v1` |
| Authentication | JWT bearer token, 24-hour validity |
| Request format | JSON |
| Response format | JSON, with consistent `{ success, data, error, timestamp }` envelope |
| Authenticated rate limit | 1000 requests / hour / user |
| Public rate limit | 100 requests / hour / IP address |

## Documentation conventions

This documentation follows the conventions listed below. For the complete style specification, see [Conventions](/conventions).

- Code blocks are runnable. Substitute `YOUR_TOKEN` with a valid authentication token in `curl` examples.
- Tables document fields, parameters, enumerations, and error codes. Inline prose covers narrative explanations.
- Internal links use absolute paths beginning with `/`.
- HTTP status codes accompany every endpoint specification.

## Related resources

- [Contributing](/contributing) — how to add or modify documentation.
- [Conventions](/conventions) — documentation style and structure standards.
