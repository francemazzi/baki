import { useRouter } from "next/router";
import Image from "next/image";
import React from "react";
import { PRODOTTI } from "../../common/costants";
import Button from "../../components/atoms/Button";
import { MediaRenderer, useContract, useListing } from "@thirdweb-dev/react";
import { Divider } from "rc-menu";
import Loader from "../../components/atoms/loader/Loader";
import { ListingType } from "@thirdweb-dev/sdk";

type Props = {};

const ListingPage = ({}: Props) => {
  //cambio USDC in EUR
  const cambioEUR = 0.94;

  //router
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

  //formattazione placeholder asta nft
  const formatPlaceholder = () => {
    if (!listing) return;
    if (listing.type === ListingType.Direct) {
      return "inserisci qui...";
    }
    if (listing.type === ListingType.Auction) {
      return "inserisci la puntata...";
    }
  };

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
          <h1 className="text-[22px] font-bold">{listing?.asset.name}</h1>
          <div className="flex flex-row items-center w-full ">
            <p className="mr-[5px]">👤 Creatore: </p>
            <p className="text-[14px] font-thin">
              {listing?.sellerAddress.slice(0, 6) +
                "..." +
                listing?.sellerAddress.slice(-4)}
            </p>
          </div>
        </div>
        {/* price */}
        <div className="flex flex-row p-[10px]">
          <h3 className="text-[20px]">
            {(
              +listing.buyoutCurrencyValuePerToken.displayValue * cambioEUR
            ).toFixed(1)}{" "}
            €
          </h3>
          <h3 className="text-[20px] ml-[10px]">
            |{" "}
            {listing?.quantity === 0
              ? "Terminato!"
              : listing?.quantity > 0
              ? "Pezzo unico"
              : `${listing?.quantity} disponibili`}
          </h3>
        </div>

        {/* Vendita diretta o asta  */}

        <div className="flex flex-row items-center my-[10px]">
          <p className="mr-[6px]">Tipo di quotazione: </p>
          <p>
            {listing.type === ListingType.Direct ? "vendita diretta!" : "asta"}
          </p>
        </div>

        <Button
          text="Aquista ora"
          color="red"
          textColor="white"
          colorHover="#ff8066af"
        />

        {/* Asta */}
        <div className="my-[10px] flex flex-col justify-center items-center">
          <div className=" h-[0.5px] bg-slate-400 rounded-full" />

          <label className="w-full border-r font-light relative right-0">
            {listing.type === ListingType.Direct
              ? "Fai un'offerta"
              : "Offri a quest'asta"}
          </label>
          <input
            className="formField rounded-md"
            type="text"
            placeholder={formatPlaceholder()}
            name="price"
          />
        </div>
        <button
          type="submit"
          className="p-[10px] text-center text-[black] shadow-lg rounded-md my-[10px] hover:p-[12px] bg-slate-100 hover:bg-slate-300 hover:shadow-xl"
        >
          {listing.type === ListingType.Direct ? "Offerta" : "Punta"}
        </button>

        {/* Descrizione */}
        <div className="my-[15px] p-[10px]">
          <p className="text-[15px]">{listing?.asset.description}</p>
        </div>

        {/* linea -> decommentare sotto una volta  collegati ingredienti */}
        {/* <div className=" h-[0.5px] bg-slate-400 rounded-full" /> */}
        {/* Ingredienti  -> da inserire in smart contract */}
        {/* <div className="my-[15px] p-[10px]">
          <h3 className="text-[20px] my-[5px]">Ingredienti</h3>
          <p className="text-[15px]">{PRODOTTI[0].ingredienti}</p>
        </div> */}
      </div>
    </div>
  );
};

export default ListingPage;
