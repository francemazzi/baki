import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAzoVmfLmvoKCvuZbQaV-72kGG3-0ARyGo",
  authDomain: "baki-cfc18.firebaseapp.com",
  projectId: "baki-cfc18",
  storageBucket: "baki-cfc18.appspot.com",
  messagingSenderId: "650215925757",
  appId: "1:650215925757:web:54521a6d7a638bfda81b94",
  measurementId: "G-C33CLQ0SZ4",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
