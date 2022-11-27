import React from "react";
import {
  db,
  auth,
  provider,
  firestore,
  usersCollection,
} from "../lib/controller";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { UserContext } from "../lib/context";
import { useContext } from "react";
import { doc, setDoc } from "firebase/firestore";
import firebase from "firebase/app";

export default function Enter() {
  //UserContext
  const { user, userName, producer } = useContext(UserContext);

  return (
    <div className="enter">
      <main>
        {user ? (
          !userName ? (
            <UsernameForm />
          ) : (
            <SignOutButton />
          )
        ) : (
          <SignInButton />
        )}
      </main>
    </div>
  );
}

// Sign in with Google button
function SignInButton() {
  function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
        }
        // The signed-in user info.
        const user = result.user;

        //salvare dati db
        setDoc(doc(db, "user"), {
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
          uid: user.uid,
          provider: user.providerData,
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  return (
    <div className="flex flex-col ">
      <div className="text-[22px] mt-[20px] text-center ">
        Accedi ora con il tuo profilo google:
      </div>
      <button
        className=" p-[20px] m-[20px] lg:m-[10rem] md:m-[15px] sm:m-[5px] shadow-md rounded-[12px] hover:p-[15px] origin-top"
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>
    </div>
  );
}

// Sign out button
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

//form username
function UsernameForm() {
  return null;
}
