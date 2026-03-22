# LovInIdeas API Documentation

API documentation for LovInIdeas gift ideas platform. Users share and discover gift recommendations for various occasions and recipients.

## Quick Links

- [Live Documentation](https://your-username.github.io/lovinideas-api-docs/) - Complete API reference
- [Quick Start Guide](https://your-username.github.io/lovinideas-api-docs/examples/quick-start) - Integration guide
- [Authentication](https://your-username.github.io/lovinideas-api-docs/authentication/registration) - User registration and JWT

## API Features

- User Authentication - Registration, login, JWT management
- Gift Ideas Management - CRUD operations, search
- Social Features - Comments, likes, ratings
- User Profiles - Profile management, followers
- Analytics - Engagement metrics, trending content

### Key Endpoints
```
POST   /auth/register          # Register user
POST   /auth/login             # User login  
GET    /ideas                  # Get ideas
POST   /ideas                  # Create idea
GET    /ideas/search           # Search ideas
POST   /ideas/{id}/like        # Like idea
POST   /ideas/{id}/comments    # Add comment
GET    /users/{id}/profile     # User profile
```

## Documentation Structure

```
docs/
├── index.md                   # API Overview
├── authentication/            # User auth & JWT tokens
│   ├── registration.md
│   ├── login.md
│   └── tokens.md
├── ideas/                     # Gift ideas management
│   ├── create-idea.md
│   ├── get-ideas.md
│   ├── search-ideas.md
│   └── update-idea.md
├── comments/                  # Comments & discussions
│   ├── add-comment.md
│   └── get-comments.md
├── ratings/                   # Likes & engagement
│   ├── like-idea.md
│   └── get-ratings.md
├── users/                     # User management
│   ├── profile.md
│   └── settings.md
└── examples/                  # Integration guides
    ├── quick-start.md
    └── integration-guide.md
```

## Local Development

**Prerequisites:** Node.js 18+, npm

```bash
git clone https://github.com/your-username/lovinideas-api-docs.git
cd lovinideas-api-docs
npm install
npm run docs:dev
```

**Build:** `npm run docs:build`

## Built With

- [VitePress](https://vitepress.dev/) - Static site generator
- [Vue 3](https://vuejs.org/) - Frontend framework  
- [GitHub Actions](https://github.com/features/actions) - CI/CD
- [GitHub Pages](https://pages.github.com/) - Hosting

## API Examples

### Register User
```bash
curl -X POST https://api.lovinideas.com/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!",
    "username": "giftguru",
    "full_name": "John Doe"
  }'
```

### Search Gift Ideas
```bash
curl "https://api.lovinideas.com/v1/ideas/search?q=anniversary&price_range=25_50"
```

### Create Gift Idea
```bash
curl -X POST https://api.lovinideas.com/v1/ideas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Personalized Star Map",
    "description": "Custom star map showing the stars on your special day...",
    "category": "handmade",
    "occasion": "anniversary",
    "price_range": "25_50",
    "recipient_type": "partner",
    "tags": ["romantic", "personalized", "astronomy"]
  }'
```

## Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/docs-improvement`
3. Make changes and test locally: `npm run docs:dev`
4. Commit and push: `git push origin feature/docs-improvement`
5. Create Pull Request

**Guidelines:** Clear language, practical examples, test code snippets.

## API Status

- **Base URL**: `https://api.lovinideas.com/v1`
- **Version**: v1.0
- **Rate Limits**: 1000 req/hour (auth), 100 req/hour (public)

## Support

- **Email**: api-support@lovinideas.com
- **Issues**: [GitHub Issues](https://github.com/your-username/lovinideas-api-docs/issues)

## License

MIT License