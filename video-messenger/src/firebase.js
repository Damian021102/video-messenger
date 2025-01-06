// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG-LdkNy7BUYGAKyg1jy13c-zpKXfKcKw",
  authDomain: "video-messenger-9f5df.firebaseapp.com",
  projectId: "video-messenger-9f5df",
  storageBucket: "video-messenger-9f5df.firebasestorage.app",
  messagingSenderId: "847061686584",
  appId: "1:847061686584:web:ee89f18b728d2b301c09cd",
  measurementId: "G-PBCYW0MNY8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export Firebase services
export {
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
};