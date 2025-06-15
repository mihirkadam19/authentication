# Advanced Authentication in MERN Stack

A full-stack authentication system built with the MERN stack (MongoDB, Express.js, React.js, Node.js) with Docker support.

## Features

- User registration and login
- Password hashing with bcrypt
- JWT (JSON Web Token) authentication
- MongoDB database integration
- Express.js backend with middleware
- React.js frontend with Vite
- Docker containerization
- Environment variable configuration
- Automatic timestamps for user data
- Email verification system
- Password reset functionality
- Protected routes
- Cookie-based authentication

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- dotenv for environment variables
- cookie-parser for handling cookies
- nodemon for development
- Docker for containerization
- Nodemailer for email services

### Frontend
- React.js with Vite
- React Router for navigation
- Axios for API requests

## Setup Instructions

### Local Development

1. Clone the repository
```bash
git clone https://github.com/mihirkadam19/authentication.git
cd authentication
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm ci
```

3. Environment variables:

Create the following environment files:

```env
# .env.development.local (for development)
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
GMAIL_SMTP_USER=your_gmail
GMAIL_SMTP_PASSWORD=your_app_password
API_TOKEN_MAILTRAP=your_mailtrap_token
```

```env
# .env.production.local (for production)
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
CLIENT_URL=your_production_url
GMAIL_SMTP_USER=your_gmail
GMAIL_SMTP_PASSWORD=your_app_password
API_TOKEN_MAILTRAP=your_mailtrap_token
```

4. Start the development servers
```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory)
npm run dev
```

### Docker Setup local

1. Build and run with Docker Compose
```bash
# Development environment
docker-compose -f .\dev.yml up --build

# Production environment
docker-compose -f .\prod.yml up --build
```

2. Or build and run individual containers
```bash
# Build backend
docker build -t auth-backend ./backend

# Run containers
docker run -p 5000:5000 auth-backend
```


## Frontend Build

To build the frontend for production:
```bash
cd frontend
npm run build
```
The build output will be in the `frontend/dist` directory.


## CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment.

### GitHub Actions Workflows

1. Backend Production Pipeline (`.github/workflows/backend-prod.yml`):
   - Manual trigger with optional commit SHA input
   - Builds Docker image using `backend/Dockerfile.prod`
   - Pushes to GHCR with two tags:
     - `latest`
     - Short SHA of the commit
   - Uses GitHub's built-in TOKEN for authentication
   - Backend Docker container is deployed to Render.com with GHCR integration
   - Deployed at: [here](https://backend-latest-n7zg.onrender.com)

2. Frontend S3 Deployment (`.github/workflows/frontend-s3.yml`):
   - Manual trigger with optional commit SHA input
   - Uses Node.js 22.13.1
   - Installs dependencies with `npm ci`
   - Builds the frontend
   - Deploys to AWS S3 bucket
   - Required secrets:
     - `AWS_ACCESS_KEY_ID`
     - `AWS_SECRET_ACCESS_KEY`
     - `AWS_REGION`
     - `S3_BUCKET_NAME`
   - Deployed at: [here](http://adv-auth-frontend-mihirkadam19.s3-website-us-east-1.amazonaws.com)

3. Frontend Vercel Deployment:
   - Automatic deployment on push to main branch
   - Only triggers when changes are detected in frontend directory using:
     ```bash
     [ -z "$(git diff --name-only HEAD^ HEAD | grep '^frontend/')" ]
     ```
   - Builds and deploys directly to Vercel
   - Deployed at: [here](https://authentication-jet-nu.vercel.app/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.