// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Define the Firebase configuration interface
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Your web app's Firebase configuration
const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY as string,
  authDomain: "auth-app-9fbae.firebaseapp.com",
  projectId: "auth-app-9fbae",
  storageBucket: "auth-app-9fbae.appspot.com",
  messagingSenderId: "14797958485",
  appId: "1:14797958485:web:668aa333a096d776bcd3dc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
