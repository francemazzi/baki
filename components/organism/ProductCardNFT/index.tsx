import React from "react";
import Image from "next/image";
import BusketIcon from "../../atoms/BusketIcon";
import Link from "next/link";
import { cardTypeNFT } from "../../../common/types";
//loading foto
import loadingFoto from "../../../public/img/loading.png";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../../rtk/slices/counterSlice";
import { RootState } from "../../../rtk/store";
import { MediaRenderer } from "@thirdweb-dev/react";
//web3
import {
  ChainId,
  ThirdwebProvider,
  useContract,
  useActiveListings,
} from "@thirdweb-dev/react";

const ProductCardNFT: React.FC<cardTypeNFT> = ({
  foto,
  titolo,
  produttore,
  categoria,
  prezzo,
  portate,
  linkPage,
  listing,
}) => {
  //TODO -> FIX the value must increment only on selected product
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  //nft listing
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
    "marketplace"
  );
  const { data: listings, isLoading: loadingListing } =
    useActiveListings(contract);

  return (
    <div className="flex flex-col card overflow-hidden shadow-md rounded-md hover:scale-105 transition-all duration-150 aese-out">
      {/* foto prodotto  */}
      <div className="flex-1 flex flex-col pb-3 items-center w-full">
        <Link href={linkPage ? linkPage : `/listing/${listing}`}>
          <MediaRenderer src={foto} className="rounded-md " />
        </Link>
      </div>

      {/* elementi card */}
      <div
        className={`flex flex-col justify-around items-center cursor-pointer h-full`}
      >
        {/* add button */}
        <div className="flex flex-row items-center justify-around relative w-full">
          <div className=" text-[16px] text-black font-bold">
            <div className="flex flex-row items-center">
              {portate ? (
                +portate > 1 ? (
                  "prozioni"
                ) : (
                  "prozione"
                )
              ) : (
                <p className="animate-pulse text-[red]">sold-out</p>
              )}
            </div>
          </div>
          <div>
            {portate ? (
              <BusketIcon onClick={() => dispatch(increment())} />
            ) : (
              <BusketIcon onClick={() => console.log("sold-out!")} />
            )}
          </div>
        </div>
        {/* dettagli produttore */}
        <Link href={linkPage ? linkPage : "/"}>
          <div className="mt-[15px] pl-[5px] ">
            <div className=" pb-[5px] font-semibold text-[14px] lg:text-[18px] pr-[5px]">
              {titolo}
            </div>
            <div className="pt-[2.5px] pb-[2.5px] sm:text-[12px] lg:text-[18px] italic">
              {produttore}
            </div>
            {/* Prezzo - quantità */}
            <div className="flex flex-row items-center py-[5px] ">
              <div className="mr-[1px]">{prezzo} €</div>
              <div>
                per {portate} prozion
                {portate ? (+portate > 1 ? "i" : "e") : "e"}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCardNFT;
