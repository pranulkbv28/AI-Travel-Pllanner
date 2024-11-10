// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYvBgtpNn_kCm9VDPGrJULAoI54fi7Hn0",
  authDomain: "ai-travel-planner-fa3cb.firebaseapp.com",
  projectId: "ai-travel-planner-fa3cb",
  storageBucket: "ai-travel-planner-fa3cb.firebasestorage.app",
  messagingSenderId: "398718689420",
  appId: "1:398718689420:web:02ff8549543b08530cdba9",
  measurementId: "G-2DE7218MSL",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
