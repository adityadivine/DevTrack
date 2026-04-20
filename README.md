# 🚀 DevTrack

DevTrack is a full-stack web application designed to help developers track their Data Structures & Algorithms (DSA) progress and job applications in one place.

It demonstrates real-world full-stack concepts including authentication, API design, and user-specific data management.

---

## ✨ Features

### 🔐 Authentication

* User registration and login
* Password hashing using bcrypt
* JWT-based authentication
* Token expiration handling (expiresIn)
* Protected routes using middleware
* User-specific data isolation
* Automatic logout on token expiry (401 handling)
* Manual logout functionality

---

### 📊 DSA Tracker

* Add problems (name, platform, difficulty)
* Edit entries
* Delete entries
* View all solved problems
* Data scoped to logged-in user

---

### 💼 Application Tracker

* Track job applications
* Update application status
* Delete entries
* Organized per-user view

---

## 🛠 Tech Stack

### Frontend

* HTML
* CSS
* JavaScript (Vanilla)

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

### Authentication

* JSON Web Tokens (JWT)
* bcrypt (password hashing)

---

## 📁 Project Structure

```bash
DevTrack/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env (ignored)
│
├── frontend/
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── script.js
│   └── style.css
│
├── .gitignore
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/adityadivine/DevTrack.git
cd DevTrack
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
JWT_SECRET=your_secret_key
```

Start the server:

```bash
npm run dev
```

Server runs on:

```
http://localhost:3000
```

---

### 3️⃣ Frontend Setup

Open directly in browser:

```text
frontend/login.html
```

(No build tools required)

---

## 🔄 How It Works

1. User logs in → JWT token is issued
2. Token stored in browser (localStorage)
3. Every API request includes token in Authorization header
4. Backend verifies token using middleware
5. Only authorized user data is returned

---

## 🔐 Authentication Flow

```text
Login → JWT Issued (with expiry) → Stored in LocalStorage
        ↓
Request with Token → Backend Verifies
        ↓
Access Granted / Token Expired / Invalid Token
        ↓
Frontend auto logout on 401
```

---

## ⚡ Key Architectural Highlights

* Centralized API handler (fetchWithAuth)
* Automatic session management via JWT expiry
* Clean separation of frontend and backend concerns
* User-level data isolation using userId
* Middleware-based route protection

---

## 📌 Current Limitations

* No refresh token mechanism
* No OAuth integration yet
* Frontend is not using a framework (React/Next.js)
* Limited validation on some backend routes

---

## 🚀 Future Improvements

* 🌐 OAuth (Google / GitHub login)
* 🔁 Refresh tokens for better session handling
* ⚛️ Migration to Next.js
* 🐳 Dockerization
* 📊 Analytics dashboard (streaks, insights)
* 📄 Pagination & filtering
* ⚡ Rate limiting & caching
* 🚀 Deployment (Vercel + backend hosting)

---

## 📈 Learning Outcomes

This project demonstrates:

* Full-stack development workflow
* REST API design
* Authentication using JWT
* Secure password handling with bcrypt
* MongoDB data modeling with Mongoose
* Frontend–backend integration
* Session management and token lifecycle handling

---

## 👨‍💻 Author

Aditya Raj

---

## ⭐ If you found this useful

Give it a star ⭐ and feel free to explore or contribute!
