# Contributing to the documentation

This guide describes the procedure for adding or modifying a page in the LovInIdeas API documentation. It covers local setup, content placement, sidebar configuration, validation, and submission.

## Audience

This document is intended for:

- New team members who add documentation for endpoints they implement.
- Contributors to future modules of the platform, including the planned marketplace.
- Maintainers who revisit the repository after periods of inactivity.

Familiarity with Git, the command line, and Markdown is assumed. No knowledge of Vue or VitePress internals is required.

## Prerequisites

Before starting, verify that the following are installed:

| Requirement | Verification command |
|-------------|----------------------|
| Node.js 18 or later | `node --version` |
| npm | `npm --version` |
| Git | `git --version` |

Write access to the repository is required for direct commits. Otherwise, fork the repository and submit changes through a pull request.

## Repository structure

The documentation source resides in the `docs/` directory. Content is organized according to the Customer Journey Map, with each stage represented by a numbered folder:

```
docs/
├── index.md              Landing page
├── 01-discover/          Awareness: overview, use cases, concepts
├── 02-get-started/       Onboarding: quick start, authentication
├── 03-build/             Integration guides (task-oriented)
├── 04-reference/         Endpoint reference (lookup-oriented)
├── 05-advanced/          Rate limits, pagination, webhooks
├── 06-support/           Troubleshooting, FAQ, changelog
├── contributing.md       This document
└── .vitepress/config.js  Site configuration and sidebar
```

The numeric prefixes define the recommended reading order and must not be modified without a corresponding update to the site configuration.

## Procedure

### Step 1. Set up the local environment

Clone the repository and install dependencies:

```bash
git clone https://github.com/4hellboy4/advtec.git
cd advtec
npm install
```

Start the development server:

```bash
npm run docs:dev
```

The console displays the local URL, typically `http://localhost:5173/advtec/`. The server watches the `docs/` directory and reloads the browser automatically on file changes.

### Step 2. Determine the page location

Identify the journey stage the page belongs to using the following criteria:

| Page purpose | Target folder |
|--------------|---------------|
| Defines a concept, describes a use case | `01-discover/` |
| Walks the reader through initial setup | `02-get-started/` |
| Explains how to implement a feature | `03-build/` |
| Documents endpoints, fields, parameters, error codes | `04-reference/` |
| Covers rate limits, pagination, webhooks, conventions | `05-advanced/` |
| Provides troubleshooting, FAQ, release notes | `06-support/` |

When a topic spans multiple stages, split it: place the narrative explanation in `03-build/` and the field-level details in `04-reference/`. Link the two pages bidirectionally.

### Step 3. Create the page file

Page file names use lowercase letters and hyphens as word separators:

```
03-build/manage-favorites.md    Correct
03-build/manageFavorites.md     Incorrect
03-build/manage_favorites.md    Incorrect
```

The file name becomes part of the URL path. Use short, descriptive names that reflect the page topic.

Each page must begin with a level-one heading followed by a one- to two-sentence introduction describing the page's purpose. Refer to `03-build/manage-ideas.md` as a structural reference.

### Step 4. Register the page in the sidebar

VitePress does not automatically discover new pages. Open `docs/.vitepress/config.js` and add an entry to the corresponding sidebar section:

```javascript
{
  text: '3. Build',
  collapsed: false,
  items: [
    { text: 'Manage ideas', link: '/03-build/manage-ideas' },
    { text: 'Search and discover', link: '/03-build/search-and-discover' },
    { text: 'Social interactions', link: '/03-build/social-interactions' },
    { text: 'Manage favorites', link: '/03-build/manage-favorites' }
  ]
}
```

Notes:

- The `link` value omits the `.md` extension.
- Within a section, list pages in the order most relevant to a sequential reader. Reference pages are ordered alphabetically; tutorial-style pages follow narrative order.

### Step 5. Write the content

Follow these conventions to maintain stylistic consistency across the documentation:

- Use the second person ("you") to address the reader.
- Write in the present tense and active voice.
- State the page's outcome in the first sentence.
- Provide concrete code examples; avoid placeholder values when realistic ones are available.
- Use tables for structured data such as field definitions, parameter lists, and error codes.
- Conclude each page with a "What's next" section that links to the next logical document.

Code samples must be executable. Verify that `curl` commands and code snippets run successfully before committing.

### Step 6. Verify the build

The development server reports most errors, but a full production build must succeed before submission:

```bash
npm run docs:build
```

A successful build outputs:

```
build complete in <duration>.
```

If the build fails, the console identifies the affected file and the broken reference. Correct the issue and rebuild.

### Step 7. Submit the pull request

Create a feature branch, commit the changes, and push:

```bash
git checkout -b docs/manage-favorites
git add docs/03-build/manage-favorites.md docs/.vitepress/config.js
git commit -m "Add manage favorites guide"
git push -u origin docs/manage-favorites
```

Open a pull request on GitHub. The description must include:

1. A summary of the change (one sentence).
2. The rationale: gap being filled, ambiguity being resolved, or feature being documented.
3. Screenshots of the rendered page.

Documentation-only pull requests require one reviewer approval.

## Deployment

GitHub Actions builds and publishes the site on every push to `main`. The published site is available at the production URL within approximately two minutes of merge.

The site is served from the `/advtec/` path, as configured by the `base` option in `docs/.vitepress/config.js`. Use absolute paths beginning with `/` for internal links; relative paths may resolve incorrectly in production.

## Troubleshooting

**Build fails with "dead link" error.** A link references a page that does not exist. Verify the target file path and confirm that the `link` value in `config.js` matches the file location.

**New page does not appear in the sidebar.** The page was not registered in `docs/.vitepress/config.js`. See Step 4.

**Page renders locally but returns 404 in production.** A relative link was used. Replace with an absolute path beginning with `/`.

**Outdated page must be removed.** Delete the file, remove its entry from `config.js`, and search the repository for remaining references:

```bash
grep -r "page-name" docs/
```

## Related resources

- [Repository README](https://github.com/4hellboy4/advtec) — rationale for the documentation structure.
- [VitePress documentation](https://vitepress.dev/) — configuration reference.
