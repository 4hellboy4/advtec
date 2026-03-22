# JWT Tokens

Understanding JWT token management in the LovInIdeas API.

## Token Structure

LovInIdeas uses JSON Web Tokens (JWT) for authentication. Each token contains:

```
Header.Payload.Signature
```

### Token Payload

```json
{
  "sub": "usr_1234567890",
  "email": "user@example.com",
  "username": "giftguru",
  "role": "user",
  "verified": true,
  "iat": 1711123800,
  "exp": 1711210200
}
```

| Field | Description |
|-------|-------------|
| `sub` | User ID (subject) |
| `email` | User's email address |
| `username` | User's username |
| `role` | User role (`user`, `moderator`, `admin`) |
| `verified` | Email verification status |
| `iat` | Token issued at (timestamp) |
| `exp` | Token expires at (timestamp) |

## Token Validation

### Verify Token

```http
GET /auth/verify
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "data": {
    "valid": true,
    "user_id": "usr_1234567890",
    "expires_in": 3600,
    "expires_at": "2026-03-22T17:30:00Z"
  },
  "message": "Token is valid",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

### Invalid Token Response

```json
{
  "success": false,
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Token is invalid or expired",
    "details": {
      "reason": "expired",
      "expired_at": "2026-03-22T15:30:00Z"
    }
  },
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Token Security

### Best Practices

1. **Store Securely**: Never store tokens in localStorage for sensitive apps
2. **Use HTTPS**: Always transmit tokens over encrypted connections
3. **Short Expiration**: Use shorter-lived tokens for better security
4. **Validate Server-Side**: Always verify tokens on your backend

### Token Storage Options

| Method | Security | Persistence | Recommended For |
|--------|----------|-------------|-----------------|
| Memory | High | Session only | High-security apps |
| HttpOnly Cookie | High | Configurable | Web applications |
| Secure Storage | Medium | Persistent | Mobile apps |
| localStorage | Low | Persistent | Not recommended |

## Token Expiration Handling

### Check Expiration

```javascript
function isTokenExpired(token) {
  const payload = JSON.parse(atob(token.split('.')[1]));
  return Date.now() >= payload.exp * 1000;
}
```

### Handle Expired Tokens

```javascript
async function makeAuthenticatedRequest(url, options = {}) {
  let token = getStoredToken();
  
  if (isTokenExpired(token)) {
    token = await refreshToken(); // Re-login
  }
  
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`
    }
  });
}
```

## Logout

### Logout Endpoint

```http
POST /auth/logout
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "data": null,
  "message": "Logged out successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

### Client-Side Logout

```javascript
function logout() {
  // Remove token from storage
  localStorage.removeItem('auth_token');
  
  // Optional: Call logout endpoint to invalidate token server-side
  fetch('/auth/logout', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  // Redirect to login page
  window.location.href = '/login';
}
```

## Error Codes

| Code | Description | Action Required |
|------|-------------|-----------------|
| `INVALID_TOKEN` | Token is malformed | Re-authenticate |
| `EXPIRED_TOKEN` | Token has expired | Login again |
| `REVOKED_TOKEN` | Token was revoked | Login again |
| `INSUFFICIENT_PERMISSIONS` | Token lacks required permissions | Check user role |

## Rate Limiting

Token validation endpoints have the following limits:

- **Token Verify**: 100 requests per minute per token
- **Logout**: 10 requests per minute per token

## Security Considerations

### Token Hijacking Prevention

- Use HTTPS only
- Implement proper CORS policies
- Set secure token storage
- Monitor for suspicious activity

### Token Rotation

For enhanced security, consider implementing token rotation:

1. Issue short-lived access tokens (15-30 minutes)
2. Provide refresh tokens for obtaining new access tokens
3. Rotate refresh tokens periodically

This feature may be added in future API versions.