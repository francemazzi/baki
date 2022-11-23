import React from "react";
import { auth, provider } from "../lib/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Enter() {
  const user = null;
  const username = null;
  return (
    <div className="enter">
      <main>
        {user ? (
          !username ? (
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
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <div className="flex flex-col ">
      <div className="text-[22px] mt-[20px] text-center">
        Accedi ora con il tuo profilo google:
      </div>
      <button
        className="btn-google p-[20px] m-[20px] lg:m-[10rem] shadow-md rounded-[12px]"
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

function UsernameForm() {
  return null;
}
