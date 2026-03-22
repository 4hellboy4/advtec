# Quick Start Guide

Get started with the LovInIdeas API in just a few minutes. This guide will walk you through the essential steps to integrate gift idea functionality into your application.

## Prerequisites

- Basic knowledge of REST APIs
- HTTP client (curl, Postman, or programming language)
- Text editor or IDE

## Step 1: Register and Get API Access

### 1.1 Create an Account

First, register a new user account:

```bash
curl -X POST https://api.lovinideas.com/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "developer@example.com",
    "password": "SecurePass123!",
    "username": "api_developer",
    "full_name": "API Developer"
  }'
```

### 1.2 Login and Get Token

Login to receive your JWT token:

```bash
curl -X POST https://api.lovinideas.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "developer@example.com",
    "password": "SecurePass123!"
  }'
```

**Save the token from the response:**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 86400
  }
}
```

## Step 2: Explore Gift Ideas

### 2.1 Get Popular Ideas

Fetch trending gift ideas without authentication:

```bash
curl "https://api.lovinideas.com/v1/ideas?sort=popular&limit=5"
```

### 2.2 Search for Specific Ideas

Search for anniversary gifts:

```bash
curl "https://api.lovinideas.com/v1/ideas/search?q=anniversary&price_range=25_50"
```

### 2.3 Filter by Category

Get electronics gifts for birthdays:

```bash
curl "https://api.lovinideas.com/v1/ideas?category=electronics&occasion=birthday&limit=10"
```

## Step 3: Create Your First Gift Idea

### 3.1 Post a New Idea

Use your JWT token to create a gift idea:

```bash
curl -X POST https://api.lovinideas.com/v1/ideas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Smart Bluetooth Speaker with Ambient Lighting",
    "description": "Perfect tech gift that combines great sound with mood lighting. I gave this to my colleague for his birthday and he uses it every day at his desk. The sound quality is impressive for the price range, and the LED lights create a nice ambiance during video calls.",
    "category": "electronics",
    "occasion": "birthday",
    "price_range": "50_100",
    "recipient_type": "colleague",
    "tags": ["bluetooth", "speaker", "lighting", "tech", "office"],
    "purchase_links": [
      {
        "store": "Amazon",
        "url": "https://amazon.com/smart-bluetooth-speaker",
        "price": "$75"
      }
    ]
  }'
```

## Step 4: Interact with Ideas

### 4.1 Like an Idea

Show appreciation for a great gift idea:

```bash
curl -X POST https://api.lovinideas.com/v1/ideas/idea_9876543210/like \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 4.2 Add a Comment

Share your experience or ask questions:

```bash
curl -X POST https://api.lovinideas.com/v1/ideas/idea_9876543210/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "content": "Great recommendation! I bought this for my partner and they absolutely love it. The setup was super easy too."
  }'
```

### 4.3 Get Comments

Read what others are saying:

```bash
curl "https://api.lovinideas.com/v1/ideas/idea_9876543210/comments?sort=popular&limit=10"
```

## Step 5: Build a Simple Integration

### 5.1 JavaScript Example

Here's a simple JavaScript example to get you started:

```javascript
class LovInIdeasAPI {
  constructor(token) {
    this.baseURL = 'https://api.lovinideas.com/v1';
    this.token = token;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { 'Authorization': `Bearer ${this.token}` })
      },
      ...options
    };

    const response = await fetch(url, config);
    return response.json();
  }

  // Get popular gift ideas
  async getPopularIdeas(limit = 10) {
    return this.request(`/ideas?sort=popular&limit=${limit}`);
  }

  // Search for gift ideas
  async searchIdeas(query, filters = {}) {
    const params = new URLSearchParams({
      q: query,
      ...filters
    });
    return this.request(`/ideas/search?${params}`);
  }

  // Create a new gift idea
  async createIdea(ideaData) {
    return this.request('/ideas', {
      method: 'POST',
      body: JSON.stringify(ideaData)
    });
  }

  // Like an idea
  async likeIdea(ideaId) {
    return this.request(`/ideas/${ideaId}/like`, {
      method: 'POST'
    });
  }
}

// Usage example
async function example() {
  // Initialize API client
  const api = new LovInIdeasAPI('your_jwt_token_here');

  try {
    // Get popular ideas
    const popular = await api.getPopularIdeas(5);
    console.log('Popular ideas:', popular.data.ideas);

    // Search for anniversary gifts
    const searchResults = await api.searchIdeas('anniversary', {
      price_range: '25_50',
      category: 'handmade'
    });
    console.log('Search results:', searchResults.data.results);

    // Create a new idea
    const newIdea = await api.createIdea({
      title: 'Custom Photo Album',
      description: 'A personalized photo album with memories...',
      category: 'handmade',
      occasion: 'anniversary',
      price_range: '25_50',
      recipient_type: 'partner',
      tags: ['photos', 'memories', 'personalized']
    });
    console.log('Created idea:', newIdea.data.idea);

  } catch (error) {
    console.error('API Error:', error);
  }
}
```

### 5.2 Python Example

```python
import requests
import json

class LovInIdeasAPI:
    def __init__(self, token=None):
        self.base_url = 'https://api.lovinideas.com/v1'
        self.token = token
        self.session = requests.Session()
        
        if token:
            self.session.headers.update({
                'Authorization': f'Bearer {token}'
            })

    def get_popular_ideas(self, limit=10):
        """Get popular gift ideas"""
        response = self.session.get(
            f'{self.base_url}/ideas',
            params={'sort': 'popular', 'limit': limit}
        )
        return response.json()

    def search_ideas(self, query, **filters):
        """Search for gift ideas"""
        params = {'q': query, **filters}
        response = self.session.get(
            f'{self.base_url}/ideas/search',
            params=params
        )
        return response.json()

    def create_idea(self, idea_data):
        """Create a new gift idea"""
        response = self.session.post(
            f'{self.base_url}/ideas',
            json=idea_data
        )
        return response.json()

    def like_idea(self, idea_id):
        """Like a gift idea"""
        response = self.session.post(
            f'{self.base_url}/ideas/{idea_id}/like'
        )
        return response.json()

# Usage example
def main():
    # Initialize API client
    api = LovInIdeasAPI('your_jwt_token_here')

    try:
        # Get popular ideas
        popular = api.get_popular_ideas(5)
        print("Popular ideas:", popular['data']['ideas'])

        # Search for tech gifts
        search_results = api.search_ideas(
            'bluetooth speaker',
            category='electronics',
            price_range='50_100'
        )
        print("Search results:", search_results['data']['results'])

        # Create a new idea
        new_idea = api.create_idea({
            'title': 'Wireless Charging Pad',
            'description': 'Convenient wireless charging solution...',
            'category': 'electronics',
            'occasion': 'birthday',
            'price_range': 'under_25',
            'recipient_type': 'colleague',
            'tags': ['wireless', 'charging', 'convenient']
        })
        print("Created idea:", new_idea['data']['idea'])

    except requests.exceptions.RequestException as e:
        print(f"API Error: {e}")

if __name__ == "__main__":
    main()
```

## Step 6: Handle Common Scenarios

### 6.1 Error Handling

Always handle API errors gracefully:

```javascript
async function safeAPICall(apiFunction) {
  try {
    const result = await apiFunction();
    
    if (!result.success) {
      throw new Error(result.error.message);
    }
    
    return result.data;
  } catch (error) {
    console.error('API call failed:', error.message);
    
    // Handle specific error types
    if (error.message.includes('RATE_LIMIT_EXCEEDED')) {
      console.log('Rate limit exceeded, waiting before retry...');
      // Implement retry logic
    }
    
    throw error;
  }
}
```

### 6.2 Pagination

Handle paginated results:

```javascript
async function getAllIdeas(api, filters = {}) {
  let allIdeas = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await api.request('/ideas', {
      params: { ...filters, page, limit: 50 }
    });

    allIdeas = allIdeas.concat(response.data.ideas);
    hasMore = response.data.pagination.has_next;
    page++;
  }

  return allIdeas;
}
```

### 6.3 Rate Limit Management

Respect API rate limits:

```javascript
class RateLimitedAPI extends LovInIdeasAPI {
  constructor(token) {
    super(token);
    this.requestQueue = [];
    this.isProcessing = false;
  }

  async request(endpoint, options = {}) {
    return new Promise((resolve, reject) => {
      this.requestQueue.push({ endpoint, options, resolve, reject });
      this.processQueue();
    });
  }

  async processQueue() {
    if (this.isProcessing || this.requestQueue.length === 0) return;
    
    this.isProcessing = true;
    
    while (this.requestQueue.length > 0) {
      const { endpoint, options, resolve, reject } = this.requestQueue.shift();
      
      try {
        const result = await super.request(endpoint, options);
        resolve(result);
      } catch (error) {
        if (error.message.includes('RATE_LIMIT_EXCEEDED')) {
          // Wait and retry
          await new Promise(resolve => setTimeout(resolve, 60000));
          this.requestQueue.unshift({ endpoint, options, resolve, reject });
          continue;
        }
        reject(error);
      }
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    this.isProcessing = false;
  }
}
```

## Next Steps

Now that you've completed the quick start:

1. **Explore Advanced Features**: Check out [user profiles](/users/profile), [advanced search](/ideas/search-ideas), and [analytics](/ratings/get-ratings)

2. **Read Best Practices**: Learn about [authentication security](/authentication/tokens), [content guidelines](/ideas/create-idea), and [API optimization](/ideas/get-ideas)

3. **Join the Community**: Follow [@LovInIdeasAPI](https://twitter.com/lovinideasapi) for updates and tips

4. **Get Support**: Contact api-support@lovinideas.com for technical assistance

## Useful Resources

- **API Reference**: Complete endpoint documentation in the sidebar
- **SDKs**: Official SDKs for popular languages (coming soon)
- **Webhooks**: Real-time notifications for your applications
- **Rate Limits**: Current limits and upgrade options
- **Status Page**: API status and maintenance updates

Happy coding! 🎁