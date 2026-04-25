# DevTrack Project — Complete Learning Notes

---

# DAY 1–2: HTML + Structure

## What you learned

* Basic HTML structure
* Forms (input, select, button)
* IDs used for JavaScript interaction

## Key Concept

HTML provides structure only.

```html
<form id="dsa-form">
```

IDs are used to connect frontend with JavaScript logic.

---

# DAY 3: JavaScript Basics

## Concepts

* Variables (let, const)
* Functions
* Event listeners

```js
dsaForm.addEventListener("submit", function(event) {
```

## Why preventDefault?

Stops page reload and allows JS to control submission.

---

# DAY 4: DOM Manipulation

```js
document.getElementById("dsa-list")
const li = document.createElement("li");
parent.appendChild(child);
```

## Concept

JS dynamically updates UI using DOM.

---

# DAY 5: localStorage

```js
localStorage.setItem("key", JSON.stringify(data));
JSON.parse(localStorage.getItem("key"));
```

## Limitation

* Browser-only
* Not secure
* Not scalable

---

# DAY 6–7: Rendering + Delete

```js
data.forEach(...)
data.splice(index, 1);
```

## Concept

UI must always reflect data state.

---

# DAY 8: Refactoring

Created reusable functions:

* getData()
* saveData()

---

# DAY 9: Backend (Node + Express)

```js
const express = require("express");
const app = express();
```

Backend handles data and logic.

---

# DAY 10: APIs

```js
app.get("/dsa")
app.post("/dsa")
app.use(express.json());
```

---

# DAY 11: Temporary Storage

```js
let dsaEntries = [];
```

Not persistent → replaced by DB later.

---

# DAY 12: fetch() + Async

```js
fetch("/dsa")
```

Flow:

```text
Request → Wait → Response
```

---

# CORS

```js
app.use(cors());
```

Fixes browser cross-origin restrictions.

---

# FRONTEND ↔ BACKEND FLOW

```text
Form → fetch → API → DB → Response → UI
```

---

# DATABASE (MongoDB)

```js
new mongoose.Schema({...})
```

## Why?

* Persistent storage
* Real-world backend

---

# AUTHENTICATION (JWT)

## Token Creation

```js
jwt.sign({ userId }, secret, { expiresIn: "1d" })
```

## Verification

```js
jwt.verify(token, secret)
```

---

## Flow

```text
Login → JWT → Stored → Sent → Verified → Access
```

---

## Why JWT?

* Stateless
* Scalable
* Secure (signed)

---

# MIDDLEWARE

```js
function authMiddleware(req, res, next)
```

Used to protect routes.

---

# PASSWORD SECURITY (bcrypt)

```js
bcrypt.hash(password, 10)
bcrypt.compare(password, hash)
```

Never store plain passwords.

---

# OAUTH (GOOGLE LOGIN)

## Core Idea

```text
Google authenticates → Your backend authorizes
```

---

## Flow

```text
User → Google → ID Token → Backend → Verify → JWT
```

---

## Important Code

Frontend:

```js
response.credential
```

Backend:

```js
client.verifyIdToken(...)
```

Final:

```js
jwt.sign(...)
```

---

## Key Understanding

Google proves identity
Your system creates session

---

# UNIFIED AUTH SYSTEM

```text
Email login + Google login → Same JWT system
```

---

# USER MODEL

```js
provider: "local" | "google"
```

---

# SESSION MANAGEMENT

```js
expiresIn: "1d"
```

Frontend:

```js
if (res.status === 401) logout
```

---

# UI/UX IMPROVEMENTS

* Password toggle (eye icon)
* Fixed CSS conflicts
* Removed default button styles
* Dark mode (localStorage-based)
* Improved forms and layout
* SaaS-style auth pages
* Dashboard UI with stats + cards
* Premium multi-column footer

---

# DARK MODE

## Concept

```text
Toggle class → Save in localStorage → Apply on reload
```

---

# CLEAN CODE PRACTICES

* Centralized API handler (`fetchWithAuth`)
* Reusable functions
* Separation of concerns
* Defensive checks

---

# COMPLETE REQUEST FLOW

```text
User action
↓
Frontend JS
↓
fetch()
↓
Backend (Express)
↓
Middleware (auth)
↓
Database
↓
Response
↓
UI update
```

---

# SYSTEM DESIGN YOU BUILT

* Authentication → JWT + OAuth
* API → Express
* Database → MongoDB
* Frontend → DOM + fetch
* Security → bcrypt + JWT

---

# COMMON INTERVIEW QUESTIONS

## JWT

Q: Why not store userId directly?
A: Not secure. JWT is signed.

Q: What if JWT is modified?
A: Verification fails.

Q: Why JWT over sessions?
A: Stateless and scalable.

---

## OAuth

Q: Does Google log user into your app?
A: No. It only verifies identity.

Q: Why not use Google token directly?
A: Not meant for your API.

---

## Backend

Q: Why middleware?
A: Centralized logic for auth.

Q: What is CORS?
A: Browser security restriction.

---

# REAL ISSUES FACED

* JS ran before DOM loaded → fixed with DOMContentLoaded
* Button styling conflicts → fixed with CSS override
* CORS errors → fixed using middleware
* Token expiry → handled with 401 logout
* OAuth confusion → clarified Google vs JWT

---

# CURRENT STATE

You now have:

* Full-stack app ✔
* MongoDB ✔
* JWT auth ✔
* Google OAuth ✔
* Dark mode ✔
* Dashboard ✔
* Clean UI ✔

---

# KEY MENTAL MODEL

```text
Frontend = UI
Backend = Logic
Database = Storage
JWT = Identity
OAuth = External identity
fetch = communication
```

---

# FINAL TAKEAWAY

You didn’t just build features.
You built a complete authentication + data system used in real applications.

---

# NEXT LEARNING PATH

* Filters & search
* Pagination
* Next.js
* TypeScript
* Deployment
* System design

---

# END
