// src/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBd6vb7io1_JhCKGQmizmqu8QxVAAfqSQg",
  authDomain: "mayday-422306.firebaseapp.com",
  projectId: "mayday-422306",
  storageBucket: "mayday-422306.appspot.com",
  messagingSenderId: "508890783137",
  appId: "1:508890783137:web:d4d375ad257afb5db17fe0",
  measurementId: "G-T9EWTWMQVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db };
