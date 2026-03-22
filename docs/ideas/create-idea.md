# Create Gift Idea

Create new gift idea.

## Endpoint

```http
POST /ideas
Authorization: Bearer <token>
```

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Gift idea title (5-200 characters) |
| `description` | string | Yes | Detailed description (20-2000 characters) |
| `category` | string | Yes | Gift category (see categories below) |
| `occasion` | string | Yes | Occasion type (see occasions below) |
| `price_range` | string | Yes | Price range category |
| `recipient_type` | string | Yes | Who is this gift for |
| `tags` | array | No | Array of tags (max 10) |
| `images` | array | No | Array of image URLs (max 5) |
| `purchase_links` | array | No | Where to buy this gift |

## Categories

- `electronics` - Gadgets, tech accessories
- `books_media` - Books, movies, music
- `fashion` - Clothing, accessories, jewelry
- `home_garden` - Home decor, plants, furniture
- `food_drinks` - Gourmet food, beverages, treats
- `experiences` - Events, activities, subscriptions
- `handmade` - DIY, crafts, personalized items
- `sports_fitness` - Sports equipment, fitness gear
- `beauty_health` - Cosmetics, wellness products
- `toys_games` - Games, toys, puzzles

## Occasions

- `birthday` - Birthday celebrations
- `anniversary` - Wedding anniversaries
- `wedding` - Wedding gifts
- `graduation` - Graduation celebrations
- `holiday` - Christmas, New Year, etc.
- `valentines` - Valentine's Day
- `mothers_day` - Mother's Day
- `fathers_day` - Father's Day
- `promotion` - Job promotion, achievement
- `housewarming` - New home celebration
- `baby_shower` - Baby-related celebrations
- `retirement` - Retirement gifts
- `just_because` - No special occasion

## Price Ranges

- `under_25` - Under $25
- `25_50` - $25 - $50
- `50_100` - $50 - $100
- `100_250` - $100 - $250
- `250_500` - $250 - $500
- `over_500` - Over $500

## Recipient Types

- `partner` - Romantic partner, spouse
- `family` - Parents, siblings, relatives
- `friend` - Close friends
- `colleague` - Work colleagues
- `boss` - Manager, supervisor
- `teacher` - Teachers, mentors
- `child` - Kids, teenagers
- `elderly` - Senior citizens
- `anyone` - Universal gifts

## Example Request

```json
{
  "title": "Personalized Star Map for Anniversary",
  "description": "A beautiful custom star map showing how the stars aligned on your special day. Perfect for anniversaries, weddings, or any romantic occasion. The map can be personalized with date, location, and a special message. High-quality print on premium paper, comes ready to frame. I gave this to my partner for our 5-year anniversary and they absolutely loved it. The quality is amazing and it's such a unique, thoughtful gift that shows you put real effort into it.",
  "category": "handmade",
  "occasion": "anniversary",
  "price_range": "25_50",
  "recipient_type": "partner",
  "tags": ["romantic", "personalized", "wall-art", "astronomy", "custom"],
  "images": [
    "https://example.com/star-map-1.jpg",
    "https://example.com/star-map-2.jpg"
  ],
  "purchase_links": [
    {
      "store": "GreaterSkies",
      "url": "https://greaterskies.com/star-maps",
      "price": "$35"
    },
    {
      "store": "TheNightSky",
      "url": "https://thenightsky.com/custom-maps",
      "price": "$42"
    }
  ]
}
```

## Example Response

### Success (201 Created)

```json
{
  "success": true,
  "data": {
    "idea": {
      "id": "idea_9876543210",
      "title": "Personalized Star Map for Anniversary",
      "description": "A beautiful custom star map showing how the stars aligned on your special day...",
      "category": "handmade",
      "occasion": "anniversary",
      "price_range": "25_50",
      "recipient_type": "partner",
      "tags": ["romantic", "personalized", "wall-art", "astronomy", "custom"],
      "images": [
        "https://example.com/star-map-1.jpg",
        "https://example.com/star-map-2.jpg"
      ],
      "purchase_links": [
        {
          "store": "GreaterSkies",
          "url": "https://greaterskies.com/star-maps",
          "price": "$35"
        }
      ],
      "author": {
        "id": "usr_1234567890",
        "username": "giftguru",
        "full_name": "John Doe",
        "avatar_url": "https://cdn.lovinideas.com/avatars/usr_1234567890.jpg"
      },
      "stats": {
        "likes": 0,
        "comments": 0,
        "saves": 0,
        "views": 1
      },
      "created_at": "2026-03-22T16:30:00Z",
      "updated_at": "2026-03-22T16:30:00Z",
      "status": "published"
    }
  },
  "message": "Gift idea created successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

### Error (400 Bad Request)

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "title": "Title must be between 5 and 200 characters",
      "category": "Invalid category selected",
      "tags": "Maximum 10 tags allowed"
    }
  },
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Validation Rules

- **Title**: 5-200 characters, must be unique per user
- **Description**: 20-2000 characters, rich text supported
- **Category**: Must be one of the predefined categories
- **Occasion**: Must be one of the predefined occasions
- **Tags**: Maximum 10 tags, each 2-30 characters
- **Images**: Maximum 5 images, valid URLs only
- **Purchase Links**: Maximum 10 links per idea

## Content Guidelines

### Content Guidelines

**Required Elements:**
- Personal experience with the gift
- Specific details (brands, prices, purchase locations)
- Context for occasion/recipient
- High-quality images
- Purchase links

**Moderation Rules:**
- No inappropriate content
- No spam/promotional content  
- No copyright violations
- Complete descriptions required

## Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Input validation failed |
| `DUPLICATE_TITLE` | Title already exists for this user |
| `INVALID_CATEGORY` | Category not found |
| `INVALID_OCCASION` | Occasion not found |
| `TOO_MANY_TAGS` | More than 10 tags provided |
| `INVALID_IMAGE_URL` | Image URL is not accessible |
| `CONTENT_MODERATION` | Content violates community guidelines |

## cURL Example

```bash
curl -X POST https://api.lovinideas.com/v1/ideas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "title": "Personalized Star Map for Anniversary",
    "description": "A beautiful custom star map showing how the stars aligned...",
    "category": "handmade",
    "occasion": "anniversary",
    "price_range": "25_50",
    "recipient_type": "partner",
    "tags": ["romantic", "personalized", "wall-art"]
  }'
```

## Next Steps

1. Share idea URL from response
2. Monitor engagement metrics
3. [Update idea](/ideas/update-idea) if needed
4. Create additional ideas