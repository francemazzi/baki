import { collection, getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from "../lib/firebase";
import "firebase/auth";
import "firebase/firestore";

const firestore = getFirestore(app);

//Products collection
const produtsCollection = collection(firestore, "products");

//User data collection
const usersCollection = collection(firestore, "user");

//database - firestore
const db = getFirestore(app);

//autenticatore
const provider = new GoogleAuthProvider();
const auth = getAuth();
auth.languageCode = "it";

export { db, firestore, produtsCollection, usersCollection, provider, auth };
