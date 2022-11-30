import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/molecols/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/context";
import CategoryBar from "../components/organism/CategoryBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="font-montserrat">
      <UserContext.Provider
        value={{ user: "", userName: "a", producer: false }}
      >
        <Navbar />
        <CategoryBar />
        <Component {...pageProps} />
        <Toaster />
      </UserContext.Provider>
    </div>
  );
}
