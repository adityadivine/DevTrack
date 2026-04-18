// ===================== HELPER FUNCTIONS =====================

// Get data safely from localStorage
// function getData(key) {
//     try {
//         let data = localStorage.getItem(key);
//         return data ? JSON.parse(data) : [];
//     } catch {
//         return [];
//     }
// }

// Save data to localStorage
// function saveData(key, data) {
//     localStorage.setItem(key, JSON.stringify(data));
// }


// ===================== LOGIN =====================

const form = document.getElementById("login-form");

if (form) {
	form.addEventListener("submit", function (event) {
		event.preventDefault();

		const email = document.getElementById("email").value.trim();
		const password = document.getElementById("password").value.trim();

		if (!email) {
			alert("Please enter your email.");
			return;
		}

		if (!password) {
			alert("Please enter your password.");
			return;
		}

		window.location.href = "dashboard.html";
	});
}


// ===================== REGISTER =====================

const registerForm = document.getElementById("register-form");

if (registerForm) {
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

		if (password !== confirmPassword) {
			alert("Passwords do not match.");
			return;
		}

		window.location.href = "login.html";
	});
}


// ===================== DSA FORM =====================
// const dsaEntry = { problem, platform, difficulty };
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
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dsaEntry)
        })
        .then(response => response.text())
        .then(() => renderDSA())
        .catch(err => console.log(err));
        // alternatively, you can use axios if you prefer:
        // axios.post("http://localhost:3000/dsa", dsaEntry)
        // .then(res => console.log(res.data))
        // .catch(err => console.log(err));

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
		const appEntry = {
    id: Date.now(),
    company,
    role,
    status
};

        if (!company || !role || !status) {
            alert("Please fill all fields.");
            return;
        }

        // const appEntry = { company, role, status };

        // ❌ OLD localStorage (commented, not deleted)
        // let entries = getData("appEntries");
        // entries.push(appEntry);
        // saveData("appEntries", entries);

        // ✅ NEW backend call
        fetch("http://localhost:3000/applications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(appEntry)
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);

            showMessage("Application added successfully!");

            renderApps(); // refresh UI from backend
        })
        .catch(err => {
            console.log("Error:", err);
        });

        appForm.reset();
    });
}


// ===================== RENDER DSA =====================

function renderDSA() {

    // ❌ OLD localStorage (commented, not deleted)
    // let data = getData("dsaEntries");

    const DSAlist = document.getElementById("dsa-list");

    DSAlist.innerHTML = "";

    // ✅ NEW backend fetch
    fetch("http://localhost:3000/dsa")
    .then(response => response.json())
    .then(data => {

        if (data.length === 0) {
            const li = document.createElement("li");
            li.textContent = "No DSA entries yet";
            DSAlist.appendChild(li);
            return;
        }

        data.forEach(function(item, index) {

            const li = document.createElement("li");

            // ❌ OLD delete button (localStorage based)

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.style.marginLeft = "10px";
            
            const button = document.createElement("button");
            button.textContent = "Delete";
            button.style.marginLeft = "10px";

            // button.addEventListener("click", function() {
            //     if (!confirm("Are you sure you want to delete this entry?")) return;
            //     data.splice(index, 1);
            //     saveData("dsaEntries", data);
            //     renderDSA();
            // });

			button.addEventListener("click", function() {

    if (!confirm("Are you sure you want to delete this entry?")) return;

    fetch(`http://localhost:3000/dsa/${item.id}`, {
        method: "DELETE"
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        renderDSA();
    })
    .catch(err => {
        console.log("Error:", err);
    });

});

editBtn.addEventListener("click", function () {

    const newProblem = prompt("Edit Problem:", item.problem);
    const newPlatform = prompt("Edit Platform:", item.platform);
    const newDifficulty = prompt("Edit Difficulty:", item.difficulty);

    if (!newProblem || !newPlatform || !newDifficulty) return;

    const updatedData = {
        problem: newProblem,
        platform: newPlatform,
        difficulty: newDifficulty
    };

    fetch(`http://localhost:3000/dsa/${item.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
    })
    .then(() => renderDSA())
    .catch(err => console.log(err));
});
            

            // ✅ UI content (same as before)
            li.innerHTML = `
                <strong>${item.problem}</strong><br>
                <small>${item.platform} • ${item.difficulty}</small>
            `;

            // ❌ button removed TEMPORARILY
            // 👉 will re-add with backend DELETE API next

            li.appendChild(editBtn);
            li.appendChild(button); 

            DSAlist.appendChild(li);
        });
    })
    .catch(err => {
        console.log("Error:", err);
    });
}


// ===================== RENDER APPLICATIONS =====================

function renderApps() {

    // ❌ OLD localStorage (commented, not deleted)
    // let data = getData("appEntries");

    const AppsList = document.getElementById("app-list");

    AppsList.innerHTML = "";

    // ✅ NEW backend fetch
    fetch("http://localhost:3000/applications")
    .then(response => response.json())
    .then(data => {

        if (data.length === 0) {
            const li = document.createElement("li");
            li.textContent = "No applications yet";
            AppsList.appendChild(li);
            return;
        }

        data.forEach(function(item, index) {

            const li = document.createElement("li");

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.style.marginLeft = "10px";

            // ❌ OLD delete button (localStorage based)
            
            const button = document.createElement("button");
            button.textContent = "Delete";
            button.style.marginLeft = "10px";

            // button.addEventListener("click", function() {
            //     if (!confirm("Are you sure you want to delete this entry?")) return;
            //     data.splice(index, 1);
            //     saveData("appEntries", data);
            //     renderApps();
            // });
			button.addEventListener("click", function() {

    if (!confirm("Are you sure you want to delete this application?")) return;

    fetch(`http://localhost:3000/applications/${item.id}`, {
        method: "DELETE"
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        renderApps();
    })
    .catch(err => {
        console.log("Error:", err);
    });

});

editBtn.addEventListener("click", function () {

    const newCompany = prompt("Edit Company:", item.company);
    const newRole = prompt("Edit Role:", item.role);
    const newStatus = prompt("Edit Status:", item.status);

    if (!newCompany || !newRole || !newStatus) return;

    const updatedData = {
        company: newCompany,
        role: newRole,
        status: newStatus
    };

    fetch(`http://localhost:3000/applications/${item.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
    })
    .then(() => renderApps())
    .catch(err => console.log(err));
});

            // ✅ UI content (same as before)
            li.innerHTML = `
                <strong>${item.company}</strong><br>
                <small>${item.role} • ${item.status}</small>
            `;

            // ❌ button removed TEMPORARILY
            // 👉 because delete will now be handled via backend (next step)

            li.appendChild(editBtn);
            li.appendChild(button); 

            AppsList.appendChild(li);
        });
    })
    .catch(err => {
        console.log("Error:", err);
    });
}

function showMessage(text) {
    const msg = document.getElementById("message");
    msg.textContent = text;
    msg.style.color = "green";

    setTimeout(() => {
        msg.textContent = "";
    }, 2000);
}

// ===================== INITIAL RENDER =====================

renderDSA();
renderApps();