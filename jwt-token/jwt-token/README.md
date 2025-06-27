# JWT Auth Training API

A simple Express.js REST API for authentication training, using JWTs and JSON file storage. Includes both public and private resources, with full JWT-based auth (access and refresh tokens).

## Features
- Register, login, refresh, and logout endpoints
- Access and refresh tokens (JWT)
- User and token data stored in JSON files
- Public and private resource endpoints
- No user id in URL; user context from JWT

## Getting Started
1. Clone the repo and install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   node src/app.js
   ```
   The server runs on `http://localhost:3000` by default.

---

## Endpoints

### Register
- **POST /auth/register**
- **Body:**
  ```json
  {
    "username": "johndoe",
    "password": "yourpassword",
    "fullName": "John Doe"
  }
  ```
- **Response:**
  - `201 Created` on success
  - `409 Conflict` if user exists

### Login
- **POST /auth/login**
- **Body:**
  ```json
  {
    "username": "johndoe",
    "password": "yourpassword"
  }
  ```
- **Response:**
  ```json
  {
    "accessToken": "...",
    "refreshToken": "..."
  }
  ```

### Refresh Token
- **POST /auth/refresh**
- **Body:**
  ```json
  {
    "refreshToken": "..."
  }
  ```
- **Response:**
  ```json
  {
    "accessToken": "..."
  }
  ```

### Logout
- **POST /auth/logout**
- **Body:**
  ```json
  {
    "refreshToken": "..."
  }
  ```
- **Response:**
  ```json
  {
    "message": "Logged out"
  }
  ```

---

## Friend System (Read-Only)

Each user has a list of friends, and each friend can have posts and comments. You can only access your own friends' data.

### List Friends
- **GET /private/friends**
- **Headers:**
  - `Authorization: Bearer <accessToken>`
- **Response:**
  ```json
  [
    {
      "id": 2,
      "fullName": "Bob Brown",
      "phone": "+1987654321",
      "age": 27,
      "posts": [
        {
          "id": 1,
          "content": "Hello from Bob!",
          "comments": [
            { "id": 1, "author": "alice", "content": "Nice to see you here!" }
          ]
        }
      ]
    }
  ]
  ```

### Get a Single Friend
- **GET /private/friends/:friendId**
- **Headers:**
  - `Authorization: Bearer <accessToken>`
- **Response:**
  ```json
  {
    "id": 2,
    "fullName": "Bob Brown",
    "phone": "+1987654321",
    "age": 27,
    "posts": [ ... ]
  }
  ```

### Get Posts for a Friend
- **GET /private/friends/:friendId/posts**
- **Headers:**
  - `Authorization: Bearer <accessToken>`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "content": "Hello from Bob!",
      "comments": [ ... ]
    }
  ]
  ```

### Get Comments for a Post
- **GET /private/friends/:friendId/posts/:postId/comments**
- **Headers:**
  - `Authorization: Bearer <accessToken>`
- **Response:**
  ```json
  [
    { "id": 1, "author": "alice", "content": "Nice to see you here!" }
  ]
  ```

---

## Data Structure Example

Each user in `users.json` looks like:
```json
{
  "id": 1,
  "username": "alice",
  "password": "...",
  "fullName": "Alice Smith",
  "phone": "+1234567890",
  "age": 25,
  "friends": [
    {
      "id": 2,
      "fullName": "Bob Brown",
      "phone": "+1987654321",
      "age": 27,
      "posts": [
        {
          "id": 1,
          "content": "Hello from Bob!",
          "comments": [
            { "id": 1, "author": "alice", "content": "Nice to see you here!" }
          ]
        }
      ]
    }
  ]
}
```

- Only your own friends' data is accessible via these endpoints.
- One user (eve) has no friends, demonstrating the empty case.

---

## Notes
- All data is stored in `/src/data/*.json` files.
- Passwords are hashed with bcryptjs.
- Access token expires in 15 minutes. Refresh token expires in 7 days.
- No user id is ever sent in the URL; all user context is from the JWT payload.
- For private endpoints, send the access token as a Bearer token in the `Authorization` header.

---

## Next Steps
- Implement and document public/private resource endpoints.
- Add more error handling and validation as needed. 