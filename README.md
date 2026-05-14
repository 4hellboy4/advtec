# LovInIdeas API Documentation

Documentation for the LovInIdeas gift ideas API — a platform where people share recommendations for birthdays, anniversaries, weddings, and everything in between.

Built with [VitePress](https://vitepress.dev/), hosted on GitHub Pages.

## Live site

- [Documentation](https://your-username.github.io/advtec/) — the rendered site.
- [Quick Start](https://your-username.github.io/advtec/02-get-started/quick-start) — first call in five minutes.

## Why this structure

The documentation is organized around a **Customer Journey Map (CJM)** — the path a developer actually walks when they meet a new API, rather than a flat list of endpoints.

That journey has six recognisable stages, and each one is a top-level folder:

| Folder | Stage | What lives here |
|--------|-------|-----------------|
| `01-discover/` | Awareness | Overview, use cases, core concepts |
| `02-get-started/` | Onboarding | Quick start, authentication, first request |
| `03-build/` | Integration | Task-oriented guides for shipping features |
| `04-reference/` | Reference | Endpoint-by-endpoint reference, error catalog |
| `05-advanced/` | Mastery | Rate limits, pagination, webhooks, best practices |
| `06-support/` | Retention | Troubleshooting, FAQ, changelog, contact |

### Why CJM beats the "group by resource" default

Most API docs default to a flat resource grouping: `auth/`, `ideas/`, `comments/`. That works fine as a *reference*, but it answers the wrong question for newcomers — they need to know *how to start*, not *which endpoint hits the comments table*.

The CJM layout solves three problems at once:

1. **A clear entry point for new developers.** They start at `01-discover/` and read top-down. They don't have to guess whether "authentication" is where to start or where to look up an error code later.
2. **Different jobs, different sections.** `03-build/` is task-oriented ("how do I let users like an idea?"). `04-reference/` is lookup-oriented ("what fields does `POST /ideas` accept?"). Mixing the two confuses both audiences.
3. **Numbered prefixes encode the recommended reading order** in the filesystem itself — useful both for the sidebar and for anyone browsing the repo directly on GitHub.

### Tradeoffs we accepted

- **A topic can appear in two places.** Authentication is in `02-get-started/authentication-setup.md` (the walkthrough) *and* `04-reference/authentication.md` (the field-by-field). Cross-links keep them connected, and each one is shorter than a single all-purpose page.
- **Slightly more nesting.** Six top-level folders instead of three. The benefit — clear separation between journey stages — is worth the extra click.

## Directory layout

```
docs/
├── index.md                       Landing — value prop, journey entry points
├── 01-discover/                   Stage 1: Awareness
│   ├── overview.md
│   ├── use-cases.md
│   └── concepts.md
├── 02-get-started/                Stage 2: Onboarding
│   ├── quick-start.md
│   ├── authentication-setup.md
│   └── first-request.md
├── 03-build/                      Stage 3: Integration (task-oriented)
│   ├── manage-ideas.md
│   ├── search-and-discover.md
│   └── social-interactions.md
├── 04-reference/                  Stage 4: Reference (resource-grouped)
│   ├── authentication.md
│   ├── ideas.md
│   ├── comments.md
│   ├── ratings.md
│   ├── users.md
│   └── errors.md
├── 05-advanced/                   Stage 5: Mastery
│   ├── rate-limits.md
│   ├── pagination.md
│   ├── webhooks.md
│   └── best-practices.md
└── 06-support/                    Stage 6: Retention
    ├── troubleshooting.md
    ├── faq.md
    ├── changelog.md
    └── contact.md
```

## Local development

**Prerequisites:** Node.js 18+, npm

```bash
git clone https://github.com/your-username/lovinideas-api-docs.git
cd lovinideas-api-docs
npm install
npm run docs:dev
```

The dev server hot-reloads on every save.

**Build:**

```bash
npm run docs:build
```

Output lands in `docs/.vitepress/dist/` — that's what GitHub Pages serves.

## Built with

- [VitePress](https://vitepress.dev/) — static site generator
- [Vue 3](https://vuejs.org/) — frontend framework
- [GitHub Actions](https://github.com/features/actions) — CI/CD
- [GitHub Pages](https://pages.github.com/) — hosting

## Contributing

1. Fork the repo.
2. Create a feature branch: `git checkout -b feature/improve-docs`.
3. Make changes and verify locally: `npm run docs:dev`.
4. Commit, push, open a PR.

**Style:** plain language, real examples, working code. Match the tone of existing pages — direct and concrete, not corporate.

## License

MIT
