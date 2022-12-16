import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../components/molecols/Navbar/Navbar";
import Loader from "../components/atoms/loader/Loader";
import CategoryBar from "../components/organism/CategoryBar";
import ProductList from "../components/organism/ProductList";
import Reasearch from "../components/atoms/Reasearch";
//eth network
import {
  ChainId,
  ThirdwebProvider,
  useContract,
  useActiveListings,
} from "@thirdweb-dev/react";
import ProductListNFT from "../components/organism/ProductListNFT";

const Home = () => {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
    "marketplace"
  );

  const { data: listings, isLoading: loadingListing } =
    useActiveListings(contract);

  console.log(listings);

  return (
    <div className="m-[10px]">
      <div className="flex flex-col justify-center items-center p-[20px] h-[20rem] rounded-lg shadow-xl relative">
        <Image
          src={"/img/goldBread.jpg"}
          alt="photo not upload"
          objectFit="cover"
          layout="fill"
          className="rounded-lg"
        />
        <div className="text-[22px] font-bold text-[white] bg-[#a59f9f4b] p-[10px] drop-shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] rounded-lg relative">
          Il migliore modo per ridurre i costi della spesa, pre-ordinando ❤️
        </div>
      </div>
      <div className="my-[15px]">
        <div className="text-[19px] font-semibold ">
          Scopri i nuovi prodotti
        </div>
        <div className="bg-[white]">
          <ProductList scrollMode="overflow-x-scroll" />
        </div>
      </div>
      <div className="my-[15px]">
        <h2 className="text-[19px] font-semibold ">
          Ricerca Il tuo prodotto preferito
        </h2>
        <Reasearch />
      </div>
      <div className="my-[15px]">
        <h2 className="text-[19px] font-semibold animate-pulse text-red-600">
          Pre-ordina, risparmia e guadagna!
        </h2>
        <ProductListNFT />
      </div>
      {/* <Loader show={true} /> */}
    </div>
  );
};

export default Home;
