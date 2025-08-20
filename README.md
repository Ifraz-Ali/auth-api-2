# Authentication API Integration

This Next.js application integrates with the authentication API at `https://os-project-server.vercel.app/auth/` to provide a complete user authentication system.

## Features

- **User Registration**: Create new user accounts with username, email, and password
- **User Login**: Authenticate users with email and password
- **Password Reset**: OTP-based password reset functionality
- **User Directory**: View all registered users

## API Endpoints Integrated

### 1. User Registration
- **URL**: `POST /auth/newuser`
- **Description**: Register a new user
- **Request Body**: 
  ```json
  {
    "username": "string",
    "email": "string", 
    "password": "string"
  }
  ```
- **Response**: Success message or error details

### 2. User Login
- **URL**: `POST /auth/existinguser`
- **Description**: Authenticate existing user
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**: 
  ```json
  {
    "token": "string"
  }
  ```

### 3. Get All Users
- **URL**: `GET /auth/users`
- **Description**: Retrieve all registered users
- **Response**: Array of user objects
  ```json
  [
    {
      "username": "string",
      "email": "string",
      "createdAt": "2025-08-20T17:39:20.299Z"
    }
  ]
  ```

### 4. Send OTP
- **URL**: `POST /auth/send-otp`
- **Description**: Send OTP for password reset
- **Request Body**:
  ```json
  {
    "email": "string"
  }
  ```
- **Response**: Success message

### 5. Reset Password
- **URL**: `POST /auth/reset-password`
- **Description**: Reset password using OTP
- **Request Body**:
  ```json
  {
    "email": "string",
    "otp": "string",
    "newPassword": "string"
  }
  ```
- **Response**: Success message

## Pages

### 1. Home Page (`/`)
- Login form for existing users
- Link to registration page
- Dashboard for authenticated users with user info and quick actions

### 2. Registration Page (`/register`)
- User registration form
- Password confirmation
- Success feedback and auto-redirect

### 3. Reset Password Page (`/reset-password`)
- Three-step password reset process:
  1. Enter email to receive OTP
  2. Enter OTP for verification
  3. Set new password

### 4. Users Directory (`/users`)
- Display all registered users in a table
- User count and join dates
- Error handling and retry functionality

## Technical Implementation

### Authentication Context (`src/app/lib/auth-context.ts`)
- React context for global auth state
- Token management with localStorage
- Login and registration functionality with direct API calls
- Error handling and loading states

### Type Definitions (`src/app/lib/type.ts`)
- TypeScript interfaces for all API requests/responses
- User, authentication, and error types

### Direct API Integration
- Each component makes API calls directly using `fetch()`
- No centralized API client - endpoints are called where needed
- Consistent error handling across all components

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Usage

1. **Register a new account** by clicking "Sign up" on the login page
2. **Login** with your email and password
3. **View all users** in the users directory
4. **Reset your password** if needed using the OTP system

## Error Handling

The application includes comprehensive error handling:
- Network errors
- API validation errors
- Duplicate email registration
- Invalid OTP codes
- User not found scenarios

## Security Features

- Password confirmation on registration
- OTP-based password reset
- Token-based authentication
- Secure error messages (no sensitive data exposure)

## API Response Codes

- **200**: Success
- **201**: User registered successfully
- **400**: Bad request (missing fields)
- **401**: Authentication failed
- **404**: User not found
- **500**: Internal server error

## Development Notes

- The API doesn't provide user profile endpoints, so user data is minimal after login
- JWT tokens are stored in localStorage for persistence
- All API calls are made directly in components using fetch()
- The UI is responsive and includes loading indicators
- TypeScript is used throughout for type safety
- No centralized API client - each component handles its own API calls
