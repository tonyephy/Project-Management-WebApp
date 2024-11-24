import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyCavF-n4glR_KFZ8f6AMrwHMR78CUliiEk",
    authDomain: "modern-web-app-project.firebaseapp.com",
    projectId: "modern-web-app-project",
    storageBucket: "modern-web-app-project.firebasestorage.app",
    messagingSenderId: "671541584713",
    appId: "1:671541584713:web:c358012964887647137098",
    measurementId: "G-Y0VVDM1PWW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// UI Elements
const signinBtn = document.querySelector('.signinBtn');
const signupBtn = document.querySelector('.signupBtn');
const formBx = document.querySelector('.formBx');
const body = document.querySelector('body');
const emailDialog = document.getElementById('emailDialog');
const forgotPassword = document.getElementById('forgotPassword');
const cancelDialog = document.getElementById('cancelDialog');

// Password validation function
function validatePassword(password) {
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    Object.keys(requirements).forEach(req => {
        const element = document.getElementById(req);
        if (requirements[req]) {
            element.classList.add('valid');
            element.classList.remove('invalid');
        } else {
            element.classList.add('invalid');
            element.classList.remove('valid');
        }
    });

    return Object.values(requirements).every(Boolean);
}

// Password input event listener
document.getElementById('registerPassword').addEventListener('input', (e) => {
    validatePassword(e.target.value);
});

// Forgot password handler
forgotPassword.addEventListener('click', (e) => {
    e.preventDefault();
    emailDialog.showModal();
});

cancelDialog.addEventListener('click', () => {
    emailDialog.close();
});

document.getElementById('resetEmailForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('resetEmail').value;
    
    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('Password reset email sent! Check your inbox.');
            emailDialog.close();
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
});

// Toggle between forms
signupBtn.onclick = function() {
    formBx.classList.add('active');
    body.classList.add('active');
};

signinBtn.onclick = function() {
    formBx.classList.remove('active');
    body.classList.remove('active');
};

// Register Form Submit
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = registerForm['registerEmail'].value;
    const password = registerForm['registerPassword'].value;
    const confirmPassword = registerForm['confirmPassword'].value;

    if (!validatePassword(password)) {
        registerError.textContent = "Password does not meet requirements!";
        return;
    }

    if (password !== confirmPassword) {
        registerError.textContent = "Passwords do not match!";
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User registered:", user);
            registerForm.reset();
            window.location.href = 'home.html';
        })
        .catch((error) => {
            registerError.textContent = error.message;
            console.error("Registration error:", error);
        });
});

// Login Form Submit
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = loginForm['loginEmail'].value;
    const password = loginForm['loginPassword'].value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User logged in:", user);
            loginForm.reset();
            window.location.href = 'home.html';
        })
        .catch((error) => {
            loginError.textContent = error.message;
            console.error("Login error:", error);
        });
});
