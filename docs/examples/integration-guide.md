# Integration Guide

Advanced integration patterns and real-world examples for building applications with the LovInIdeas API.

## Common Integration Patterns

### 1. Gift Recommendation Engine

Build a personalized gift recommendation system:

```javascript
class GiftRecommendationEngine {
  constructor(apiClient) {
    this.api = apiClient;
    this.userPreferences = new Map();
  }

  async getRecommendations(userId, occasion, recipientType, budget) {
    // Get user's past interactions
    const userActivity = await this.getUserActivity(userId);
    
    // Analyze preferences
    const preferences = this.analyzePreferences(userActivity);
    
    // Search with personalized filters
    const recommendations = await this.api.searchIdeas('', {
      occasion,
      recipient_type: recipientType,
      price_range: this.getPriceRange(budget),
      category: preferences.favoriteCategories[0],
      sort: 'popular'
    });

    // Score and rank results
    return this.scoreRecommendations(recommendations.data.results, preferences);
  }

  analyzePreferences(userActivity) {
    const categories = {};
    const occasions = {};
    const priceRanges = {};

    userActivity.liked_ideas.forEach(idea => {
      categories[idea.category] = (categories[idea.category] || 0) + 1;
      occasions[idea.occasion] = (occasions[idea.occasion] || 0) + 1;
      priceRanges[idea.price_range] = (priceRanges[idea.price_range] || 0) + 1;
    });

    return {
      favoriteCategories: Object.keys(categories).sort((a, b) => categories[b] - categories[a]),
      favoriteOccasions: Object.keys(occasions).sort((a, b) => occasions[b] - occasions[a]),
      preferredPriceRanges: Object.keys(priceRanges).sort((a, b) => priceRanges[b] - priceRanges[a])
    };
  }

  scoreRecommendations(ideas, preferences) {
    return ideas.map(idea => {
      let score = idea.stats.likes * 0.4 + idea.stats.saves * 0.6;
      
      // Boost score for preferred categories
      if (preferences.favoriteCategories.includes(idea.category)) {
        score *= 1.5;
      }
      
      // Boost for high engagement
      const engagementRate = (idea.stats.likes + idea.stats.comments) / idea.stats.views;
      score *= (1 + engagementRate);

      return { ...idea, recommendation_score: score };
    }).sort((a, b) => b.recommendation_score - a.recommendation_score);
  }

  async getUserActivity(userId) {
    return this.api.request(`/users/${userId}/rating-activity`);
  }

  getPriceRange(budget) {
    if (budget < 25) return 'under_25';
    if (budget < 50) return '25_50';
    if (budget < 100) return '50_100';
    if (budget < 250) return '100_250';
    if (budget < 500) return '250_500';
    return 'over_500';
  }
}
```

### 2. Content Curation Dashboard

Create an admin dashboard for content moderation:

```python
class ContentModerationDashboard:
    def __init__(self, api_client):
        self.api = api_client

    def get_moderation_queue(self):
        """Get content that needs moderation"""
        # Get recently posted ideas
        recent_ideas = self.api.get_ideas(
            sort='newest',
            limit=50,
            status='published'
        )
        
        # Filter for potential issues
        flagged_content = []
        
        for idea in recent_ideas['data']['ideas']:
            flags = self.analyze_content(idea)
            if flags:
                flagged_content.append({
                    'idea': idea,
                    'flags': flags,
                    'priority': self.calculate_priority(flags)
                })
        
        return sorted(flagged_content, key=lambda x: x['priority'], reverse=True)

    def analyze_content(self, idea):
        """Analyze content for potential issues"""
        flags = []
        
        # Check for spam indicators
        if self.is_potential_spam(idea):
            flags.append('potential_spam')
        
        # Check for inappropriate content
        if self.has_inappropriate_content(idea):
            flags.append('inappropriate_content')
        
        # Check for duplicate content
        if self.is_duplicate_content(idea):
            flags.append('duplicate_content')
        
        # Check for low quality
        if self.is_low_quality(idea):
            flags.append('low_quality')
        
        return flags

    def is_potential_spam(self, idea):
        """Detect spam patterns"""
        # Multiple external links
        if len(idea.get('purchase_links', [])) > 5:
            return True
        
        # Excessive promotional language
        promotional_words = ['buy now', 'limited time', 'exclusive offer', 'discount code']
        content = (idea['title'] + ' ' + idea['description']).lower()
        
        return sum(1 for word in promotional_words if word in content) >= 2

    def has_inappropriate_content(self, idea):
        """Check for inappropriate content"""
        # This would integrate with content moderation service
        # For example, using AWS Comprehend or similar
        return False  # Placeholder

    def is_duplicate_content(self, idea):
        """Check for duplicate or very similar content"""
        # Search for similar titles
        similar = self.api.search_ideas(
            idea['title'][:50],  # First 50 chars
            limit=5
        )
        
        # Check similarity threshold
        for similar_idea in similar['data']['results']:
            if similar_idea['id'] != idea['id']:
                similarity = self.calculate_similarity(idea['title'], similar_idea['title'])
                if similarity > 0.8:
                    return True
        
        return False

    def calculate_similarity(self, text1, text2):
        """Calculate text similarity (simplified)"""
        words1 = set(text1.lower().split())
        words2 = set(text2.lower().split())
        
        intersection = words1.intersection(words2)
        union = words1.union(words2)
        
        return len(intersection) / len(union) if union else 0

    def is_low_quality(self, idea):
        """Check for low quality indicators"""
        # Very short description
        if len(idea['description']) < 50:
            return True
        
        # No purchase links or images
        if not idea.get('purchase_links') and not idea.get('images'):
            return True
        
        # Poor grammar/spelling (would need NLP service)
        return False

    def calculate_priority(self, flags):
        """Calculate moderation priority"""
        priority_weights = {
            'inappropriate_content': 10,
            'potential_spam': 7,
            'duplicate_content': 5,
            'low_quality': 3
        }
        
        return sum(priority_weights.get(flag, 1) for flag in flags)

    def moderate_content(self, idea_id, action, reason):
        """Take moderation action"""
        return self.api.request(f'/admin/ideas/{idea_id}/moderate', {
            'method': 'POST',
            'json': {
                'action': action,  # 'approve', 'reject', 'flag'
                'reason': reason,
                'moderator_notes': f'Auto-moderation: {reason}'
            }
        })
```

### 3. Social Media Integration

Integrate with social platforms for sharing:

```javascript
class SocialMediaIntegration {
  constructor(apiClient, platforms) {
    this.api = apiClient;
    this.platforms = platforms; // { twitter: twitterClient, facebook: fbClient, etc. }
  }

  async shareIdea(ideaId, platforms = ['twitter', 'facebook']) {
    // Get idea details
    const idea = await this.api.request(`/ideas/${ideaId}`);
    const ideaData = idea.data.idea;

    const results = {};

    for (const platform of platforms) {
      try {
        results[platform] = await this.shareToplatform(platform, ideaData);
      } catch (error) {
        results[platform] = { success: false, error: error.message };
      }
    }

    // Track shares in API
    await this.api.request(`/ideas/${ideaId}/share`, {
      method: 'POST',
      body: JSON.stringify({
        platforms: Object.keys(results).filter(p => results[p].success),
        share_type: 'social_media'
      })
    });

    return results;
  }

  async shareToplatform(platform, ideaData) {
    switch (platform) {
      case 'twitter':
        return this.shareToTwitter(ideaData);
      case 'facebook':
        return this.shareToFacebook(ideaData);
      case 'pinterest':
        return this.shareToPinterest(ideaData);
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  async shareToTwitter(ideaData) {
    const text = this.generateTwitterText(ideaData);
    const mediaIds = await this.uploadTwitterMedia(ideaData.images);

    return this.platforms.twitter.post('statuses/update', {
      status: text,
      media_ids: mediaIds.join(',')
    });
  }

  generateTwitterText(ideaData) {
    const maxLength = 280;
    const url = `https://lovinideas.com/ideas/${ideaData.id}`;
    const urlLength = 23; // Twitter's t.co length
    
    let text = `🎁 ${ideaData.title}\n\n${ideaData.description}`;
    
    // Add hashtags
    const hashtags = ideaData.tags.slice(0, 3).map(tag => `#${tag}`).join(' ');
    text += `\n\n${hashtags}`;
    
    // Truncate if too long
    const availableLength = maxLength - urlLength - 1; // -1 for space before URL
    if (text.length > availableLength) {
      text = text.substring(0, availableLength - 3) + '...';
    }
    
    return `${text} ${url}`;
  }

  async uploadTwitterMedia(imageUrls) {
    if (!imageUrls || imageUrls.length === 0) return [];

    const mediaIds = [];
    
    for (const imageUrl of imageUrls.slice(0, 4)) { // Twitter max 4 images
      try {
        const imageBuffer = await this.downloadImage(imageUrl);
        const media = await this.platforms.twitter.post('media/upload', {
          media: imageBuffer
        });
        mediaIds.push(media.media_id_string);
      } catch (error) {
        console.error(`Failed to upload image ${imageUrl}:`, error);
      }
    }

    return mediaIds;
  }

  async downloadImage(url) {
    const response = await fetch(url);
    return response.buffer();
  }
}
```

### 4. Analytics Dashboard

Build comprehensive analytics:

```python
class AnalyticsDashboard:
    def __init__(self, api_client):
        self.api = api_client

    def get_user_analytics(self, user_id, date_range='30d'):
        """Get comprehensive user analytics"""
        # Get user's ideas performance
        user_ideas = self.api.request(f'/users/{user_id}/ideas')
        
        # Get engagement metrics
        engagement_data = self.api.request(f'/users/{user_id}/rating-activity')
        
        # Calculate metrics
        analytics = {
            'content_metrics': self.calculate_content_metrics(user_ideas['data']),
            'engagement_metrics': self.calculate_engagement_metrics(engagement_data['data']),
            'growth_metrics': self.calculate_growth_metrics(user_id, date_range),
            'audience_insights': self.get_audience_insights(user_id)
        }
        
        return analytics

    def calculate_content_metrics(self, ideas_data):
        """Calculate content performance metrics"""
        ideas = ideas_data.get('ideas', [])
        
        if not ideas:
            return {'total_ideas': 0}
        
        total_likes = sum(idea['stats']['likes'] for idea in ideas)
        total_comments = sum(idea['stats']['comments'] for idea in ideas)
        total_saves = sum(idea['stats']['saves'] for idea in ideas)
        total_views = sum(idea['stats']['views'] for idea in ideas)
        
        return {
            'total_ideas': len(ideas),
            'total_likes': total_likes,
            'total_comments': total_comments,
            'total_saves': total_saves,
            'total_views': total_views,
            'avg_likes_per_idea': total_likes / len(ideas),
            'avg_comments_per_idea': total_comments / len(ideas),
            'avg_saves_per_idea': total_saves / len(ideas),
            'engagement_rate': (total_likes + total_comments) / total_views if total_views > 0 else 0,
            'top_performing_idea': max(ideas, key=lambda x: x['stats']['likes']),
            'category_performance': self.analyze_category_performance(ideas)
        }

    def analyze_category_performance(self, ideas):
        """Analyze performance by category"""
        category_stats = {}
        
        for idea in ideas:
            category = idea['category']
            if category not in category_stats:
                category_stats[category] = {
                    'count': 0,
                    'total_likes': 0,
                    'total_views': 0
                }
            
            stats = category_stats[category]
            stats['count'] += 1
            stats['total_likes'] += idea['stats']['likes']
            stats['total_views'] += idea['stats']['views']
        
        # Calculate averages
        for category, stats in category_stats.items():
            stats['avg_likes'] = stats['total_likes'] / stats['count']
            stats['avg_views'] = stats['total_views'] / stats['count']
            stats['engagement_rate'] = stats['total_likes'] / stats['total_views'] if stats['total_views'] > 0 else 0
        
        return category_stats

    def calculate_growth_metrics(self, user_id, date_range):
        """Calculate growth metrics over time"""
        # This would require historical data from the API
        # For now, we'll simulate the structure
        
        return {
            'follower_growth': {
                'current': 89,
                'change': '+12',
                'change_percent': 15.6
            },
            'engagement_growth': {
                'current': 0.24,
                'change': '+0.03',
                'change_percent': 14.3
            },
            'content_growth': {
                'ideas_posted': 5,
                'change': '+2',
                'change_percent': 66.7
            }
        }

    def get_trending_analysis(self, category=None, time_period='24h'):
        """Analyze trending content"""
        trending_ideas = self.api.request('/ideas/trending', {
            'params': {
                'period': time_period,
                'category': category,
                'limit': 50
            }
        })
        
        trends = {
            'hot_topics': self.extract_hot_topics(trending_ideas['data']['trending_ideas']),
            'trending_categories': self.analyze_trending_categories(trending_ideas['data']['trending_ideas']),
            'viral_content': self.identify_viral_content(trending_ideas['data']['trending_ideas']),
            'emerging_trends': self.detect_emerging_trends(trending_ideas['data']['trending_ideas'])
        }
        
        return trends

    def extract_hot_topics(self, trending_ideas):
        """Extract hot topics from trending content"""
        all_tags = []
        for idea in trending_ideas:
            all_tags.extend(idea['idea']['tags'])
        
        # Count tag frequency
        tag_counts = {}
        for tag in all_tags:
            tag_counts[tag] = tag_counts.get(tag, 0) + 1
        
        # Return top tags
        return sorted(tag_counts.items(), key=lambda x: x[1], reverse=True)[:10]

    def generate_insights_report(self, user_id):
        """Generate actionable insights"""
        analytics = self.get_user_analytics(user_id)
        trending = self.get_trending_analysis()
        
        insights = []
        
        # Content insights
        if analytics['content_metrics']['avg_likes_per_idea'] < 10:
            insights.append({
                'type': 'improvement',
                'category': 'content',
                'message': 'Consider adding more detailed descriptions and high-quality images to increase engagement',
                'priority': 'high'
            })
        
        # Trending opportunities
        hot_topics = [topic[0] for topic in trending['hot_topics'][:5]]
        user_categories = analytics['content_metrics']['category_performance'].keys()
        
        trending_opportunities = set(hot_topics) - set(user_categories)
        if trending_opportunities:
            insights.append({
                'type': 'opportunity',
                'category': 'trending',
                'message': f'Consider creating content in trending areas: {", ".join(list(trending_opportunities)[:3])}',
                'priority': 'medium'
            })
        
        return insights
```

### 5. Mobile App Integration

React Native example for mobile apps:

```javascript
// LovInIdeasSDK.js
class LovInIdeasSDK {
  constructor(config) {
    this.baseURL = config.baseURL || 'https://api.lovinideas.com/v1';
    this.token = config.token;
    this.cache = new Map();
    this.cacheTimeout = config.cacheTimeout || 300000; // 5 minutes
  }

  async request(endpoint, options = {}) {
    const cacheKey = `${endpoint}${JSON.stringify(options)}`;
    
    // Check cache for GET requests
    if (!options.method || options.method === 'GET') {
      const cached = this.cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }
    }

    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { 'Authorization': `Bearer ${this.token}` })
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'API request failed');
      }

      // Cache successful GET requests
      if (!options.method || options.method === 'GET') {
        this.cache.set(cacheKey, {
          data,
          timestamp: Date.now()
        });
      }

      return data;
    } catch (error) {
      // Handle network errors
      if (!navigator.onLine) {
        throw new Error('No internet connection');
      }
      throw error;
    }
  }

  // Offline support
  async getIdeasOffline() {
    const cachedIdeas = await AsyncStorage.getItem('cached_ideas');
    return cachedIdeas ? JSON.parse(cachedIdeas) : [];
  }

  async cacheIdeasForOffline(ideas) {
    await AsyncStorage.setItem('cached_ideas', JSON.stringify(ideas));
  }

  // Image optimization for mobile
  getOptimizedImageURL(originalURL, width = 300, quality = 80) {
    if (!originalURL) return null;
    
    // Add image optimization parameters
    const url = new URL(originalURL);
    url.searchParams.set('w', width);
    url.searchParams.set('q', quality);
    url.searchParams.set('f', 'webp'); // Use WebP for better compression
    
    return url.toString();
  }

  // Push notification handling
  async registerForPushNotifications(deviceToken) {
    return this.request('/users/me/devices', {
      method: 'POST',
      body: JSON.stringify({
        device_token: deviceToken,
        platform: Platform.OS,
        app_version: DeviceInfo.getVersion()
      })
    });
  }
}

// Usage in React Native component
import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

const GiftIdeasScreen = ({ navigation }) => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const sdk = new LovInIdeasSDK({
    baseURL: 'https://api.lovinideas.com/v1',
    token: 'user_jwt_token'
  });

  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = async () => {
    try {
      setLoading(true);
      const response = await sdk.request('/ideas?sort=popular&limit=20');
      setIdeas(response.data.ideas);
      
      // Cache for offline use
      await sdk.cacheIdeasForOffline(response.data.ideas);
    } catch (error) {
      console.error('Failed to load ideas:', error);
      
      // Fallback to cached data
      const cachedIdeas = await sdk.getIdeasOffline();
      setIdeas(cachedIdeas);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadIdeas();
    setRefreshing(false);
  };

  const likeIdea = async (ideaId) => {
    try {
      await sdk.request(`/ideas/${ideaId}/like`, { method: 'POST' });
      
      // Update local state optimistically
      setIdeas(prevIdeas => 
        prevIdeas.map(idea => 
          idea.id === ideaId 
            ? { ...idea, stats: { ...idea.stats, likes: idea.stats.likes + 1 } }
            : idea
        )
      );
    } catch (error) {
      console.error('Failed to like idea:', error);
    }
  };

  const renderIdea = ({ item }) => (
    <TouchableOpacity 
      style={styles.ideaCard}
      onPress={() => navigation.navigate('IdeaDetail', { ideaId: item.id })}
    >
      <Image 
        source={{ 
          uri: sdk.getOptimizedImageURL(item.images?.[0], 300, 80) 
        }}
        style={styles.ideaImage}
      />
      <View style={styles.ideaContent}>
        <Text style={styles.ideaTitle}>{item.title}</Text>
        <Text style={styles.ideaDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.ideaStats}>
          <TouchableOpacity onPress={() => likeIdea(item.id)}>
            <Text>❤️ {item.stats.likes}</Text>
          </TouchableOpacity>
          <Text>💬 {item.stats.comments}</Text>
          <Text>💰 {item.price_range.replace('_', '-')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={ideas}
      renderItem={renderIdea}
      keyExtractor={item => item.id}
      refreshing={refreshing}
      onRefresh={onRefresh}
      showsVerticalScrollIndicator={false}
    />
  );
};
```

## Best Practices for Integration

### 1. Error Handling and Resilience

```javascript
class ResilientAPIClient {
  constructor(config) {
    this.config = config;
    this.retryAttempts = 3;
    this.retryDelay = 1000; // Start with 1 second
  }

  async requestWithRetry(endpoint, options = {}, attempt = 1) {
    try {
      return await this.request(endpoint, options);
    } catch (error) {
      if (attempt < this.retryAttempts && this.shouldRetry(error)) {
        const delay = this.retryDelay * Math.pow(2, attempt - 1); // Exponential backoff
        await this.sleep(delay);
        return this.requestWithRetry(endpoint, options, attempt + 1);
      }
      throw error;
    }
  }

  shouldRetry(error) {
    // Retry on network errors and 5xx server errors
    return error.code === 'NETWORK_ERROR' || 
           (error.status >= 500 && error.status < 600) ||
           error.code === 'RATE_LIMIT_EXCEEDED';
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### 2. Performance Optimization

```javascript
// Implement request deduplication
class OptimizedAPIClient {
  constructor() {
    this.pendingRequests = new Map();
  }

  async request(endpoint, options = {}) {
    const requestKey = `${endpoint}${JSON.stringify(options)}`;
    
    // Return existing promise if same request is pending
    if (this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey);
    }

    const promise = this.makeRequest(endpoint, options);
    this.pendingRequests.set(requestKey, promise);

    try {
      const result = await promise;
      return result;
    } finally {
      this.pendingRequests.delete(requestKey);
    }
  }
}
```

### 3. Security Best Practices

```javascript
// Secure token management
class SecureTokenManager {
  constructor() {
    this.token = null;
    this.refreshToken = null;
    this.tokenExpiry = null;
  }

  async getValidToken() {
    if (!this.token || this.isTokenExpired()) {
      await this.refreshAccessToken();
    }
    return this.token;
  }

  isTokenExpired() {
    return this.tokenExpiry && Date.now() >= this.tokenExpiry;
  }

  async refreshAccessToken() {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch('/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: this.refreshToken })
    });

    const data = await response.json();
    
    this.token = data.access_token;
    this.tokenExpiry = Date.now() + (data.expires_in * 1000);
    
    // Securely store tokens
    await this.secureStorage.setItem('access_token', this.token);
    await this.secureStorage.setItem('refresh_token', data.refresh_token);
  }
}
```

## Testing Your Integration

### Unit Tests Example

```javascript
// Jest tests for API client
describe('LovInIdeasAPI', () => {
  let api;
  let mockFetch;

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;
    api = new LovInIdeasAPI('test-token');
  });

  test('should get popular ideas', async () => {
    const mockResponse = {
      success: true,
      data: { ideas: [{ id: '1', title: 'Test Idea' }] }
    };

    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const result = await api.getPopularIdeas(5);
    
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.lovinideas.com/v1/ideas?sort=popular&limit=5',
      expect.objectContaining({
        headers: expect.objectContaining({
          'Authorization': 'Bearer test-token'
        })
      })
    );
    
    expect(result).toEqual(mockResponse);
  });

  test('should handle API errors', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 400,
      json: () => Promise.resolve({
        success: false,
        error: { message: 'Bad Request' }
      })
    });

    await expect(api.getPopularIdeas()).rejects.toThrow('Bad Request');
  });
});
```

## Deployment Considerations

### Environment Configuration

```javascript
// config/environment.js
const environments = {
  development: {
    API_BASE_URL: 'https://api-dev.lovinideas.com/v1',
    CACHE_TIMEOUT: 60000, // 1 minute for development
    RETRY_ATTEMPTS: 1
  },
  staging: {
    API_BASE_URL: 'https://api-staging.lovinideas.com/v1',
    CACHE_TIMEOUT: 300000, // 5 minutes
    RETRY_ATTEMPTS: 2
  },
  production: {
    API_BASE_URL: 'https://api.lovinideas.com/v1',
    CACHE_TIMEOUT: 600000, // 10 minutes
    RETRY_ATTEMPTS: 3
  }
};

export default environments[process.env.NODE_ENV || 'development'];
```

### Monitoring and Logging

```javascript
// API monitoring wrapper
class MonitoredAPIClient extends LovInIdeasAPI {
  async request(endpoint, options = {}) {
    const startTime = Date.now();
    const requestId = this.generateRequestId();
    
    try {
      this.logRequest(requestId, endpoint, options);
      const result = await super.request(endpoint, options);
      this.logSuccess(requestId, endpoint, Date.now() - startTime);
      return result;
    } catch (error) {
      this.logError(requestId, endpoint, error, Date.now() - startTime);
      throw error;
    }
  }

  logRequest(requestId, endpoint, options) {
    console.log(`[${requestId}] API Request: ${options.method || 'GET'} ${endpoint}`);
  }

  logSuccess(requestId, endpoint, duration) {
    console.log(`[${requestId}] API Success: ${endpoint} (${duration}ms)`);
  }

  logError(requestId, endpoint, error, duration) {
    console.error(`[${requestId}] API Error: ${endpoint} (${duration}ms)`, error);
    
    // Send to monitoring service
    this.sendToMonitoring({
      requestId,
      endpoint,
      error: error.message,
      duration,
      timestamp: new Date().toISOString()
    });
  }

  generateRequestId() {
    return Math.random().toString(36).substring(2, 15);
  }

  sendToMonitoring(data) {
    // Send to your monitoring service (e.g., Sentry, DataDog)
    if (window.Sentry) {
      window.Sentry.captureException(new Error(data.error), {
        tags: {
          api_endpoint: data.endpoint,
          request_id: data.requestId
        },
        extra: data
      });
    }
  }
}
```

This comprehensive integration guide provides real-world patterns and examples for building robust applications with the LovInIdeas API. Choose the patterns that best fit your use case and adapt them to your specific requirements.