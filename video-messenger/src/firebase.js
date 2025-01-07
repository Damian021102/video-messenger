// Import the functions you need from the Firebase SDKs
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'; // Add these imports
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG-LdkNy7BUYGAKyg1jy13c-zpKXfKcKw",
  authDomain: "video-messenger-9f5df.firebaseapp.com",
  projectId: "video-messenger-9f5df",
  storageBucket: "video-messenger-9f5df.appspot.com",
  messagingSenderId: "847061686584",
  appId: "1:847061686584:web:ee89f18b728d2b301c09cd",
  measurementId: "G-PBCYW0MNY8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize auth
const db = getFirestore(app); // Initialize Firestore
const googleProvider = new GoogleAuthProvider(); // Initialize Google provider

// Export Firebase services
export {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
};