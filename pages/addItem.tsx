import React from "react";
import { NewProductType, productPageType } from "../common/types";
import Image from "next/image";
//web3
import { useContract, useAddress } from "@thirdweb-dev/react";

const addItem: React.FC<NewProductType> = () => {
  const adress = useAddress();
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
    "nft-collection"
  );
  console.log(contract);

  return (
    <div>
      <main className="flex flex-col justify-center my-2">
        <h1 className="text-[black] p-[10px] text-[22px] font-bold text-center">
          Aggiungi un prodotto nel tuo negozio!
        </h1>
        <h2 className="text-center p-[10px]">
          Inserisci qui sotto i dettagli del prodotto
        </h2>
        {/* Form component */}
        <div className="flex flex-col justify-center items-center">
          <Image
            className="object-contain shadow-md rounded-md"
            src="/img/bagelPain.jpg"
            alt="img"
            width={250}
            height={250}
          />

          <form className="flex flex-col justify-center items-center  my-[15px]">
            <label>Titolo del prodotto</label>
            <input
              className=" p-[10px] my-[5px] shadow-lg"
              type="text"
              placeholder="Inserisci il titolo..."
            />
            <label>Description del prodotto</label>
            <input
              className=" p-[10px] my-[5px] shadow-lg"
              type="text"
              placeholder="Inserisci qui la descrizione..."
            />

            <label>Ingredient del prodotto</label>
            <input
              className=" p-[10px] my-[5px] shadow-lg"
              type="text"
              placeholder="Inserisci qui gli ingredienti..."
            />
            <label>Abbinamenti del prodotto</label>
            <input
              className=" p-[10px] my-[5px] shadow-lg"
              type="text"
              placeholder="Inserisci qui gli Abbinamneti..."
            />

            <label>Immagine del prodotto</label>
            <input
              className=" p-[10px] my-[5px] shadow-lg"
              type="file"
              placeholder="Inserisci qui l'immagine..."
            />

            <button className="p-[10px] text-center text-[black] shadow-lg rounded-md">
              Aggiungi
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default addItem;

// NewProductType
// Abbinamenti?: string;
// Description?: string;-> ok
// Ingredient?: string; -> ok
// disponibile?: string;
// id?: string;
// producer?: string;
// title?: string; -> ok
// img?: File; -> ok
