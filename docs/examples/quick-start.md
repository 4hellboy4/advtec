# Quick Start

Get started with LovInIdeas API in 4 steps.

## 1. Register User

```bash
curl -X POST https://api.lovinideas.com/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!",
    "username": "developer",
    "full_name": "Developer"
  }'
```

## 2. Login for Token

```bash
curl -X POST https://api.lovinideas.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com", 
    "password": "SecurePass123!"
  }'
```

Save the `token` from response.

## 3. Create Gift Idea

```bash
curl -X POST https://api.lovinideas.com/v1/ideas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Bluetooth Speaker",
    "description": "Great sound quality, perfect for office use.",
    "category": "electronics",
    "occasion": "birthday",
    "price_range": "50_100",
    "recipient_type": "colleague",
    "tags": ["tech", "audio"]
  }'
```

## 4. Search Ideas

```bash
curl "https://api.lovinideas.com/v1/ideas/search?q=anniversary&price_range=25_50"
```

## JavaScript Example

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

  async getIdeas(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/ideas?${params}`);
  }

  async createIdea(data) {
    return this.request('/ideas', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}

// Usage
const api = new LovInIdeasAPI('your_token');
const ideas = await api.getIdeas({ category: 'electronics' });
```

## Error Handling

```javascript
try {
  const result = await api.createIdea(data);
  if (!result.success) {
    console.error('API Error:', result.error.message);
  }
} catch (error) {
  console.error('Network Error:', error);
}
```

## Rate Limits

- Authenticated: 1000 req/hour
- Unauthenticated: 100 req/hour

## Support

Contact: api-support@lovinideas.com