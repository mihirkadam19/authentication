# API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/check-auth` - Check authentication status (protected)
- `POST /api/auth/verify-email` - Verify email
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password

## Email Configuration
The application supports two methods for sending emails:

1. Gmail SMTP
   - Uses nodemailer with Gmail SMTP
   - Requires Gmail account credentials
   - Environment variables:
     - `GMAIL_SMTP_USER`
     - `GMAIL_SMTP_PASSWORD`

2. Mailtrap
   - Uses Mailtrap for email testing
   - Prevents emails from reaching real inboxes
   - Environment variable:
     - `API_TOKEN_MAILTRAP`

## JWT Authentication
- JWT tokens are stored in HTTP-only cookies
- Token contains user ID in payload
- Token expiration: 4 days
- Security features:
  - HTTP-only cookies to prevent XSS attacks
  - Secure flag enabled in production (HTTPS only)
  - Strict same-site policy to prevent CSRF attacks
- Protected routes use verifyToken middleware to:
  - Extract token from cookies
  - Verify token signature
  - Add userId to request object
  - Handle unauthorized/invalid tokens 