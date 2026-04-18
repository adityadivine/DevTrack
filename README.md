# 🚀 DevTrack

DevTrack is a full-stack web application designed to help developers track their Data Structures & Algorithms (DSA) progress and job applications in one place.

It demonstrates core full-stack concepts including API design, authentication, and database integration.

---

## ✨ Features

### 🔐 Authentication

* User registration and login
* JWT-based authentication
* Protected routes
* User-specific data isolation

### 📊 DSA Tracker

* Add problems (name, platform, difficulty)
* Edit entries
* Delete entries
* View all solved problems

### 💼 Application Tracker

* Track job applications
* Update application status
* Delete entries
* Organized view of applications

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

Server will run on:

```
http://localhost:3000
```

---

### 3️⃣ Frontend Setup

Open the frontend manually:

```text
frontend/login.html
```

(No build tools required)

---

## 🔄 How It Works

1. User logs in → receives JWT token
2. Token stored in browser (localStorage)
3. Every API request includes token
4. Backend verifies token
5. Only authorized user data is returned

---

## 🔐 Authentication Flow

```text
Login → JWT Issued → Stored in LocalStorage
        ↓
Request with Token → Backend Verifies
        ↓
Access Granted / Denied
```

---

## 📌 Current Limitations

* Passwords are stored in plain text (to be improved)
* No refresh tokens
* No OAuth integration yet

---

## 🚀 Future Improvements

* 🔒 Password hashing (bcrypt)
* 🌐 OAuth (Google / GitHub login)
* ⚛️ Next.js migration
* 🐳 Docker support
* 📱 Responsive UI improvements

---

## 📈 Learning Outcomes

This project demonstrates:

* Full-stack development workflow
* REST API design
* Authentication using JWT
* MongoDB data modeling
* Frontend–backend integration

---

## 👨‍💻 Author

**Aditya Raj**

---

## ⭐ If you found this useful

Give it a star ⭐ and feel free to explore or contribute!
