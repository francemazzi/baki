import { useRouter } from "next/router";
import Image from "next/image";
import React from "react";
import { PRODOTTI } from "../../common/costants";
import Button from "../../components/atoms/Button";
import { MediaRenderer, useContract, useListing } from "@thirdweb-dev/react";
import { Divider } from "rc-menu";
import Loader from "../../components/atoms/loader/Loader";

type Props = {};

const ListingPage = ({}: Props) => {
  const router = useRouter();
  //distrutturo listingi id
  const { listingId } = router.query as { listingId: string };

  //connessione contratto marketplace
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
    "marketplace"
  );

  const { data: listing, isLoading, error } = useListing(contract, listingId);

  //checko se non c'è nella lista il prodotto

  if (isLoading) {
    return (
      <div>
        <Loader show={true} />
      </div>
    );
  }

  if (!listing) {
    return <div>Articolo non trovato</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row  mac-w-6xl mx-auto p-2">
      <div className="w-full md:h-[20rem] md:w-[20rem] lg:h-[20rem] lg:w-[50rem] lg:mr-[20px] rounded-t-md ">
        <MediaRenderer
          src={listing?.asset.image}
          className="rounded-md object-cover shadow-lg"
        />
      </div>
      <div className="flex flex-col ">
        {/* title */}
        <div className="p-[10px]">
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
          color="red"
          textColor="white"
          colorHover="#ff8066af"
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
  );
};

export default ListingPage;
