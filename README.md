# 🚀 DevTrack

DevTrack is a full-stack developer productivity application that helps users track their DSA progress and job applications in one place.

Built with a focus on real-world architecture, it demonstrates modern authentication systems, API design, and clean frontend–backend integration.

---

## 🌟 Why DevTrack?

Preparing for placements requires consistency and organization.

DevTrack solves this by providing:

* A structured way to track DSA problems
* A centralized job application tracker
* A clean dashboard to monitor progress

---

## ✨ Features

### 🔐 Authentication

* User registration and login (email/password)
* Google OAuth 2.0 integration
* Password hashing using bcrypt
* JWT-based authentication system
* Token expiration handling (expiresIn)
* Protected routes using middleware
* User-specific data isolation
* Automatic logout on token expiry (401 handling)
* Manual logout functionality
* Unified auth flow (Google + email)

---

### 📊 DSA Tracker

* Add problems (name, platform, difficulty)
* Edit and delete entries
* View all solved problems
* Data scoped per user

---

### 💼 Application Tracker

* Track job applications
* Update application status
* Delete entries
* Organized per-user view

---

### 🎨 UI/UX

* Clean, responsive interface
* SaaS-style authentication pages
* Password visibility toggle (👁)
* Smooth hover interactions
* Google login integration
* 🌙 Dark mode with persistence (localStorage)
* Sticky glassmorphism navbar
* Premium multi-column footer

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

* JWT (JSON Web Tokens)
* bcrypt
* Google OAuth 2.0

---

## 📁 Project Structure

```bash
DevTrack/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
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

Create `.env` file:

```env
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
```

Start server:

```bash
npm run dev
```

Runs on:

```
http://localhost:3000
```

---

### 3️⃣ Frontend Setup

⚠️ Do NOT use file://

```bash
npx serve frontend
```

Open:

```
http://localhost:5500/login.html
```

---

## 🔄 How It Works

### Email Authentication

1. User logs in → JWT issued
2. Token stored in localStorage
3. Token sent with API requests
4. Backend verifies token
5. Authorized data returned

---

### Google OAuth Flow

```text
User clicks Google Login
        ↓
Google authenticates user
        ↓
Frontend receives ID token
        ↓
Backend verifies token
        ↓
User created/fetched
        ↓
JWT issued
        ↓
User logged in
```

---

## 🔐 Authentication Flow

```text
Login (Email / Google)
        ↓
JWT Issued
        ↓
Stored in LocalStorage
        ↓
Request → Backend verifies
        ↓
Access / Expiry handling
```

---

## ⚡ Architecture Highlights

* Centralized API handler (`fetchWithAuth`)
* Unified auth system (OAuth + JWT)
* Stateless session management
* Middleware-based route protection
* User-level data isolation
* Persistent UI state (dark mode)
* Clean separation of concerns

---

## 📌 Current Limitations

* No refresh token system
* OAuth limited to Google
* No frontend framework yet
* Basic backend validation

---

## 🚀 Future Improvements

* Refresh tokens
* GitHub OAuth
* Next.js migration
* Docker support
* Analytics dashboard (streaks, insights)
* Pagination & filtering
* Rate limiting & caching
* Deployment (Vercel + backend hosting)

---

## 📈 Learning Outcomes

This project demonstrates:

* Full-stack development workflow
* REST API design
* JWT authentication systems
* OAuth integration
* Secure password handling
* MongoDB data modeling
* Frontend–backend integration
* Session lifecycle handling
* Real-world system design fundamentals

---

## 👨‍💻 Author

Aditya Raj

---

## ⭐ Support

If you found this useful, consider giving it a star ⭐
