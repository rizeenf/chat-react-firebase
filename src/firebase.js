// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3Iz7-6mCftO1lKgct-nEK0OwwfrlXpmQ",
  authDomain: "chatreact-93475.firebaseapp.com",
  projectId: "chatreact-93475",
  storageBucket: "chatreact-93475.appspot.com",
  messagingSenderId: "305571993227",
  appId: "1:305571993227:web:bcca51d645ce7b5511e68e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Init Service

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
