import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../components/molecols/Navbar/Navbar";
import Loader from "../components/atoms/loader/Loader";

export default function Home() {
  return (
    <div>
      <Loader show={true} />
    </div>
  );
}
