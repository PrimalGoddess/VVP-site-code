// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhbS1LBXNdFaKZBpKens4qPoeuEfjfSv8",
  authDomain: "vvp1-f584e.firebaseapp.com",
  projectId: "vvp1-f584e",
  storageBucket: "vvp1-f584e.firebasestorage.app",
  messagingSenderId: "638951264034",
  appId: "1:638951264034:web:aab94b39195db687bb9f7b",
  measurementId: "G-MQWR1LM3H3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);