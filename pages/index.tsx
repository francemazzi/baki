import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../components/molecols/Navbar/Navbar";
import Loader from "../components/atoms/loader/Loader";
import CategoryBar from "../components/organism/CategoryBar";
import ProductList from "../components/organism/ProductList";

export default function Home() {
  return (
    <div>
      <ProductList />
      {/* <Loader show={true} /> */}
    </div>
  );
}
