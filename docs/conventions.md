# Documentation conventions

This document specifies the style and structural conventions used throughout the LovInIdeas API documentation. It is required reading before contributing changes.

## Audience

This document is intended for:

- Documentation contributors adding or modifying pages.
- Reviewers evaluating documentation pull requests.
- Maintainers ensuring stylistic consistency across releases.

## Tone

The documentation uses two registers, applied according to the section:

| Section | Register | Rationale |
|---------|----------|-----------|
| `01-discover/` | Neutral, descriptive | Onboarding context; readers form initial impressions |
| `02-get-started/` | Neutral, procedural | Step-by-step guidance |
| `03-build/` | Neutral, procedural | Task-oriented walkthroughs |
| `04-reference/` | Formal, specification-style | Authoritative source for endpoint behavior |
| `05-advanced/` | Formal, specification-style | Detailed technical specifications |
| `06-support/` | Neutral, declarative | Practical reference for users in difficulty |

In all registers, avoid:

- Rhetorical questions in headings.
- Personal anecdotes, opinions, or emotional language.
- Literary devices such as extended metaphors.
- Filler phrases and discourse markers ("of course", "actually", "basically").
- Contractions in reference and advanced sections.

## Page structure

### Required elements

Every page must include:

1. **Title** — single level-one heading matching the sidebar label.
2. **Introduction** — one or two sentences describing the purpose of the page.
3. **Related resources** — closing section linking to relevant pages.

### Reference page structure

Reference pages (`04-reference/`) follow this structure:

1. Title
2. Introduction
3. Endpoint summary (table: method, path, authorization)
4. One section per endpoint, each containing:
   - HTTP method and path
   - Request body or query parameters (table)
   - Example request
   - Response
   - Status codes (table)
5. Error codes (consolidated table)
6. Related resources

### Procedural page structure

Procedural pages (`02-get-started/`, `03-build/`) follow this structure:

1. Title
2. Introduction
3. Prerequisites (where applicable)
4. Procedure (numbered steps)
5. Related resources

## Headings

- Use sentence case (`## Rate limit values`, not `## Rate Limit Values`).
- Use noun phrases or verb phrases. Avoid full sentences and questions.
- Match heading levels to logical hierarchy. Do not skip levels.

## Code examples

- All code examples must be runnable as written, after substituting documented placeholders.
- Use realistic field values, not synthetic placeholders such as `string1`, `value2`, `foo`.
- Prefer `curl` for HTTP examples; provide language-specific examples (typically JavaScript) where helpful.
- Include `Content-Type` and `Authorization` headers when required.

## Tables

Use tables for:

- Field definitions (field name, type, required, description).
- Enumeration values.
- Status code summaries.
- Comparison of options.

Do not use tables for narrative content.

## Formatting

| Element | Convention |
|---------|------------|
| Endpoint paths | Inline code: `/ideas/{idea_id}` |
| HTTP methods | Inline code, uppercase: `GET`, `POST` |
| Field names | Inline code: `recipient_type` |
| HTTP status codes | Inline code: `201 Created` |
| File paths | Inline code: `docs/.vitepress/config.js` |
| External resources | Markdown link with descriptive text |

## Cross-references

- Internal links use absolute paths beginning with `/`, omitting the `.md` extension.
- Each page closes with a "Related resources" section.
- Link text describes the target page, not the action (`See [Authentication setup](/02-get-started/authentication-setup)`, not `Click [here](/02-get-started/authentication-setup)`).

## Terminology

| Preferred term | Avoid |
|----------------|-------|
| Authentication token | Auth key, JWT (in narrative text) |
| Endpoint | Route, URL (when referring to API operations) |
| Request body | Payload, body data |
| Response | Reply, return value |
| User | Customer, end-user |

## File naming

| Convention | Example |
|------------|---------|
| Lowercase letters | `manage-ideas.md` |
| Hyphen separators | `manage-ideas.md` |
| No underscores or camelCase | Not `manage_ideas.md` or `manageIdeas.md` |
| Descriptive of content | Not `page1.md` or `new-doc.md` |

## Versioning and timestamps

- ISO 8601 dates: `2026-05-15` (not `15/05/2026` or `May 15, 2026`).
- Semantic version numbers: `1.2.0` (not `v1.2` or `1.2`).
- Time durations in seconds for technical specifications: `86400 seconds (24 hours)`.

## Related resources

- [Contributing to the documentation](/contributing) — procedure for submitting documentation changes.
