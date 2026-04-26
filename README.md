# 🚀 DevTrack

DevTrack is a full-stack web application designed to help developers track their Data Structures & Algorithms (DSA) progress and job applications in one place.

It demonstrates real-world full-stack concepts including authentication, API design, and user-specific data management. Below mentioned are the features:

---

## ✨ Features

### 🔐 Authentication

* User registration and login (email/password)
* Google OAuth 2.0 login integration
* Password hashing using bcrypt
* JWT-based authentication system
* Token expiration handling (expiresIn)
* Protected routes using middleware
* User-specific data isolation
* Automatic logout on token expiry (401 handling)
* Manual logout functionality
* Unified auth flow for both Google and email login

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

### 🎨 UI/UX Improvements

* Clean and responsive authentication UI
* Password visibility toggle (👁 with animation)
* Fixed alignment and styling issues
* Smooth hover interactions
* Google login button integration
* 🌙 Dark mode toggle with persistent theme (localStorage)

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
* Google OAuth 2.0 (google-auth-library)

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
│   ├── index.html
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
GOOGLE_CLIENT_ID=your_google_client_id
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

⚠️ Important: Do NOT open with file://

Use a local server (recommended):

```bash
# VS Code Live Server OR
npx serve frontend
```

Then open:

```
http://localhost:5500/login.html
```

---

## 🔄 How It Works

### Email Login Flow

1. User logs in → JWT token is issued
2. Token stored in browser (localStorage)
3. Every API request includes token
4. Backend verifies token
5. Only authorized user data is returned

---

### Google OAuth Flow

```text
User clicks "Sign in with Google"
        ↓
Google authenticates user
        ↓
Frontend receives Google ID token
        ↓
Token sent to backend (/auth/google)
        ↓
Backend verifies token with Google
        ↓
User created/fetched in DB
        ↓
Backend issues YOUR JWT
        ↓
Same dashboard flow continues
```

---

## 🔐 Authentication Flow

```text
Login (Email / Google)
        ↓
JWT Issued (with expiry)
        ↓
Stored in LocalStorage
        ↓
Request with Token → Backend Verifies
        ↓
Access Granted / Token Expired / Invalid
        ↓
Frontend auto logout on 401
```

---

## ⚡ Key Architectural Highlights

* Centralized API handler (fetchWithAuth)
* Unified authentication system (OAuth + JWT)
* Automatic session management via token expiry
* Clean separation of frontend and backend concerns
* User-level data isolation using userId
* Middleware-based route protection
* Provider-based auth system (local vs google)
* Persistent UI state management (dark mode via localStorage)

---

## 📌 Current Limitations

* No refresh token mechanism
* OAuth limited to Google only
* Frontend not using a modern framework yet
* Limited backend validation and sanitization

---

## 🚀 Future Improvements

* 🔁 Refresh tokens for better session handling
* 🌐 GitHub OAuth integration
* ⚛️ Migration to Next.js
* 🐳 Dockerization
* 📊 Analytics dashboard (streaks, insights)
* 📄 Pagination & filtering
* ⚡ Rate limiting & caching
* 🚀 Deployment (Vercel + backend hosting)
* 🎨 UI improvements (toasts, loaders, system theme detection)

---

## 📈 Learning Outcomes

This project demonstrates:

* Full-stack development workflow
* REST API design
* JWT-based authentication systems
* OAuth 2.0 integration (Google)
* Secure password handling with bcrypt
* MongoDB data modeling with Mongoose
* Frontend–backend integration
* Session lifecycle and token management
* Real-world authentication architecture
* UI state persistence (dark mode)

---

## 👨‍💻 Author

Aditya Raj

---

## ⭐ If you found this useful

Give it a star ⭐ and feel free to explore or contribute!
