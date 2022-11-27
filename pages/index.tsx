import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../components/molecols/Navbar/Navbar";
import Loader from "../components/atoms/loader/Loader";
import CategoryBar from "../components/organism/CategoryBar";

export default function Home() {
  return (
    <div>
      <CategoryBar />
      {/* <Loader show={true} /> */}
    </div>
  );
}
