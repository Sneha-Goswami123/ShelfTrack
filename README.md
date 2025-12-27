# 📚 ShelfTrack – Book Management System

ShelfTrack is a full-stack Book Management System built using **Node.js, Express, MongoDB, and Bootstrap**, featuring **JWT-based authentication** and **protected CRUD operations**.

---

## 🚀 Features

- User Registration & Login (JWT Authentication)
- Add, Update, Delete Books (Protected Routes)
- View Books (Public Route)
- Secure password hashing using bcrypt
- Token-based authorization using JWT
- Responsive UI with Bootstrap
- RESTful API design

---

## 🛠 Tech Stack

### Frontend
- HTML
- CSS
- Bootstrap
- JavaScript (Fetch API)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv

---

## 🔐 Authentication Flow

1. User registers or logs in
2. Backend generates JWT token
3. Token is stored in `localStorage`
4. Token is sent in `Authorization` header for protected APIs
5. Middleware verifies token before allowing access

---

## 📂 Project Structure

