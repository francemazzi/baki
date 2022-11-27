import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/molecols/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/context";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
// import { auth, db, setDoc } from "../lib/firebase";
import { ref, child, get } from "firebase/database";
// import usersCollection from "../lib/controller";

// type userType = {
//   user: string;
//   userName: string;
//   producer: boolean;
// };

export default function App({ Component, pageProps }: AppProps) {
  // useEffect(() =>
  //   onSnapshot(usersCollection, (snapshot) => {
  //     console.log(snapshot);
  //   })
  // );

  // console.log(usersCollection);

  //secondo fireship:
  // const [user] = useAuthState(auth);
  // const [userName, setUserName] = useState(null);

  // useEffect(() => {
  //logout
  // let unsubscribe;

  // async function fetchData() {
  //   if (user) {
  //     const ref = await get(collection(db, "user"));
  //     ref.forEach((doc) => {
  //       console.log(`${doc.id} => ${doc.data()}`);
  //     });
  //   } else {
  //     setUserName(null);
  //   }
  // }
  // fetchData();
  // return unsubscribe;
  // }, [user]);

  return (
    <>
      <UserContext.Provider
        value={{ user: "", userName: "a", producer: false }}
      >
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </UserContext.Provider>
    </>
  );
}
