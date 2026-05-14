# LovInIdeas API

A REST API for the LovInIdeas platform — a place where people share gift ideas for birthdays, anniversaries, weddings, and everything in between.

This documentation is organized around the path you'll actually walk as a developer: from "what is this?" through your first successful call, into building real features, with a full reference always one click away.

## Where to start

**New here?** → [What LovInIdeas is](/01-discover/overview) and then [Quick Start](/02-get-started/quick-start).

**Already integrating?** → Jump straight to [API Reference](/04-reference/authentication).

**Stuck?** → [Troubleshooting](/06-support/troubleshooting) and [FAQ](/06-support/faq) usually have it.

## The journey

| Stage | What you'll find |
|-------|------------------|
| **1. Discover** | What the API does, who it's for, the core concepts |
| **2. Get Started** | Quick start, your first request, authentication |
| **3. Build** | Task-oriented guides — how to ship real features |
| **4. Reference** | Every endpoint, every field, every error code |
| **5. Advanced** | Rate limits, pagination, webhooks, best practices |
| **6. Support** | Troubleshooting, FAQ, changelog, contact |

## At a glance

- **Base URL:** `https://api.lovinideas.com/v1`
- **Auth:** JWT bearer tokens, 24-hour expiry
- **Rate limits:** 1000 req/hour authenticated, 100 req/hour public
- **Response format:** JSON, consistent `{ success, data, error, timestamp }` envelope
