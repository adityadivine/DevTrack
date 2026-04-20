
// ===================== IMPORTS =====================

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

require("dotenv").config();

// ===================== DB CONNECTION =====================

mongoose.connect("mongodb://127.0.0.1:27017/devtrack")
	.then(() => console.log("MongoDB connected"))
	.catch(err => console.log(err));

// ===================== SCHEMAS =====================

const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	provider: {
		type: String,
		default: "local" // local | google
	}
});

const User = mongoose.model("User", userSchema);

const dsaSchema = new mongoose.Schema({
	id: Number,
	problem: String,
	platform: String,
	difficulty: String,
	userId: String
});

const DSA = mongoose.model("DSA", dsaSchema);

const appSchema = new mongoose.Schema({
	id: Number,
	company: String,
	role: String,
	status: String,
	userId: String
});

const Application = mongoose.model("Application", appSchema);

// ===================== APP SETUP =====================

const app = express();
app.use(cors());
app.use(express.json());

// ===================== GOOGLE CLIENT =====================

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ===================== SERVER =====================

app.listen(3000, () => {
	console.log("Server running on port 3000");
});

app.get("/", (req, res) => {
	res.send("Server running");
});

// ===================== REGISTER =====================

app.post("/register", async (req, res) => {

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
		password: hashedPassword,
		provider: "local"
	});

	await user.save();

	res.send("User registered");
});

// ===================== LOGIN =====================

app.post("/login", async (req, res) => {

	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).send("Missing fields");
	}

	const user = await User.findOne({ email });

	if (!user) {
		return res.status(401).send("Invalid credentials");
	}

	// 🔥 BLOCK GOOGLE USERS FROM PASSWORD LOGIN
	if (user.provider === "google") {
		return res.status(400).send("Use Google login");
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

// ===================== GOOGLE AUTH =====================

app.post("/auth/google", async (req, res) => {

	const { token } = req.body;

	try {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.GOOGLE_CLIENT_ID
		});

		const payload = ticket.getPayload();

		const { email, name } = payload;

		let user = await User.findOne({ email });

		// CREATE USER IF NOT EXISTS
		if (!user) {
			user = new User({
				name,
				email,
				provider: "google"
			});
			await user.save();
		}

		// ISSUE YOUR JWT
		const jwtToken = jwt.sign(
			{ userId: user._id },
			process.env.JWT_SECRET,
			{ expiresIn: "1d" }
		);

		res.json({ token: jwtToken });

	} catch (err) {
		res.status(401).send("Invalid Google token");
	}
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
		req.user = decoded;
		next();
	} catch (err) {

		if (err.name === "TokenExpiredError") {
			return res.status(401).send("Token expired");
		}

		return res.status(401).send("Invalid token");
	}
}

// ===================== DSA ROUTES =====================

app.get("/dsa", authMiddleware, async (req, res) => {
	const data = await DSA.find({ userId: req.user.userId });
	res.json(data);
});

app.post("/dsa", authMiddleware, async (req, res) => {
	const entry = new DSA({
		...req.body,
		userId: req.user.userId
	});
	await entry.save();
	res.send("DSA entry saved");
});

app.delete("/dsa/:id", authMiddleware, async (req, res) => {
	await DSA.deleteOne({
		id: Number(req.params.id),
		userId: req.user.userId
	});
	res.send("Deleted");
});

app.put("/dsa/:id", authMiddleware, async (req, res) => {
	await DSA.updateOne(
		{ id: Number(req.params.id), userId: req.user.userId },
		req.body
	);
	res.send("Updated");
});

// ===================== APPLICATION ROUTES =====================

app.get("/applications", authMiddleware, async (req, res) => {
	const data = await Application.find({ userId: req.user.userId });
	res.json(data);
});

app.post("/applications", authMiddleware, async (req, res) => {
	const entry = new Application({
		...req.body,
		userId: req.user.userId
	});
	await entry.save();
	res.send("Saved");
});

app.delete("/applications/:id", authMiddleware, async (req, res) => {
	await Application.deleteOne({
		id: Number(req.params.id),
		userId: req.user.userId
	});
	res.send("Deleted");
});

app.put("/applications/:id", authMiddleware, async (req, res) => {
	await Application.updateOne(
		{ id: Number(req.params.id), userId: req.user.userId },
		req.body
	);
	res.send("Updated");
});

