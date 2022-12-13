import React from "react";
import Image from "next/image";
import BusketIcon from "../../atoms/BusketIcon";
import Link from "next/link";
import { cardType } from "../../../common/types";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../../rtk/slices/counterSlice";
import { RootState } from "../../../rtk/store";

const ProductCard: React.FC<cardType> = ({
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
    <div className="flex flex-col items-center h-[20rem] w-[10rem] shadow-md rounded-md m-[5px] relative">
      {/* foto prodotto + add cart */}
      <div
        className={`flex flex-col justify-end h-[10rem] w-[10rem] rounded-t-md relative cursor-pointer`}
      >
        <Link href={linkPage}>
          <Image
            src={foto}
            alt="photo not upload"
            objectFit="cover"
            layout="fill"
            className="rounded-t-md"
          />
        </Link>
        <div className="flex flex-row items-center justify-around pb-[5px] relative">
          <div className="text-[#FFF] text-[15px] shadow-md font-bold">
            {portate} prozion{+portate > 1 ? "i" : "e"}
          </div>
          <div>
            <BusketIcon onClick={() => dispatch(increment())} />
          </div>
        </div>
      </div>
      {/* dettagli produttore */}
      <Link href={linkPage}>
        <div className="mt-[15px] pl-[5px] ">
          <div className=" pb-[5px] font-semibold sm:text-[15px] lg:text-[18px] pr-[5px]">
            {titolo}
          </div>
          <div className="pt-[2.5px] pb-[2.5px] sm:text-[12px] lg:text-[18px] italic">
            {produttore}
          </div>
          {/* Prezzo - quantità */}
          <div className="flex flex-row items-center py-[5px] absolute bottom-0">
            <div className="mr-[1px]">{prezzo} € </div>
            <div>
              per {portate} prozion{+portate > 1 ? "i" : "e"}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
