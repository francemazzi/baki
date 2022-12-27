import { useRouter } from "next/router";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { PRODOTTI } from "../../common/costants";
import Button from "../../components/atoms/Button";
import {
  MediaRenderer,
  useContract,
  useListing,
  useNetwork,
  useNetworkMismatch,
  useMakeOffer,
  useMakeBid,
  useOffers,
  useBuyNow,
  useAddress,
  useAcceptDirectListingOffer,
} from "@thirdweb-dev/react";
import { Divider } from "rc-menu";
import Loader from "../../components/atoms/loader/Loader";
import { ListingType, NATIVE_TOKENS } from "@thirdweb-dev/sdk";
import Countdown from "react-countdown";
import network from "../../utils/network";
import { ethers } from "ethers";

type minimumNextBidType = {
  displayValue: string;
  symbol: string;
};

const ListingPage = () => {
  //router
  const router = useRouter();
  //cambio USDC in EUR
  const cambioEUR = 0.94;

  //adress utente
  const address = useAddress();
  //Controllo rete webthird
  const [, switchNetwork] = useNetwork();
  const networkMismatch = useNetworkMismatch();

  //minimo prezzo asta
  const [minimumNextBid, setMinimumNextBid] = useState<minimumNextBidType>();
  const [bidAmount, setBidAmount] = useState("");

  //distrutturo listing id
  const { listingId } = router.query as { listingId: string };

  //connessione contratto marketplace
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
    "marketplace"
  );

  const { data: listing, isLoading, error } = useListing(contract, listingId);

  //Acquisto thirdweb
  const { mutate: buyNow } = useBuyNow(contract);
  //offerta thirdweb
  const { mutate: makeOffer } = useMakeOffer(contract);
  //visualizzazione offerta screen thirdweb
  const { data: offers } = useOffers(contract, listingId);

  //fare offerta
  const { mutate: makeBid } = useMakeBid(contract);
  //
  const { mutate: acceptOffer } = useAcceptDirectListingOffer(contract);

  //   const acceptOffer = async (offer: Record<string, any>) => {};

  //controllo variazioni componente e prezzo
  useEffect(() => {
    if (!listingId || !listing || !contract) return;
    if (listing.type === ListingType.Auction) {
      //settare con nuovi dati scaricati da blockchain
      fetchMinNextBid();
    }
  }, [listingId, listing, contract]);

  const fetchMinNextBid = async () => {
    if (!listingId || !contract) return;
    const { displayValue, symbol } = await contract.auction.getMinimumNextBid(
      listingId
    );

    setMinimumNextBid({
      displayValue: displayValue,
      symbol: symbol,
    });
  };

  //formattazione placeholder asta nft
  const formatPlaceholder = () => {
    if (!listing) return;
    if (listing.type === ListingType.Direct) {
      return "inserisci qui...";
    }
    if (listing.type === ListingType.Auction) {
      //se c'è una base di asta inserisci di più
      return Number(minimumNextBid?.displayValue) === 0
        ? "inserisci la puntata..."
        : `${minimumNextBid?.displayValue} ${minimumNextBid?.symbol} o più`;
    }
  };

  //funzione offerta
  const createOffer = async () => {
    try {
      //check network
      if (networkMismatch) {
        switchNetwork && switchNetwork(network);
        return;
      }
      //direct listing
      if (listing?.type === ListingType.Direct) {
        //comparazione valore offerto per vedere se valore uguale a quello di vendita
        if (
          listing.buyoutPrice.toString() ===
          ethers.utils.parseEther(bidAmount).toString()
        ) {
          buyNft();
          return;
        }
        //funzione di offerte
        //TODO --> se quantità maggiore di uno buyAmount deve essere connesso a quantità
        await makeOffer(
          {
            quantity: 1,
            listingId,
            pricePerToken: bidAmount,
          },
          {
            onSuccess(data, variables, context) {
              console.log("successo!", data);
              router.replace("/");
              setBidAmount("");
            },
            onError(data, variables, context) {
              console.log("Errore", data, variables, context);
            },
          }
        );
      }
      //auction listing
      if (listing?.type === ListingType.Auction) {
        console.log("Make bid");
        await makeBid(
          {
            listingId,
            bid: bidAmount,
          },
          {
            onSuccess(data, variables, context) {
              console.log("bid successo!", data);
              router.replace("/");
              setBidAmount("");
            },
            onError(data, variables, context) {
              console.log("Errore", data, variables, context);
            },
          }
        );
      }
    } catch (erro) {
      console.log(error);
    }
  };

  //funzione acquisto nft
  const buyNft = async () => {
    if (networkMismatch) {
      switchNetwork && switchNetwork(network);
      return;
    }

    //se non c'è listing
    if (!listingId || !listing || !contract) return;

    //TODO --> se quantità maggiore di uno buyAmount deve essere connesso a quantità
    //acquisto
    await buyNow(
      {
        id: listingId,
        buyAmount: 1,
        type: listing?.type,
      },
      {
        onSuccess(data, variables, context) {
          console.log("successo!", data);
          router.replace("/");
        },
        onError(data, variables, context) {
          console.log("Errore", data, variables, context);
        },
      }
    );
  };

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
      <div className="flex flex-col w-full">
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
          textColor="black"
          colorHover="#ff8066af"
          onClick={buyNft}
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
            onChange={(e) => setBidAmount(e.target.value)}
            type="text"
            placeholder={formatPlaceholder()}
            name="price"
          />

          <button
            onClick={createOffer}
            type="submit"
            className="w-full p-[10px] text-center text-[black] shadow-lg rounded-md my-[10px] hover:p-[12px] bg-slate-100 hover:bg-slate-300 hover:shadow-xl"
          >
            {listing.type === ListingType.Direct ? "Offerta" : "Punta"}
          </button>
        </div>

        {/* Offerte passate */}

        {listing.type === ListingType.Direct && offers && (
          <div className="grid grid.cols-2 gap-y-2 text-black">
            {/* offerte totali */}
            <p className="font-bold">Offerte:</p>
            <p className="font-bold">{offers.length > 0 ? offers.length : 0}</p>
            {/* cronologia wallet */}
            {offers.map((offer) => (
              <>
                <p className="flex items-center text-sm italic">
                  👤{" "}
                  {offer.offerer.slice(0, 5) + "..." + offer.offerer.slice(-5)}
                </p>
                <div>
                  <p
                    key={
                      offer.listingId +
                      offer.offeror +
                      offer.totalOfferAmount.toString()
                    }
                    className="text-sm italic"
                  >
                    {ethers.utils.formatEther(offer.totalOfferAmount)}{" "}
                    {NATIVE_TOKENS[network].symbol}
                  </p>
                  {listing.sellerAddress === address && (
                    <button
                      onClick={() => {
                        acceptOffer(
                          {
                            listingId,
                            addressOfOfferor: offer.offeror,
                          },
                          {
                            onSuccess(data, variables, context) {
                              console.log("successo!", data);
                              router.replace("/");
                            },
                            onError(data, variables, context) {
                              console.log("Errore", data, variables, context);
                            },
                          }
                        );
                      }}
                      className="p-2 w-32 bg-[red] rounded-md font-bold cursor-pointer"
                    >
                      Accetta offerta
                    </button>
                  )}
                </div>
              </>
            ))}
          </div>
        )}

        {listing.type === ListingType.Auction && (
          <>
            <p>Minimo dell&apos;asta</p>
            <p>
              {minimumNextBid?.displayValue} {minimumNextBid?.symbol}
            </p>
            <p>Tempo che resta al termine: </p>
            <Countdown
              date={Number(listing.endTimeInEpochSeconds.toString()) * 1000}
            />
          </>
        )}

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
