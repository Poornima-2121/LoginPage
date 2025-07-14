const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-button");
const remeberMeCheckbox = document.getElementById("remember-me");

const eyeIcon = document.querySelector(".fa-eye");
const eyeSlashIcon = document.querySelector(".fa-eye-slash");

const togglePasswordVisibility = () => {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.style.display = "none";
        eyeSlashIcon.style.display = "inline-block";
    } else {
        passwordInput.type = "password";
        eyeIcon.style.display = "inline-block";
        eyeSlashIcon.style.display = "none";
    }
};

eyeIcon.addEventListener("click", togglePasswordVisibility);
eyeSlashIcon.addEventListener("click", togglePasswordVisibility);

eyeSlashIcon.style.display = "none"; // Initially hide the eye-slash icon

loginButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission for demonstration purposes

    const username = usernameInput.value;
    const password = passwordInput.value;

    if (!username){
        document.querySelector(".username-error").style.display = "block";
        document.querySelector(".username-error").textContent = "*Username is required"
        usernameInput.style.border = "1px solid red";
        usernameInput.classList.add("shake");
        setTimeout(()=> {
            usernameInput.classList.remove("shake");
            usernameInput.style.border = "1px solid white";
            document.querySelector(".username-error").style.display = "none";
        }, 1500);
     } // Remove shake effect after 1 second
    if (!password){
        document.querySelector(".password-error").style.display = "block";
        document.querySelector(".password-error").textContent = "*Password is required"
        passwordInput.style.border = "1px solid red";
        passwordInput.classList.add("shake");
        setTimeout(()=> {
            passwordInput.classList.remove("shake");
            passwordInput.style.border = "1px solid white";
            document.querySelector(".password-error").style.display = "none";
        }, 1500); // Remove shake effect after 1 second
    }
    else if (password.length < 8) {
        document.querySelector(".password-error").style.display = "block";
        document.querySelector(".password-error").textContent = "*Password must be at least 8 characters long";
        passwordInput.style.border = "1px solid red";
        passwordInput.classList.add("shake");
        setTimeout(()=> {
            passwordInput.classList.remove("shake");
            passwordInput.style.border = "1px solid white";
            document.querySelector(".password-error").style.display = "none";
        }, 1500);
    }
    if (username && password && password.length >= 8) {
        saveToLocalStorage();
        loginButton.disabled = true;
        loginButton.textContent = "Logging in...";
        loginButton.style.cursor = "not-allowed";
        setTimeout(() => {
            loginButton.textContent = "Login";
            loginButton.disabled = false;
            loginButton.style.cursor = "pointer";
            alert("Login successful!");
            usernameInput.value = '';
            passwordInput.value = '';
            remeberMeCheckbox.checked = false;
        }, 2000); // Simulate a login delay
    }
});

usernameInput.addEventListener("input", () => {
    if (usernameInput.value) {
        document.querySelector(".username-error").style.display = "none";
        usernameInput.style.border = "1px solid #02a4f1"; // Reset border color
    } else {
        document.querySelector(".username-error").style.display = "block";
        document.querySelector(".username-error").textContent = "*Username is required";
        usernameInput.style.border = "1px solid red";
    }
});

passwordInput.addEventListener("input", () => {
    if (!passwordInput.value) {
        document.querySelector(".password-error").style.display = "block";
        document.querySelector(".password-error").textContent = "*Password is required";
        passwordInput.style.border = "1px solid red";
    } else if (passwordInput.value.length < 8) {
        document.querySelector(".password-error").style.display = "block";
        document.querySelector(".password-error").textContent = "*Password must be at least 8 characters long";
        passwordInput.style.border = "1px solid red";
    } else {
        document.querySelector(".password-error").style.display = "none";
        passwordInput.style.border = "1px solid #02a4f1";
    }
});

passwordInput.addEventListener('keypress', function (e) {
    if(e.key === "Enter") {
        loginButton.click();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    usernameInput.focus();
});

function saveToLocalStorage() {
    if (remeberMeCheckbox.checked) {
        localStorage.setItem('username', usernameInput.value);
        // ⚠️ WARNING: Storing passwords in localStorage is unsafe. Only for demo purposes.
        localStorage.setItem('password', passwordInput.value);
        localStorage.setItem('rememberMe', true);
    } else {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('rememberMe');
    }
}

function loadFromLocalStorage() {
    const rememberMe = localStorage.getItem('rememberMe');
    if(rememberMe) {
        usernameInput.value = localStorage.getItem('username') || '';
        passwordInput.value = localStorage.getItem('password') || '';
        remeberMeCheckbox.checked = true;
    }
}


