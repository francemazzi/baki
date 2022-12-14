import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/molecols/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/context";
import CategoryBar from "../components/organism/CategoryBar";
import Footer from "../components/organism/Footer";
import { store } from "../rtk/store";
import { Provider } from "react-redux";
//eth network
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import network from "../utils/network";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="font-montserrat">
      <UserContext.Provider
        value={{ user: "", userName: "a", producer: false }}
      >
        <Provider store={store}>
          <Navbar />
          <CategoryBar />
          <ThirdwebProvider desiredChainId={network}>
            <Component {...pageProps} />
          </ThirdwebProvider>
          <Footer />
          <Toaster />
        </Provider>
      </UserContext.Provider>
    </div>
  );
}
