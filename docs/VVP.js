const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

// FIREBASE CONFIGURATION
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhbS1LBXNdFaKZBpKens4qPoeuEfjfSv8",
  authDomain: "vvp1-f584e.firebaseapp.com",
  databaseURL: "https://vvp1-f584e-default-rtdb.firebaseio.com",
  projectId: "vvp1-f584e",
  storageBucket: "vvp1-f584e.firebasestorage.app",
  messagingSenderId: "638951264034",
  appId: "1:638951264034:web:aab94b39195db687bb9f7b",
  measurementId: "G-MQWR1LM3H3"
};

// Mock Auth System (localStorage-based for testing)
// In production, replace this with real Firebase authentication
const mockAuth = {
  users: JSON.parse(localStorage.getItem('mockAuthUsers') || '{}'),
  
  createUserWithEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
      if (this.users[email]) {
        reject(new Error('Firebase: Error (auth/email-already-in-use.)'));
      } else if (!email || !password) {
        reject(new Error('Firebase: Error (auth/invalid-email.)'));
      } else {
        this.users[email] = { email, password };
        localStorage.setItem('mockAuthUsers', JSON.stringify(this.users));
        console.log('Mock: User registered', email);
        resolve({ user: { email, uid: 'mock_' + Date.now() } });
      }
    });
  },
  
  signInWithEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
      if (this.users[email] && this.users[email].password === password) {
        console.log('Mock: User signed in', email);
        resolve({ user: { email, uid: 'mock_' + Date.now() } });
      } else {
        reject(new Error('Firebase: Error (auth/user-not-found.)'));
      }
    });
  }
};

// Initialize Firebase and get auth reference (using compat SDK from HTML)
let auth = null;
try {
  firebase.initializeApp(firebaseConfig);
  auth = firebase.auth();
  console.log('Firebase initialized');
} catch (e) {
  console.warn('Firebase init failed, using mock auth:', e.message);
  auth = mockAuth;
}

// Handle Sign In function
function handleSignIn(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("User signed in successfully:", userCredential.user);
      // Close the login popup after successful login
      wrapper.classList.remove('active-popup');
      wrapper.classList.remove('active');
      alert('Login successful!');
    })
    .catch((error) => {
      console.error("Sign in error:", error.message);
      alert("Login failed: " + error.message);
    });
}

// Handle Sign Up function (creates a new user)
function handleSignUp(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("User registered successfully:", userCredential.user);
            // Close the popup after successful registration
            wrapper.classList.remove('active-popup');
            wrapper.classList.remove('active');
            alert('Registration successful!');
        })
        .catch((error) => {
            console.error("Sign up error:", error.message);
            alert("Registration failed: " + error.message);
        });
}


registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
    wrapper.classList.remove('active');
});

//forums
//NavBar
function hideIconBar(){
    var iconBar = document.getElementById("iconBar");
    var navigation = document.getElementById("navigation");
    iconBar.setAttribute("style", "display:none;");
    navigation.classList.remove("hide");
}

function showIconBar(){
    var iconBar = document.getElementById("iconBar");
    var navigation = document.getElementById("navigation");
    iconBar.setAttribute("style", "display:block;");
    navigation.classList.add("hide");
}

//Comment
function showComment(){
    var commentArea = document.getElementById("comment-area");
    commentArea.classList.remove("hide");
}

//Reply
function showReply(){
    var replyArea = document.getElementById("reply-area");
    replyArea.classList.remove("hide");
}


function initAuthHandlers() {
  // --- LOGIN FORM LISTENER ---
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailInput = document.getElementById('login-email');
      const usernameInput = document.getElementById('login-username');
      const passwordInput = document.getElementById('login-password');

      if (!passwordInput) {
        console.error('Login password element not found.');
        alert('Login failed: missing password field.');
        return;
      }

      const password = passwordInput.value;
      let email = null;

      if (emailInput && emailInput.value) {
        email = emailInput.value;
      } else if (usernameInput && usernameInput.value) {
        const usernameVal = usernameInput.value.trim();
        // If the user typed an email into the username field, use it directly
        if (usernameVal.includes('@')) {
          email = usernameVal;
        } else {
          // Synthesize the email used by the registration fallback
          email = `${usernameVal}@example.invalid`;
        }
      } else {
        alert('Please enter your email or username.');
        return;
      }

      handleSignIn(email, password);
    });
  }

  // --- REGISTER FORM LISTENER ---
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Prefer an element with id 'register-email' if present
      let emailEl = document.getElementById('register-email');
      // Otherwise try to find an <input type="email"> inside the register form
      if (!emailEl) {
        emailEl = registerForm.querySelector('input[type="email"]');
      }
      const usernameEl = document.getElementById('register-username');
      const passwordEl = document.getElementById('register-password');

      if (!passwordEl) {
        console.error('Register password element not found.');
        alert('Registration failed: missing password field.');
        return;
      }

      const password = passwordEl.value;

      let email = null;
      if (emailEl) {
        email = emailEl.value;
      } else if (usernameEl) {
        // fallback: synthesize an email from username for testing only
        const username = usernameEl.value || 'user';
        email = `${username}@example.invalid`;
        console.warn('No register-email id found; using synthetic email:', email);
      }

      if (!email) {
        console.error('No email or username available for registration.');
        alert('Registration requires an email address.');
        return;
      }

      handleSignUp(email, password);
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAuthHandlers);
} else {
  // DOM already ready
  initAuthHandlers();
}