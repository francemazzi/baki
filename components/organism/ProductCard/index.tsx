import React from "react";
import Image from "next/image";

type cardType = {
  foto: string;
  titolo: string;
  produttore: string;
  categoria: string;
  prezzo: string;
  portate: string;
};

const ProductCard: React.FC<cardType> = ({
  foto,
  titolo,
  produttore,
  categoria,
  prezzo,
  portate,
}) => {
  return (
    <div className="m-[15px]">
      <div className="flex flex-col justify-center w-[12rem] shadow-md rounded-md">
        {/* foto prodotto + add cart */}
        <div
          className={`flex flex-col justify-end h-[10rem] w-full rounded-t-md relative aspect-1 cursor-pointer]`}
        >
          <Image
            src={foto}
            alt="photo not upload"
            objectFit="cover"
            layout="fill"
            className="rounded-t-md"
          />
          <div className="flex flex-row items-center justify-around pb-[5px] relative">
            <div className="text-[#FFF] shadow-md font-bold">
              {portate} prozion{+portate > 1 ? "i" : "e"}
            </div>
            <div>
              <button className="bg-[#FFF] shadow-md h-[40px] w-[40px] rounded-full">
                🧺
              </button>
            </div>
          </div>
        </div>
        {/* dettagli produttore */}
        <div className="mt-[15px] pl-[5px] ">
          <div className=" pb-[5px] font-semibold text-[18px] pr-[5px]">
            {titolo}
          </div>
          <div className="pt-[2.5px] pb-[2.5px] text-[15px] italic">
            {produttore}
          </div>
          {/* Prezzo - quantità */}
          <div className="flex flex-row items-center justify-around pt-[5px] pb-[5px]">
            <div>{prezzo} €</div>
            <div>
              {portate} prozion{+portate > 1 ? "i" : "e"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
