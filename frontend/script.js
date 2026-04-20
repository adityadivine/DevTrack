
// ===================== HELPERS =====================

function isValidEmail(email) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
}

function isStrongPassword(password) {
	const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
	return regex.test(password);
}

function getToken() {
	return localStorage.getItem("token");
}

// ===================== API HANDLER =====================

function fetchWithAuth(url, options = {}) {
	const token = getToken();

	return fetch(url, {
		...options,
		headers: {
			...(options.headers || {}),
			"Authorization": "Bearer " + token
		}
	})
	.then(res => {
		if (res.status === 401) {
			localStorage.removeItem("token");
			window.location.href = "login.html";
			throw new Error("Unauthorized");
		}
		return res.json();
	});
}

// ===================== LOGIN =====================

const form = document.getElementById("login-form");

if (form) {

	const togglePassword = document.getElementById("toggle-password");
	const passwordInput = document.getElementById("password");

	if (togglePassword && passwordInput) {
		togglePassword.addEventListener("click", function () {
			passwordInput.type =
				passwordInput.type === "password" ? "text" : "password";
			togglePassword.textContent =
				passwordInput.type === "text" ? "🙈" : "👁";
		});
	}

	form.addEventListener("submit", function (event) {
		event.preventDefault();

		const email = document.getElementById("email").value.trim();
		const password = document.getElementById("password").value.trim();

		if (!email || !password) {
			alert("Please fill all fields.");
			return;
		}

		if (!isValidEmail(email)) {
			alert("Enter a valid email.");
			return;
		}

		fetch("http://localhost:3000/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password })
		})
		.then(res => {
			if (!res.ok) throw new Error("Login failed");
			return res.json();
		})
		.then(data => {
			localStorage.setItem("token", data.token);
			window.location.href = "dashboard.html";
		})
		.catch(() => alert("Invalid credentials"));
	});
}

// ===================== REGISTER =====================

const registerForm = document.getElementById("register-form");

if (registerForm) {

	document.getElementById("email").addEventListener("input", function () {
		document.getElementById("email-error").textContent =
			isValidEmail(this.value) ? "" : "Invalid email format";
	});

	document.getElementById("password").addEventListener("input", function () {
		const error = document.getElementById("password-error");

		if (!this.value) {
			error.textContent = "";
			error.style.color = "#e84118";
			return;
		}

		const strong = isStrongPassword(this.value);
		error.textContent = strong ? "Strong password ✔" : "Weak password";
		error.style.color = strong ? "green" : "#e84118";
	});

	const togglePassword = document.getElementById("toggle-password");
	const passwordInput = document.getElementById("password");

	if (togglePassword && passwordInput) {
		togglePassword.addEventListener("click", function () {
			passwordInput.type =
				passwordInput.type === "password" ? "text" : "password";
			togglePassword.textContent =
				passwordInput.type === "text" ? "🙈" : "👁";
		});
	}

	const toggleConfirm = document.getElementById("toggle-confirm");
	const confirmInput = document.getElementById("confirm-password");

	if (toggleConfirm && confirmInput) {
		toggleConfirm.addEventListener("click", function () {
			confirmInput.type =
				confirmInput.type === "password" ? "text" : "password";
			toggleConfirm.textContent =
				confirmInput.type === "text" ? "🙈" : "👁";
		});
	}

	registerForm.addEventListener("submit", function (event) {
		event.preventDefault();

		const name = document.getElementById("name").value.trim();
		const email = document.getElementById("email").value.trim();
		const password = document.getElementById("password").value.trim();
		const confirmPassword = document.getElementById("confirm-password").value.trim();

		if (!name || !email || !password || !confirmPassword) {
			alert("Please fill all fields.");
			return;
		}

		if (!isValidEmail(email)) {
			document.getElementById("email-error").textContent =
				"Enter a valid email";
			return;
		}

		if (!isStrongPassword(password)) {
			document.getElementById("password-error").textContent =
				"Min 8 chars with letters & numbers";
			return;
		}

		if (password !== confirmPassword) {
			document.getElementById("confirm-error").textContent =
				"Passwords do not match";
			return;
		}

		fetch("http://localhost:3000/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email, password })
		})
		.then(() => {
			alert("Registered successfully");
			window.location.href = "login.html";
		});
	});
}

// ===================== PROTECT DASHBOARD =====================

if (window.location.pathname.includes("dashboard.html")) {
	if (!getToken()) {
		window.location.href = "login.html";
	}
}

// ===================== LOGOUT =====================

function logout() {
	localStorage.removeItem("token");
	window.location.href = "login.html";
}

// ===================== DSA =====================

const dsaForm = document.getElementById("dsa-form");

if (dsaForm) {
	dsaForm.addEventListener("submit", function (e) {
		e.preventDefault();

		const data = {
			id: Date.now(),
			problem: problem.value,
			platform: platform.value,
			difficulty: difficulty.value
		};

		fetchWithAuth("http://localhost:3000/dsa", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		}).then(renderDSA);

		dsaForm.reset();
	});
}

// ===================== APPLICATIONS =====================

const appForm = document.getElementById("app-form");

if (appForm) {
	appForm.addEventListener("submit", function (e) {
		e.preventDefault();

		const data = {
			id: Date.now(),
			company: company.value,
			role: role.value,
			status: status.value
		};

		fetchWithAuth("http://localhost:3000/applications", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		}).then(renderApps);

		appForm.reset();
	});
}

// ===================== RENDER =====================

function renderDSA() {
	const list = document.getElementById("dsa-list");
	if (!list) return;

	list.innerHTML = "";

	fetchWithAuth("http://localhost:3000/dsa").then(data => {
		data.forEach(item => {

			const li = document.createElement("li");

			const edit = document.createElement("button");
			edit.textContent = "Edit";

			const del = document.createElement("button");
			del.textContent = "Delete";

			del.onclick = () =>
				fetchWithAuth(`http://localhost:3000/dsa/${item.id}`, {
					method: "DELETE"
				}).then(renderDSA);

			edit.onclick = () =>
				fetchWithAuth(`http://localhost:3000/dsa/${item.id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						problem: prompt("Problem:", item.problem),
						platform: prompt("Platform:", item.platform),
						difficulty: prompt("Difficulty:", item.difficulty)
					})
				}).then(renderDSA);

			li.innerHTML = `<strong>${item.problem}</strong><br><small>${item.platform} • ${item.difficulty}</small>`;
			li.append(edit, del);
			list.appendChild(li);
		});
	});
}

function renderApps() {
	const list = document.getElementById("app-list");
	if (!list) return;

	list.innerHTML = "";

	fetchWithAuth("http://localhost:3000/applications").then(data => {
		data.forEach(item => {

			const li = document.createElement("li");

			const edit = document.createElement("button");
			const del = document.createElement("button");

			edit.textContent = "Edit";
			del.textContent = "Delete";

			del.onclick = () =>
				fetchWithAuth(`http://localhost:3000/applications/${item.id}`, {
					method: "DELETE"
				}).then(renderApps);

			edit.onclick = () =>
				fetchWithAuth(`http://localhost:3000/applications/${item.id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						company: prompt("Company:", item.company),
						role: prompt("Role:", item.role),
						status: prompt("Status:", item.status)
					})
				}).then(renderApps);

			li.innerHTML = `<strong>${item.company}</strong><br><small>${item.role} • ${item.status}</small>`;
			li.append(edit, del);
			list.appendChild(li);
		});
	});
}

// ===================== INIT =====================

if (document.getElementById("dsa-list")) {
	renderDSA();
}

if (document.getElementById("app-list")) {
	renderApps();
}

// ===================== GOOGLE LOGIN =====================

window.onload = function () {

	const el = document.getElementById("google-btn");
	if (!el) return;

	google.accounts.id.initialize({
		client_id: "687404951517-hjh5oo43hd3mlbba5j2gnn5d1149i01n.apps.googleusercontent.com",
		callback: handleGoogleLogin
	});

	google.accounts.id.renderButton(el, {
		theme: "outline",
		size: "large"
	});
};

function handleGoogleLogin(response) {

	const googleToken = response.credential;

	fetch("http://localhost:3000/auth/google", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ token: googleToken })
	})
	.then(res => {
		if (!res.ok) throw new Error("Google login failed");
		return res.json();
	})
	.then(data => {
		localStorage.setItem("token", data.token);
		window.location.href = "dashboard.html";
	})
	.catch(() => alert("Google login failed"));
}

