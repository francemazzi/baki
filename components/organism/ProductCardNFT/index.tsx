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

const ProductCardNFT: React.FC<cardTypeNFT> = ({
  foto,
  titolo,
  produttore,
  categoria,
  prezzo,
  portate,
  linkPage,
}) => {
  //TODO -> FIX the value must increment only on selected product
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center  h-[15rem] w-[10rem] shadow-md rounded-md m-[5px] hover:scale-105 transition-all duration-150 aese-out relative">
      {/* foto prodotto + add cart */}
      <div
        className={`flex flex-col justify-end  h-[10rem] w-[10rem] rounded-t-md relative cursor-pointer`}
      >
        <Link href={linkPage ? linkPage : "/"}>
          <MediaRenderer src={foto} className="rounded-t-md absolute top-0 " />
        </Link>
        <div className="flex flex-row items-center justify-around pb-[5px] relative">
          <div className=" text-[16px] text-black p-[10px] font-bold">
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
      </div>
      {/* dettagli produttore */}
      <Link href={linkPage ? linkPage : "/"}>
        <div className="mt-[15px] pl-[5px] ">
          <div className=" pb-[5px] font-semibold sm:text-[15px] lg:text-[18px] pr-[5px]">
            {titolo}
          </div>
          <div className="pt-[2.5px] pb-[2.5px] sm:text-[12px] lg:text-[18px] italic">
            {produttore}
          </div>
          {/* Prezzo - quantità */}
          <div className="flex flex-row items-center py-[5px] ">
            <div className="mr-[1px]">{prezzo} € </div>
            <div>
              per {portate} prozion{portate ? (+portate > 1 ? "i" : "e") : "i"}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCardNFT;
