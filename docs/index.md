# LovInIdeas API Documentation

REST API for LovInIdeas gift ideas platform. Users share and discover gift recommendations for various occasions and recipients.

## Base URL

```
https://api.lovinideas.com/v1
```

## Authentication

All endpoints require JWT authentication:

```http
Authorization: Bearer <jwt-token>
```

Get tokens via [registration](/authentication/registration) and [login](/authentication/login) endpoints.

## Rate Limits

| User Type | Limit |
|-----------|-------|
| Authenticated | 1000 req/hour |
| Unauthenticated | 100 req/hour |

## Response Format

**Success Response:**
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Success message",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": { /* additional info */ }
  },
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Core Features

- **Authentication** - User registration, login, JWT management
- **Ideas Management** - CRUD operations for gift ideas
- **Search** - Full-text search with filters
- **Social Features** - Comments, likes, ratings
- **User Profiles** - Profile and preference management

## Quick Start

1. [Register user](/authentication/registration)
2. [Login for JWT token](/authentication/login)  
3. [Create gift idea](/ideas/create-idea)
4. [Search ideas](/ideas/search-ideas)