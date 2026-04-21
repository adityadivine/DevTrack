# DevTrack Project — Complete Learning Notes

---

# DAY 1–2: HTML + Structure



* Basic HTML structure
* Forms (input, select, button)
* IDs and how they are used in JavaScript

## Key Concept

HTML is just structure. It does nothing on its own.

Example:

```
<form id="dsa-form">
```

👉 ID is important because JS uses it to select elements.

---

# DAY 3: JavaScript Basics (Applied)

## Concepts used

* Variables (const, let)
* Functions
* Event listeners

## Event Listener

```
dsaForm.addEventListener("submit", function(event) {
```

### Why needed?

* Browser refreshes page on form submit by default
* `event.preventDefault()` stops that

---

# DAY 4: DOM Manipulation

## Selecting elements

```
document.getElementById("dsa-list")
```

## Creating elements

```
const li = document.createElement("li");
```

## Adding to UI

```
parent.appendChild(child);
```

---

# DAY 5: localStorage

## What is localStorage?

Browser-based storage system.

## Store data

```
localStorage.setItem("key", JSON.stringify(data));
```

## Get data

```
JSON.parse(localStorage.getItem("key"));
```

## Limitation

* Only works in one browser
* Not shared across users
* Not secure

---

# DAY 6: Rendering Data

## Concept

UI should reflect data

## Flow

1. Get data
2. Loop
3. Create UI

```
data.forEach(item => {
    const li = document.createElement("li");
});
```

---

# DAY 7: Delete Logic (localStorage)

## Concept

Remove item from array

```
data.splice(index, 1);
```

Then:

```
saveData(...);
render();
```

---

# DAY 8: Refactoring

Created reusable functions:

* getData()
* saveData()

Goal: Cleaner and reusable code

---

# DAY 9: Backend Introduction

## What is backend?

A server that handles data

## Node.js

Runs JavaScript outside browser

## Express

Framework to create server

```
const express = require("express");
const app = express();
```

---

# DAY 10: API Creation

## GET

```
app.get("/dsa", ...)
```

## POST

```
app.post("/dsa", ...)
```

## Important

```
app.use(express.json());
```

👉 Required to read JSON body

---

# DAY 11: In-Memory Storage

```
let dsaEntries = [];
```

## Why?

Simulates database

## Limitation

Data lost on restart

---

# DAY 12: HTTP Requests + fetch()

## What is fetch?

Frontend → Backend communication

## GET

```
fetch("/dsa")
```

## POST

```
fetch("/dsa", {
  method: "POST",
  body: JSON.stringify(data)
})
```

---

# Async Concept

```
fetch(...)
.then(...)
.then(...)
```

## Meaning

* Send request
* Wait
* Receive response

---

# CORS (Critical Concept)

## Problem

Browser blocks cross-origin requests

## Origin = protocol + domain + port

## Example

```
file:// ≠ http://localhost:3000
```

## Fix

```
app.use(cors());
```

---

# FRONTEND ↔ BACKEND FLOW

```
Form → POST → Backend → Store
→ GET → Backend → UI
```

---

# DATABASE INTEGRATION (MongoDB)

## Problem

Data lost after server restart

## Solution

MongoDB + Mongoose

## Concept

```
const userSchema = new mongoose.Schema({...});
```

## Benefit

* Persistent storage
* Structured data
* Real-world backend

---

# AUTHENTICATION SYSTEM (JWT)

## What is JWT?

A token used to verify user identity.

## Token Creation

```
jwt.sign({ userId: user._id }, secret, { expiresIn: "1d" })
```

## Token Verification

```
jwt.verify(token, secret)
```

---

## JWT Flow

```
Login → JWT issued → stored in localStorage
        ↓
Frontend sends token with every request
        ↓
Backend verifies token
        ↓
Access granted / denied
```

---

## Why JWT?

* Stateless authentication
* No sessions required
* Scalable

---

## Middleware Concept

```
function authMiddleware(req, res, next)
```

👉 Runs before protected routes

---

# PASSWORD SECURITY (bcrypt)

## Why?

Never store plain passwords

## Hashing

```
bcrypt.hash(password, 10)
```

## Verification

```
bcrypt.compare(password, hashedPassword)
```

---

# OAUTH (GOOGLE LOGIN)

## What is OAuth?

External authentication using Google

---

## Key Concept

```
Google authenticates → Your backend authorizes
```

---

## Flow

```
User clicks Google login
        ↓
Google verifies user
        ↓
Frontend receives Google ID token
        ↓
Token sent to backend
        ↓
Backend verifies with Google
        ↓
User created/fetched
        ↓
YOUR JWT issued
```

---

## Important Code

### Frontend

```
response.credential
```

👉 Google ID token

---

### Backend

```
client.verifyIdToken(...)
```

👉 Verifies token authenticity

---

### Final Step

```
jwt.sign(...)
```

👉 Your system takes control

---

## Why not use Google token directly?

* Not secure for your API
* You need your own session system

---

# UNIFIED AUTH SYSTEM

You now have:

```
1. Email/Password login
2. Google OAuth login
        ↓
Both generate SAME JWT system
```

---

# USER MODEL IMPROVEMENT

```
provider: "local" | "google"
```

## Why?

* Avoid fake passwords
* Clean architecture

---

# SESSION MANAGEMENT

## Expiry Handling

```
expiresIn: "1d"
```

## Frontend Handling

```
if (res.status === 401) → logout
```

---

# UI/UX IMPROVEMENTS

## Password Toggle

* Eye icon inside input
* Absolute positioning
* Clean styling with CSS

## Fixes done

* Removed default button styles
* Fixed alignment issues
* Added hover animation (scale only)
* Removed unwanted blue background

---

# CLEAN CODE PRACTICES

* Centralized API handler (`fetchWithAuth`)
* Reusable functions
* Element existence checks
* Separation of concerns

---

# CURRENT STATE (ADVANCED)

You now have:

* Full-stack app ✔
* MongoDB integration ✔
* JWT authentication ✔
* Google OAuth ✔
* Protected routes ✔
* Clean UI ✔

---

# KEY MENTAL MODEL

```
Frontend = UI
Backend = Logic + Data
Database = Storage
JWT = Identity
OAuth = External identity provider
fetch = communication
```

---

# FINAL UNDERSTANDING

You have built:

* Real authentication system
* Production-style API
* Secure user handling
* Multi-auth architecture

---

# NEXT LEARNING PATH

* Filters, search, pagination
* Next.js
* TypeScript
* Deployment
* System design concepts

---

# END
