const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

// FIREBASE CONFIGURATION
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // You'll get this from the Firebase Console
  authDomain: "vvp1-f584e.firebaseapp.com",
  databaseURL: "https://vvp1-f584e-default-rtdb.firebaseio.com",
  projectId: "vvp1-f584e",
  storageBucket: "vvp1-f584e.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // You'll get this from the Firebase Console
  appId: "YOUR_APP_ID", // You'll get this from the Firebase Console
  measurementId: "G-514175645"
};

// Initialize Firebase and get auth reference (using compat SDK from HTML)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Handle Sign In function
function handleSignIn(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("User signed in successfully:", userCredential.user);
      // Close the login popup after successful login
      wrapper.classList.remove('active-popup');
      wrapper.classList.remove('active');
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


document.addEventListener('DOMContentLoaded', () => {
    // --- LOGIN FORM LISTENER ---
    const loginForm = document.getElementById('login-form'); 

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            // Get values using the new IDs from the HTML
            const emailInput = document.getElementById('login-email');
            const passwordInput = document.getElementById('login-password');
            
            // Validate that the elements exist before proceeding
            if (emailInput && passwordInput) {
                const email = emailInput.value;
                const password = passwordInput.value;
                
                // Call your authentication function
                handleSignIn(email, password); 
            } else {
                console.error("Login form elements not found in the DOM.");
            }
        });
    }

    // --- REGISTER FORM LISTENER ---
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('register-email');
            const passwordInput = document.getElementById('register-password');
            if (emailInput && passwordInput) {
                const email = emailInput.value;
                const password = passwordInput.value;
                handleSignUp(email, password);
            } else {
                console.error("Register form elements not found in the DOM.");
            }
        });
    }
});