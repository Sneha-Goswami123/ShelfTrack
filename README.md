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

## ▶️ How to Run Locally

### Prerequisites
Make sure you have the following installed:
- Node.js
- MongoDB (local) **or** MongoDB Atlas account

---

### Backend Setup

1. Navigate to the backend folder:
```bash
cd backend
```


### 📁 Project Structure

```ShelfTrack/
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection setup
│   ├── controllers/
│   │   ├── authController.js   # User login & registration logic
│   │   └── bookController.js   # CRUD operations for books
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT authentication middleware
│   ├── models/
│   │   ├── User.js             # User schema
│   │   └── Book.js             # Book schema
│   ├── routes/
│   │   ├── authRoutes.js       # Authentication routes
│   │   └── bookRoutes.js       # Book management routes
│   ├── .env                    # Environment variables (ignored in Git)
│   ├── app.js                  # Express app entry point
│   ├── package.json            # Backend dependencies
│   └── package-lock.json
│
├── frontend/
│   ├── index.html              # UI layout (Bootstrap)
│   └── script.js               # Frontend logic & API calls
│
├── .gitignore                  # Ignored files (node_modules, .env)
└── README.md                   # Project documentation
```




<p align="center">
  Made with ❤️ by <b>Sneha Goswami</b>
</p>

