import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { PRODOTTI } from "../../common/costants";
import { productPageType } from "../../common/types";
import ProductList from "../../components/organism/ProductList";
import Button from "../../components/atoms/Button";

const ProductPage: React.FC<productPageType> = (
  {
    // foto,
    // titolo,
    // produttore,
    // categoria,
    // prezzo,
    // portate,
  }
) => {
  const router = useRouter();
  //const productIde =  router.query.productId
  // TODO -> router dinamico pagina + aggiungere in cima i vari pulsanti per tornare indietro
  return (
    <div className="flex flex-col  m-[10px]">
      <div className="lg:flex  lg:flex-row lg:items-center">
        <div className="h-[10rem] w-full md:h-[20rem] md:w-[20rem] lg:h-[20rem] lg:w-[50rem] lg:mr-[20px] rounded-t-md relative shadow-lg">
          <Image
            src={PRODOTTI[0].foto}
            alt="photo not upload"
            objectFit="cover"
            layout="fill"
            className="rounded-md"
          />
        </div>
        <div className="md:flex lg:flex md:flex-col lg:flex-col">
          {/* title */}
          <div className=" p-[10px]">
            <h1 className="text-[22px] font-bold">{PRODOTTI[0].titolo}</h1>
            <p className="text-[14px] font-thin">{PRODOTTI[0].produttore}</p>
          </div>
          {/* price */}
          <div className="flex flex-row p-[10px]">
            <h3 className="text-[20px]">{PRODOTTI[0].prezzo} €</h3>
            <h3 className="text-[20px] ml-[10px]">
              per {PRODOTTI[0].portate} porzion
              {+PRODOTTI[0].portate > 1 ? "i 👥" : "e 👤"}
            </h3>
          </div>
          <Button
            text="Aggiungi al carrello"
            color="#ff7f66"
            textColor="#FFF"
          />

          {/* Descrizione */}
          <div className="my-[15px] p-[10px]">
            <p className="text-[15px]">{PRODOTTI[0].descrizione}</p>
          </div>

          {/* linea */}
          <div className=" h-[0.5px] bg-slate-400 rounded-full" />
          {/* Ingredienti */}
          <div className="my-[15px] p-[10px]">
            <h3 className="text-[20px] my-[5px]">Ingredienti</h3>
            <p className="text-[15px]">{PRODOTTI[0].ingredienti}</p>
          </div>
        </div>
      </div>

      {/* Preparazione */}
      <div className="my-[15px] p-[10px]">
        <h3 className="text-[20px] my-[5px]">Istruzioni</h3>
        <p className="text-[15px]">{PRODOTTI[0].istruzioni}</p>
      </div>
      <div className="bg-[white] my-[15px]">
        <h3 className="text-[20px] p-[10px]">Potrebbero piacerti anche:</h3>
        <ProductList scrollMode="overflow-x-scroll" />
      </div>
    </div>
  );
};

export default ProductPage;
