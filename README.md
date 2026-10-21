# Full-Stack Authentication App

A full-stack authentication web application built with **React (Vite)**, **Express**, **MongoDB**, and **JWT** stored in HTTP-only cookies.

---

## Features

- **User Registration & Login:** Password hashing with `bcryptjs` and token generation with `jsonwebtoken`.
- **Cookie-Based Authentication:** Tokens stored securely in HTTP-only cookies.
- **Protected Routes:** Route guards with React Router preventing unauthorized access.
- **Seamless Page Refreshes:** Auth state persistence across browser reloads without unwanted redirects.
- **RESTful API:** Clean endpoint design using Express routers and controllers.

---

## Tech Stack

### Client
- **Framework:** React 19 with Vite
- **Routing:** React Router DOM (v7)
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios with `withCredentials: true`

### Server
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Security:** `bcryptjs`, `jsonwebtoken`, `cookie-parser`, `cors`

---

## Project Structure

```text
auth-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Navbar, ProtectedRoute
│   │   ├── context/        # AuthContext
│   │   ├── pages/          # Home, Login, Register
│   │   └── utils/          # Axios apiClient configuration
│   └── package.json
├── server/                 # Express backend
│   ├── config/             # Database connection
│   ├── controllers/        # Auth controllers (register, login, logout, checkAuth)
│   ├── middlewares/        # verifyToken middleware
│   ├── models/             # Mongoose User model
│   ├── routes/             # Auth routes
│   ├── server.js           # Server entry point
│   └── package.json
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB running locally or a MongoDB Atlas URI

---

### 1. Server Setup

1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/auth-app
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. Start the server in development mode:
   ```bash
   npm run dev
   ```
   *The server runs on `http://localhost:3000`.*

---

### 2. Client Setup

1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The client runs on `http://localhost:5173`.*

---

## API Endpoints

| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Login and receive auth cookie | No |
| `POST` | `/api/auth/logout` | Clear auth cookie | No |
| `GET` | `/api/auth/checkauth` | Verify token & return current user | Yes (via cookie) |
