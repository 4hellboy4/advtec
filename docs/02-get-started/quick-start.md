# Quick start

This guide demonstrates the basic API workflow: registering an account, obtaining an authentication token, creating an idea, and searching for it.

## Prerequisites

| Requirement | Verification |
|-------------|--------------|
| `curl` or an equivalent HTTP client | `curl --version` |
| Network access to `https://api.lovinideas.com` | — |

## Procedure

### Step 1. Register an account

```bash
curl -X POST https://api.lovinideas.com/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!",
    "username": "developer",
    "full_name": "Developer Name"
  }'
```

The response contains an authentication token in the `token` field.

### Step 2. Obtain a token

If the token from registration is no longer available, request a new one:

```bash
curl -X POST https://api.lovinideas.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!"
  }'
```

Store the returned `token` value for use in subsequent requests.

### Step 3. Create an idea

```bash
curl -X POST https://api.lovinideas.com/v1/ideas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Bluetooth Speaker",
    "description": "Compact speaker with high sound quality, suitable for desk use.",
    "category": "electronics",
    "occasion": "birthday",
    "price_range": "50_100",
    "recipient_type": "colleague",
    "tags": ["tech", "audio"]
  }'
```

### Step 4. Search

```bash
curl "https://api.lovinideas.com/v1/ideas/search?q=bluetooth&price_range=50_100"
```

The created idea should appear in the search results.

## JavaScript client example

The same workflow can be expressed as a minimal JavaScript client:

```javascript
class LovInIdeasAPI {
  constructor(token) {
    this.baseURL = 'https://api.lovinideas.com/v1';
    this.token = token;
  }

  async request(endpoint, options = {}) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
      ...options
    });
    return response.json();
  }

  getIdeas(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/ideas?${params}`);
  }

  createIdea(data) {
    return this.request('/ideas', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}

const api = new LovInIdeasAPI('your_token');
const ideas = await api.getIdeas({ category: 'electronics' });
```

## Related resources

- [Your first request](/02-get-started/first-request) — detailed walkthrough of a single request and response.
- [Authentication setup](/02-get-started/authentication-setup) — token lifecycle.
- [Manage ideas](/03-build/manage-ideas) — task-oriented guide for the idea lifecycle.
