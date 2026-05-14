# Quick Start

Five minutes from zero to a working API call. We'll register an account, log in, post an idea, and search for it.

## 1. Register an account

```bash
curl -X POST https://api.lovinideas.com/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "you@example.com",
    "password": "SecurePass123!",
    "username": "developer",
    "full_name": "Your Name"
  }'
```

The response includes a `token` — you can either save it now, or log in again later to get a fresh one.

## 2. Log in for a token

```bash
curl -X POST https://api.lovinideas.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "you@example.com",
    "password": "SecurePass123!"
  }'
```

Copy the `token` from the response — you'll send it with every authenticated request.

## 3. Post an idea

```bash
curl -X POST https://api.lovinideas.com/v1/ideas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Bluetooth Speaker",
    "description": "Great sound quality, perfect for an office desk.",
    "category": "electronics",
    "occasion": "birthday",
    "price_range": "50_100",
    "recipient_type": "colleague",
    "tags": ["tech", "audio"]
  }'
```

## 4. Search

```bash
curl "https://api.lovinideas.com/v1/ideas/search?q=bluetooth&price_range=50_100"
```

You should see the idea you just posted in the results.

## A minimal JavaScript client

If `curl` isn't your thing, here's the same flow as a small JS class:

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

## What's next

- [Your first request, explained line by line](/02-get-started/first-request)
- [How authentication really works](/02-get-started/authentication-setup)
- [Build something real](/03-build/manage-ideas)
