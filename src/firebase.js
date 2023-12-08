import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDv6q8fx52te5QqJsEKXV6OL1BqhYu63Q8",
  authDomain: "chat-1c338.firebaseapp.com",
  projectId: "chat-1c338",
  storageBucket: "chat-1c338.appspot.com",
  messagingSenderId: "936724907728",
  appId: "1:936724907728:web:bc697b891fd46ff84700d5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Init Service

export const auth = getAuth();

export const storage = getStorage();

export const db = getFirestore(app);
