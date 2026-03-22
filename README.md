# LovInIdeas API Documentation

> 🎁 **API Documentation for LovInIdeas Gift Ideas Platform**

This repository contains the complete API documentation for LovInIdeas, a platform where users share and discover creative gift ideas for colleagues, partners, friends, and family members.

## 📖 About LovInIdeas

LovInIdeas is like Habr, but for gift ideas! Users post creative gift suggestions based on real experience. When you want to make someone happy but need inspiration, LovInIdeas provides authentic recommendations from real people who have been in similar situations.

## 🚀 Quick Links

- **📚 [Live Documentation](https://your-username.github.io/lovinideas-api-docs/)** - Complete API reference
- **🔧 [Quick Start Guide](https://your-username.github.io/lovinideas-api-docs/examples/quick-start)** - Get started in 5 minutes
- **💡 [Integration Examples](https://your-username.github.io/lovinideas-api-docs/examples/integration-guide)** - Real-world implementation patterns
- **🔐 [Authentication](https://your-username.github.io/lovinideas-api-docs/authentication/registration)** - User registration and JWT tokens

## 🛠 API Features

### Core Functionality
- **🔐 User Authentication** - Registration, login, JWT token management
- **💡 Gift Ideas Management** - Create, read, update, search gift ideas
- **🔍 Advanced Search** - Full-text search with filters and suggestions
- **💬 Social Features** - Comments, likes, ratings, and user interactions
- **👤 User Profiles** - Profile management, followers, and preferences
- **📊 Analytics** - Engagement metrics and trending content

### Key Endpoints
```
POST   /auth/register          # Register new user
POST   /auth/login             # User login
GET    /ideas                  # Get gift ideas
POST   /ideas                  # Create gift idea
GET    /ideas/search           # Search ideas
POST   /ideas/{id}/like        # Like an idea
POST   /ideas/{id}/comments    # Add comment
GET    /users/{id}/profile     # Get user profile
```

## 🏗 Documentation Structure

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

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/lovinideas-api-docs.git
   cd lovinideas-api-docs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run docs:dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
# Build static site
npm run docs:build

# Preview production build
npm run docs:preview
```

## 🔧 Built With

- **[VitePress](https://vitepress.dev/)** - Static site generator
- **[Vue 3](https://vuejs.org/)** - Frontend framework
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD pipeline
- **[GitHub Pages](https://pages.github.com/)** - Hosting

## 📝 API Examples

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

## 🤝 Contributing

We welcome contributions to improve the documentation!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/improve-auth-docs
   ```
3. **Make your changes**
4. **Test locally**
   ```bash
   npm run docs:dev
   ```
5. **Commit and push**
   ```bash
   git commit -m "Improve authentication documentation"
   git push origin feature/improve-auth-docs
   ```
6. **Create a Pull Request**

### Documentation Guidelines

- Use clear, concise language
- Include practical examples
- Test all code snippets
- Follow existing formatting patterns
- Add screenshots for UI changes

## 📊 API Status

- **Base URL**: `https://api.lovinideas.com/v1`
- **Status**: Active Development
- **Version**: v1.0
- **Rate Limits**: 1000 req/hour (authenticated), 100 req/hour (public)
- **Uptime**: 99.9%

## 📞 Support

- **📧 Email**: api-support@lovinideas.com
- **💬 Discord**: [LovInIdeas Community](https://discord.gg/lovinideas)
- **📱 Twitter**: [@LovInIdeasAPI](https://twitter.com/lovinideasapi)
- **🐛 Issues**: [GitHub Issues](https://github.com/your-username/lovinideas-api-docs/issues)

## 📄 License

This documentation is licensed under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **VitePress Team** - Amazing documentation framework
- **LovInIdeas Community** - Feedback and suggestions
- **Contributors** - Everyone who helped improve this documentation

---

**Made with ❤️ for the LovInIdeas community**

> 💡 **Tip**: Bookmark the [Quick Start Guide](https://your-username.github.io/lovinideas-api-docs/examples/quick-start) to get up and running quickly!