import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from "../lib/firebase";
import "firebase/auth";
import "firebase/firestore";

const firestore = getFirestore(app);

//database - firestore
const db = getFirestore(app);

//Products collection
// const produtsCollection = collection(firestore, "products");
const produtsCollection = collection(db, "products");

//User data collection
const usersCollection = collection(firestore, "user");

//firebase - storage
const storage = getStorage(app, "gs://baki-cfc18.appspot.com");

//autenticatore
const provider = new GoogleAuthProvider();
const auth = getAuth();
auth.languageCode = "it";

export {
  db,
  firestore,
  storage,
  produtsCollection,
  usersCollection,
  provider,
  auth,
};
