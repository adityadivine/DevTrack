// ===================== HELPER =====================
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

// ===================== LOGIN =====================

const form = document.getElementById("login-form");

if (form) {

    const togglePassword = document.getElementById("toggle-password");
	const passwordInput = document.getElementById("password");

	if (togglePassword && passwordInput) {
		togglePassword.addEventListener("click", function () {
			if (passwordInput.type === "password") {
				passwordInput.type = "text";
				togglePassword.textContent = "🙈";
			} else {
				passwordInput.type = "password";
				togglePassword.textContent = "👁";
			}
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
			headers: {
				"Content-Type": "application/json"
			},
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
		const emailError = document.getElementById("email-error");

		emailError.textContent = isValidEmail(this.value)
			? ""
			: "Invalid email format";
	});

	document.getElementById("password").addEventListener("input", function () {
		const passwordError = document.getElementById("password-error");

		if (!this.value) {
			passwordError.textContent = "";
            passwordError.style.color = "#e84118";
			return;
		}

		passwordError.textContent = isStrongPassword(this.value)
			? "Strong password ✔"
			: "Weak password";

		passwordError.style.color = isStrongPassword(this.value)
			? "green"
			: "#e84118";
	});

        // Toggle main password
    const togglePassword = document.getElementById("toggle-password");
    const passwordInput = document.getElementById("password");

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener("click", function () {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                togglePassword.textContent = "🙈";
            } else {
                passwordInput.type = "password";
                togglePassword.textContent = "👁";
            }
        });
    }

    // Toggle confirm password
    const toggleConfirm = document.getElementById("toggle-confirm");
    const confirmInput = document.getElementById("confirm-password");

    if (toggleConfirm && confirmInput) {
        toggleConfirm.addEventListener("click", function () {
            if (confirmInput.type === "password") {
                confirmInput.type = "text";
                toggleConfirm.textContent = "🙈";
            } else {
                confirmInput.type = "password";
                toggleConfirm.textContent = "👁";
            }
        });
    }
	registerForm.addEventListener("submit", function (event) {
		event.preventDefault();

		const name = document.getElementById("name").value.trim();
		const email = document.getElementById("email").value.trim();
		const password = document.getElementById("password").value.trim();
		const confirmPassword = document.getElementById("confirm-password").value.trim();

		const nameError = document.getElementById("name-error");
        const emailError = document.getElementById("email-error");
        const passwordError = document.getElementById("password-error");
        const confirmError = document.getElementById("confirm-error");

        nameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";
        confirmError.textContent = "";

        if (!name || !email || !password || !confirmPassword) {
            alert("Please fill all fields.");
            return;
        }

        if (!isValidEmail(email)) {
            emailError.textContent = "Enter a valid email (example: user@email.com)";
            return;
        }

        if (!isStrongPassword(password)) {
            passwordError.textContent = "Minimum 8 characters, include letters and numbers";
            return;
        }

        if (password !== confirmPassword) {
            confirmError.textContent = "Passwords do not match";
            return;
        }

		fetch("http://localhost:3000/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ name, email, password })
		})
		.then(() => {
			alert("Registered successfully");
			window.location.href = "login.html";
		})
		.catch(err => console.log(err));
	});
}

// ===================== PROTECT DASHBOARD =====================

if (window.location.pathname.includes("dashboard.html")) {
	if (!getToken()) {
		window.location.href = "login.html";
	}
}

// ===================== DSA FORM =====================

const dsaForm = document.getElementById("dsa-form");

if (dsaForm) {
	dsaForm.addEventListener("submit", function (event) {
		event.preventDefault();

		const problem = document.getElementById("problem").value.trim();
		const platform = document.getElementById("platform").value.trim();
		const difficulty = document.getElementById("difficulty").value;

		if (!problem || !platform || !difficulty) {
			alert("Please fill all fields.");
			return;
		}

		const dsaEntry = {
			id: Date.now(),
			problem,
			platform,
			difficulty
		};

		fetch("http://localhost:3000/dsa", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + getToken()
			},
			body: JSON.stringify(dsaEntry)
		})
		.then(() => renderDSA())
		.catch(err => console.log(err));

		dsaForm.reset();
	});
}

// ===================== APPLICATION FORM =====================

const appForm = document.getElementById("app-form");

if (appForm) {
	appForm.addEventListener("submit", function (event) {
		event.preventDefault();

		const company = document.getElementById("company").value.trim();
		const role = document.getElementById("role").value.trim();
		const status = document.getElementById("status").value;

		if (!company || !role || !status) {
			alert("Please fill all fields.");
			return;
		}

		const appEntry = {
			id: Date.now(),
			company,
			role,
			status
		};

		fetch("http://localhost:3000/applications", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + getToken()
			},
			body: JSON.stringify(appEntry)
		})
		.then(() => renderApps())
		.catch(err => console.log(err));

		appForm.reset();
	});
}

// ===================== RENDER DSA =====================

function renderDSA() {

	const list = document.getElementById("dsa-list");
	list.innerHTML = "";

	fetch("http://localhost:3000/dsa", {
		headers: {
			"Authorization": "Bearer " + getToken()
		}
	})
	.then(res => res.json())
	.then(data => {

		if (data.length === 0) {
			const li = document.createElement("li");
			li.textContent = "No DSA entries yet";
			list.appendChild(li);
			return;
		}

		data.forEach(item => {

			const li = document.createElement("li");

			const editBtn = document.createElement("button");
			editBtn.textContent = "Edit";

			const delBtn = document.createElement("button");
			delBtn.textContent = "Delete";

			delBtn.onclick = () => {
				fetch(`http://localhost:3000/dsa/${item.id}`, {
					method: "DELETE",
					headers: {
						"Authorization": "Bearer " + getToken()
					}
				}).then(renderDSA);
			};

			editBtn.onclick = () => {
				const updated = {
					problem: prompt("Problem:", item.problem),
					platform: prompt("Platform:", item.platform),
					difficulty: prompt("Difficulty:", item.difficulty)
				};

				fetch(`http://localhost:3000/dsa/${item.id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + getToken()
					},
					body: JSON.stringify(updated)
				}).then(renderDSA);
			};

			li.innerHTML = `<strong>${item.problem}</strong><br><small>${item.platform} • ${item.difficulty}</small>`;
			li.append(editBtn, delBtn);
			list.appendChild(li);
		});
	});
}

// ===================== RENDER APPLICATIONS =====================

function renderApps() {

	const list = document.getElementById("app-list");
	list.innerHTML = "";

	fetch("http://localhost:3000/applications", {
		headers: {
			"Authorization": "Bearer " + getToken()
		}
	})
	.then(res => res.json())
	.then(data => {

		if (data.length === 0) {
			const li = document.createElement("li");
			li.textContent = "No applications yet";
			list.appendChild(li);
			return;
		}

		data.forEach(item => {

			const li = document.createElement("li");

			const editBtn = document.createElement("button");
			editBtn.textContent = "Edit";

			const delBtn = document.createElement("button");
			delBtn.textContent = "Delete";

			delBtn.onclick = () => {
				fetch(`http://localhost:3000/applications/${item.id}`, {
					method: "DELETE",
					headers: {
						"Authorization": "Bearer " + getToken()
					}
				}).then(renderApps);
			};

			editBtn.onclick = () => {
				const updated = {
					company: prompt("Company:", item.company),
					role: prompt("Role:", item.role),
					status: prompt("Status:", item.status)
				};

				fetch(`http://localhost:3000/applications/${item.id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + getToken()
					},
					body: JSON.stringify(updated)
				}).then(renderApps);
			};

			li.innerHTML = `<strong>${item.company}</strong><br><small>${item.role} • ${item.status}</small>`;
			li.append(editBtn, delBtn);
			list.appendChild(li);
		});
	});
}

// ===================== INIT =====================

renderDSA();
renderApps();