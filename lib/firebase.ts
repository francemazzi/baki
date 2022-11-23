import firebase from "firebase/app";
import "firebase/database";
import { initializeApp } from "firebase/app";
import { getStorage } from "@firebase/storage";
import { getDatabase } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAzoVmfLmvoKCvuZbQaV-72kGG3-0ARyGo",
  authDomain: "baki-cfc18.firebaseapp.com",
  projectId: "baki-cfc18",
  storageBucket: "baki-cfc18.appspot.com",
  messagingSenderId: "650215925757",
  appId: "1:650215925757:web:54521a6d7a638bfda81b94",
  measurementId: "G-C33CLQ0SZ4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
auth.languageCode = "it";
export const db = getDatabase(app);
export const storage = getStorage(app);

export default firebaseConfig;
export { app };
