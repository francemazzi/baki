import React, { useEffect, useState } from "react";
import { NewProductType, productPageType } from "../common/types";
import Image from "next/image";
//web3
import { useContract, useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { Description } from "@ethersproject/properties";

const AddItem = () => {
  const [preview, setPreview] = useState<string>();
  const [image, setImage] = useState<File>();

  //router
  const router = useRouter();

  //adre thirdweb
  const adress = useAddress();
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_COLLECTION_CONTRACT,
    "nft-collection"
  );

  //function that mint nft
  const mintNft = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //check credential
    if (!contract || !adress) {
      console.log("contratct diverso o adress diverso");
      return;
    }
    //no image
    if (!image) {
      alert("Insert an image! 🚨");
      return;
    }
    //TODO -> modificare contratto per aggiungere prezzo, ingredienti, abbinamento
    //create taget event
    const target = e.target as typeof e.target & {
      name: { value: string };
      Description: { value: string };
    };
    //TODO -> inserire questi sopra
    // Ingredient: { value: string };
    // Abbinamenti: { value: string };

    //metadata
    const metadata = {
      name: target.name.value,
      Description: target.Description.value,
      image: image,
    };
    //TODO -> inserire questi sopra
    // Ingredient: target.Ingredient.value,
    // Abbinamenti: target.Abbinamenti.value,

    //assicurarsi di non perdere errori
    try {
      //minting by thirdweb
      const transactionTx = await contract.mintTo(adress, metadata);
      const receipt = transactionTx.receipt;
      const tokenId = transactionTx.id;
      const nft = transactionTx.data();
      console.log(receipt, tokenId, nft);

      // ritornare a pagine che si preferisce
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

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
        <div className="flex flex-col justify-center items-center md:flex-row lg:flex-row md:justify-around lg:justify-around">
          <Image
            className="object-contain shadow-md rounded-md "
            src={preview || "/img/bagelPain.jpg"}
            alt="img"
            width={250}
            height={250}
          />

          <form
            onSubmit={mintNft}
            className="flex flex-col justify-center items-center  my-[15px]"
          >
            <label>Titolo del prodotto</label>
            <input
              className="formField"
              type="text"
              placeholder="Inserisci il titolo..."
              id="name"
            />
            <label>Description del prodotto</label>
            <input
              className="formField"
              type="text"
              placeholder="Inserisci qui la descrizione..."
              id="Description"
            />

            {/* <label>Ingredient del prodotto</label>
            <input
              className="formField"
              type="text"
              placeholder="Inserisci qui gli ingredienti..."
              id="Ingredient"
            />
            <label>Abbinamenti del prodotto</label>
            <input
              className="formField"
              type="text"
              placeholder="Inserisci qui gli Abbinamneti..."
              id="Abbinamenti"
            /> */}

            <label>Immagine del prodotto</label>
            <input
              className="formField"
              type="file"
              placeholder="Inserisci qui l'immagine..."
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setPreview(URL.createObjectURL(e.target.files[0]));
                  setImage(e.target.files[0]);
                }
              }}
            />

            <button
              type="submit"
              className="p-[10px] text-center text-[black] shadow-lg rounded-md hover:p-[12px] hover:shadow-xl"
            >
              Aggiungi
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddItem;
