// Import required libraries
const express = require("express");   // Express → used to create server and APIs
const cors = require("cors");         // CORS → allows frontend to talk to backend
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect("mongodb://127.0.0.1:27017/devtrack")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// ===================== SCHEMA =====================
// Schema for storing user data (for authentication)
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema);

// DSA Schema
const dsaSchema = new mongoose.Schema({
    id: Number,
    problem: String,
    platform: String,
    difficulty: String,
    userId: String // 🔥 ADDED → to store which user owns this entry
});

const DSA = mongoose.model("DSA", dsaSchema);

const appSchema = new mongoose.Schema({
    id: Number,
    company: String,
    role: String,
    status: String,
    userId: String // 🔥 ADDED
});

const Application = mongoose.model("Application", appSchema);

// Create Express app
const app = express();

// Middleware
app.use(cors());          // Allows requests from different origins (frontend → backend)
app.use(express.json());  // Parses JSON data from request body


// ===================== SERVER START =====================

// Start server on port 3000
app.listen(3000, function () {
    console.log("Server started on port 3000");
});


// ===================== BASIC ROUTE =====================

// Homepage route (just to check server is running)
app.get("/", function (req, res) {
    res.send("Server running");
});

// User registration route
// For simplicity, we're not validating input here (not recommended for production)
const bcrypt = require("bcrypt");
// In production, you should validate email format, password strength, etc.
app.post("/register", async function (req, res) {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
		return res.status(400).send("Missing fields");
	}

    const existing = await User.findOne({ email });

    if (existing) {
        return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashedPassword
    });

    await user.save();

    res.send("User registered");
});

// User login route
const jwt = require("jsonwebtoken");

// For simplicity, we're not hashing passwords here (not recommended for production)
app.post("/login", async function (req, res) {

    const { email, password } = req.body;

    if (!email || !password) {
		return res.status(400).send("Missing fields");
	}

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).send("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.json({ token });
});

// ===================== AUTH MIDDLEWARE =====================

function authMiddleware(req, res, next) {

    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).send("No token provided");
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // 🔥 contains userId

        next();
    } 
    catch (err) {

	if (err.name === "TokenExpiredError") {
		return res.status(401).send("Token expired");
	}

	return res.status(401).send("Invalid token");
}
}


// ===================== DSA ROUTES =====================

// GET → Fetch all DSA entries
app.get("/dsa", authMiddleware, async function (req, res) {

    // 🔥 ONLY fetch current user's data
    const data = await DSA.find({
        userId: req.user.userId
    });

    res.json(data);
});

// POST → Add new DSA entry
app.post("/dsa", authMiddleware, async function (req, res) {

    const entry = new DSA({
        ...req.body,
        userId: req.user.userId // 🔥 attach user
    });

    await entry.save();

    res.send("DSA entry saved");
});

// DELETE → Remove DSA entry by ID
app.delete("/dsa/:id", authMiddleware, async function (req, res) {

    const id = Number(req.params.id);

    // 🔥 delete ONLY if it belongs to user
    await DSA.deleteOne({
        id: id,
        userId: req.user.userId
    });

    res.send("Deleted successfully");
});

// PUT → Update existing DSA entry
app.put("/dsa/:id", authMiddleware, async function (req, res) {

    const id = Number(req.params.id);

    // 🔥 update ONLY user’s own data
    await DSA.updateOne(
        { id: id, userId: req.user.userId },
        req.body
    );

    res.send("Updated successfully");
});


// ===================== APPLICATION ROUTES =====================

// POST → Add new application
app.post("/applications", authMiddleware, async function (req, res) {

    const entry = new Application({
        ...req.body,
        userId: req.user.userId // 🔥 attach user
    });

    await entry.save();

    res.send("Application saved");
});

// GET → Fetch all applications
app.get("/applications", authMiddleware, async function (req, res) {

    // 🔥 filter by user
    const data = await Application.find({
        userId: req.user.userId
    });

    res.json(data);
});

// DELETE → Remove application by ID
app.delete("/applications/:id", authMiddleware, async function (req, res) {

    const id = Number(req.params.id);

    await Application.deleteOne({
        id: id,
        userId: req.user.userId
    });

    res.send("Deleted successfully");
});

// PUT → Update application by ID
app.put("/applications/:id", authMiddleware, async function (req, res) {

    const id = Number(req.params.id);

    await Application.updateOne(
        { id: id, userId: req.user.userId },
        req.body
    );

    res.send("Application updated");
});