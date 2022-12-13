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
//wallet connection
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { Button } from "antd";

type Props = {};

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
function SignInButton({}: Props) {
  function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
        }
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        //salvare dati setDoc con id specifico
        await setDoc(doc(db, "user", user.uid), {
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
          uid: user.uid,
          provider: user.providerData,
        });
        //addDoc
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //wallett connection
  const connectWithMetmask = useMetamask();
  const disconnect = useDisconnect();
  const address = useAddress();

  return (
    <div className="flex flex-col ">
      <div className="text-[22px] mt-[20px] text-center ">
        Accedi ora come preferisci
      </div>
      <button
        className=" p-[20px] m-[20px] lg:m-[10rem] md:m-[15px] sm:m-[5px] shadow-md rounded-[12px] hover:p-[15px] origin-top"
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>
      {address ? (
        <button
          onClick={disconnect}
          className="connenctWalletBtn p-[20px] m-[20px] lg:m-[10rem] md:m-[15px] sm:m-[5px] shadow-md rounded-[12px] hover:p-[15px] origin-top"
        >
          👋🏻 {address?.slice(0, 5) + "..." + address?.slice(-4)}
        </button>
      ) : (
        <button
          onClick={connectWithMetmask}
          className="connenctWalletBtn p-[20px] m-[20px] lg:m-[10rem] md:m-[15px] sm:m-[5px] shadow-md rounded-[12px] hover:p-[15px] origin-top"
        >
          Connettiti con Metamask
        </button>
      )}
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
