# Advanced Authentication in MERN Stack

A full-stack authentication system built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User registration and login
- Password hashing with bcrypt
- JWT (JSON Web Token) authentication
- MongoDB database integration
- Express.js backend with middleware
- React.js frontend
- Environment variable configuration
- Automatic timestamps for user data

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- dotenv for environment variables
- cookie-parser for handling cookies
- nodemon for development

### Frontend
- React.js

## Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/mihirkadam19/authentication.git
```

2. Install dependencies
```bash
# Install all dependencies from package.json
npm install
```

3. Environment variables:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```

4. Start the development server
```bash
npm run dev
```

## API Endpoints

- `POST /api/auth/signup` - Register new user (username, email, password)

## Contributing

Feel free to submit issues and pull requests.