# DevTrack Project — Complete Learning Notes

This document explains everything you have built step-by-step, from basics to full-stack concepts.

---

# DAY 1–2: HTML + Structure

## What you learned

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

Goal:
Cleaner code and reuse

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

# Applications Module

Same pattern as DSA:

* POST
* GET
* Render

---

# CURRENT STATE (~70%)

You have:

* Frontend ✔
* Backend ✔
* API ✔
* Data flow ✔

---

# NEXT: DELETE API

## Problem

No unique identifier

## Solution

```
id: Date.now()
```

## Backend

```
app.delete("/dsa/:id")
```

## Frontend

Call DELETE via fetch

---

# FUTURE STEPS

## MongoDB

Permanent storage

## Authentication

Login system

## Next.js

Advanced frontend

## Docker

Deployment

---

# FINAL UNDERSTANDING

You learned:

* DOM
* localStorage
* APIs
* fetch
* async
* CORS
* full-stack flow

---

# KEY MENTAL MODEL

```
Frontend = UI
Backend = Data + Logic
fetch = communication
```

---

# END
