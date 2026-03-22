# User Settings

Manage user account settings, preferences, privacy controls, and notifications.

## Get User Settings

### Endpoint

```http
GET /users/me/settings
Authorization: Bearer <token>
```

### Example Response

```json
{
  "success": true,
  "data": {
    "settings": {
      "account": {
        "email": "user@example.com",
        "username": "giftguru",
        "email_verified": true,
        "phone": "+1234567890",
        "phone_verified": false,
        "two_factor_enabled": false,
        "login_notifications": true
      },
      "privacy": {
        "profile_visibility": "public",
        "show_email": false,
        "show_phone": false,
        "show_location": true,
        "show_liked_ideas": true,
        "show_saved_ideas": false,
        "show_following": true,
        "show_followers": true,
        "allow_messages": "followers",
        "indexable_profile": true
      },
      "notifications": {
        "email": {
          "enabled": true,
          "frequency": "immediate",
          "types": {
            "new_follower": true,
            "idea_liked": true,
            "idea_commented": true,
            "idea_saved": false,
            "mention": true,
            "weekly_digest": true,
            "trending_ideas": false,
            "system_updates": true
          }
        },
        "push": {
          "enabled": false,
          "types": {
            "new_follower": false,
            "idea_liked": false,
            "idea_commented": false,
            "mention": true,
            "direct_message": true
          }
        },
        "in_app": {
          "enabled": true,
          "types": {
            "new_follower": true,
            "idea_liked": true,
            "idea_commented": true,
            "idea_saved": true,
            "mention": true,
            "system_updates": true
          }
        }
      },
      "content": {
        "default_idea_privacy": "public",
        "auto_save_drafts": true,
        "content_language": "en",
        "mature_content": false,
        "ai_suggestions": true,
        "analytics_tracking": true
      },
      "display": {
        "theme": "auto",
        "language": "en",
        "timezone": "America/Los_Angeles",
        "date_format": "MM/DD/YYYY",
        "currency": "USD",
        "measurement_unit": "imperial"
      },
      "api": {
        "rate_limit_tier": "standard",
        "api_keys_count": 2,
        "webhook_endpoints": 1,
        "last_api_access": "2026-03-22T16:25:00Z"
      }
    }
  },
  "message": "Settings retrieved successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Update Settings

### Update Account Settings

```http
PUT /users/me/settings/account
Authorization: Bearer <token>
```

```json
{
  "email": "newemail@example.com",
  "phone": "+1987654321",
  "login_notifications": false
}
```

### Update Privacy Settings

```http
PUT /users/me/settings/privacy
Authorization: Bearer <token>
```

```json
{
  "profile_visibility": "private",
  "show_liked_ideas": false,
  "allow_messages": "no_one",
  "indexable_profile": false
}
```

### Update Notification Settings

```http
PUT /users/me/settings/notifications
Authorization: Bearer <token>
```

```json
{
  "email": {
    "enabled": true,
    "frequency": "daily_digest",
    "types": {
      "new_follower": true,
      "idea_liked": false,
      "idea_commented": true,
      "weekly_digest": false
    }
  },
  "push": {
    "enabled": true,
    "types": {
      "mention": true,
      "direct_message": true
    }
  }
}
```

## Privacy Settings Options

### Profile Visibility

- `public` - Visible to everyone
- `followers` - Visible to followers only
- `private` - Visible to approved followers only

### Message Permissions

- `everyone` - Anyone can send messages
- `followers` - Only followers can send messages
- `mutual` - Only mutual followers can send messages
- `no_one` - No one can send messages

### Content Visibility

- `show_liked_ideas` - Show ideas you've liked
- `show_saved_ideas` - Show ideas you've saved
- `show_following` - Show who you follow
- `show_followers` - Show your followers
- `indexable_profile` - Allow search engines to index profile

## Notification Frequency Options

- `immediate` - Send notifications immediately
- `hourly_digest` - Send hourly summary
- `daily_digest` - Send daily summary at preferred time
- `weekly_digest` - Send weekly summary
- `disabled` - No notifications

## Two-Factor Authentication

### Enable 2FA

```http
POST /users/me/settings/2fa/enable
Authorization: Bearer <token>
```

### Example Response

```json
{
  "success": true,
  "data": {
    "setup_info": {
      "qr_code_url": "https://api.lovinideas.com/v1/users/me/2fa/qr",
      "secret_key": "JBSWY3DPEHPK3PXP",
      "backup_codes": [
        "12345678",
        "87654321",
        "11223344",
        "44332211",
        "55667788"
      ]
    },
    "next_step": "Scan QR code with authenticator app and verify with code"
  },
  "message": "2FA setup initiated",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

### Verify 2FA Setup

```http
POST /users/me/settings/2fa/verify
Authorization: Bearer <token>
```

```json
{
  "verification_code": "123456"
}
```

### Disable 2FA

```http
DELETE /users/me/settings/2fa
Authorization: Bearer <token>
```

```json
{
  "verification_code": "123456",
  "password": "current_password"
}
```

## API Keys Management

### Create API Key

```http
POST /users/me/settings/api-keys
Authorization: Bearer <token>
```

```json
{
  "name": "Mobile App Key",
  "permissions": ["read_ideas", "create_ideas", "manage_profile"],
  "expires_in_days": 365
}
```

### Example Response

```json
{
  "success": true,
  "data": {
    "api_key": {
      "id": "key_1234567890",
      "name": "Mobile App Key",
      "key": "liv_sk_1234567890abcdef...",
      "permissions": ["read_ideas", "create_ideas", "manage_profile"],
      "created_at": "2026-03-22T16:30:00Z",
      "expires_at": "2027-03-22T16:30:00Z",
      "last_used": null
    }
  },
  "message": "API key created successfully",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

### List API Keys

```http
GET /users/me/settings/api-keys
Authorization: Bearer <token>
```

### Revoke API Key

```http
DELETE /users/me/settings/api-keys/{key_id}
Authorization: Bearer <token>
```

## Data Export and Deletion

### Request Data Export

```http
POST /users/me/settings/export-data
Authorization: Bearer <token>
```

```json
{
  "data_types": ["profile", "ideas", "comments", "likes", "follows"],
  "format": "json",
  "include_deleted": false
}
```

### Example Response

```json
{
  "success": true,
  "data": {
    "export_request": {
      "id": "exp_1234567890",
      "status": "processing",
      "estimated_completion": "2026-03-22T17:00:00Z",
      "download_available_until": "2026-03-29T16:30:00Z"
    }
  },
  "message": "Data export initiated",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

### Delete Account

```http
DELETE /users/me
Authorization: Bearer <token>
```

```json
{
  "password": "current_password",
  "confirmation": "DELETE",
  "reason": "No longer using the service"
}
```

### Account Deletion Response

```json
{
  "success": true,
  "data": {
    "deletion_info": {
      "scheduled_for": "2026-03-29T16:30:00Z",
      "grace_period_days": 7,
      "data_retention": {
        "profile": "deleted_immediately",
        "ideas": "anonymized_after_7_days",
        "comments": "anonymized_after_7_days"
      }
    }
  },
  "message": "Account deletion scheduled",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Webhooks Configuration

### Create Webhook

```http
POST /users/me/settings/webhooks
Authorization: Bearer <token>
```

```json
{
  "url": "https://myapp.com/webhooks/lovinideas",
  "events": ["idea.liked", "idea.commented", "user.followed"],
  "secret": "webhook_secret_key_123"
}
```

### List Webhooks

```http
GET /users/me/settings/webhooks
Authorization: Bearer <token>
```

### Update Webhook

```http
PUT /users/me/settings/webhooks/{webhook_id}
Authorization: Bearer <token>
```

### Delete Webhook

```http
DELETE /users/me/settings/webhooks/{webhook_id}
Authorization: Bearer <token>
```

## Error Responses

### Invalid Settings (400 Bad Request)

```json
{
  "success": false,
  "error": {
    "code": "INVALID_SETTINGS",
    "message": "Invalid settings provided",
    "details": {
      "profile_visibility": "Must be one of: public, followers, private",
      "email": "Invalid email format"
    }
  },
  "timestamp": "2026-03-22T16:30:00Z"
}
```

### 2FA Required (403 Forbidden)

```json
{
  "success": false,
  "error": {
    "code": "2FA_REQUIRED",
    "message": "Two-factor authentication required for this action",
    "details": {
      "action": "change_email",
      "setup_2fa_url": "/users/me/settings/2fa/enable"
    }
  },
  "timestamp": "2026-03-22T16:30:00Z"
}
```

## Settings Validation

### Email Change Verification

When changing email, a verification is required:

```json
{
  "success": true,
  "data": {
    "verification_required": true,
    "verification_sent_to": "newemail@example.com",
    "expires_at": "2026-03-22T17:30:00Z"
  },
  "message": "Email change verification sent",
  "timestamp": "2026-03-22T16:30:00Z"
}
```

### Password Requirements

When changing password:

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter  
- At least one number
- At least one special character

## cURL Examples

### Get Settings

```bash
curl "https://api.lovinideas.com/v1/users/me/settings" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Update Privacy Settings

```bash
curl -X PUT "https://api.lovinideas.com/v1/users/me/settings/privacy" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "profile_visibility": "followers",
    "show_liked_ideas": false
  }'
```

### Enable 2FA

```bash
curl -X POST "https://api.lovinideas.com/v1/users/me/settings/2fa/enable" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Create API Key

```bash
curl -X POST "https://api.lovinideas.com/v1/users/me/settings/api-keys" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "name": "Mobile App Key",
    "permissions": ["read_ideas", "create_ideas"]
  }'
```

## Best Practices

1. **Regular Review**: Review settings periodically
2. **Strong Security**: Enable 2FA for enhanced security
3. **Privacy Awareness**: Understand privacy implications
4. **API Key Security**: Keep API keys secure and rotate regularly
5. **Notification Management**: Configure notifications to avoid spam
6. **Data Backup**: Export data before making major changes