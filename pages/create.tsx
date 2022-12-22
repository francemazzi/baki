import React, { useState } from "react";
import { Router, useRouter } from "next/router";
//web3
import {
  useContract,
  useAddress,
  MediaRenderer,
  useNetwork,
  useNetworkMismatch,
  useOwnedNFTs,
  useCreateAuctionListing,
  useCreateDirectListing,
} from "@thirdweb-dev/react";
import {
  ChainId,
  NFT,
  NATIVE_TOKENS,
  NATIVE_TOKEN_ADDRESS,
} from "@thirdweb-dev/sdk";
import { chain } from "wagmi-core";
import network from "../utils/network";

const Create = () => {
  //router
  const router = useRouter();

  //Seleziona nft
  const [selectNFT, setSelectNFT] = useState<NFT>();

  //adre thirdweb
  const adress = useAddress();

  //contratto marketplace
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
    "marketplace"
  );
  //contratto collezione nft
  const { contract: collectionContract } = useContract(
    process.env.NEXT_PUBLIC_COLLECTION_CONTRACT,
    "nft-collection"
  );

  //scaricare nft caricati
  const ownedNfts = useOwnedNFTs(collectionContract, adress);

  //listing nft

  //controllo se network è sbagliato
  const networkMismatch = useNetworkMismatch();
  //destrutturo e cambio con seconda rete -> ritorna due elementi
  const [, switchNetwork] = useNetwork();

  //check radio button create Direct Listing
  const {
    mutate: createDirectListing,
    isLoading,
    error,
  } = useCreateDirectListing(contract);

  //check radio button create Auction Listing
  const {
    mutate: createAuctionListing,
    isLoading: isLoadingDirect,
    error: errorDirect,
  } = useCreateAuctionListing(contract);

  const handleCreateListing = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //controllo se network è corretto
    if (networkMismatch) {
      switchNetwork && switchNetwork(network);
      return;
    }
    //non hai slezionato nft
    if (!selectNFT) return;

    const target = e.target as typeof e.target & {
      elements: { listingType: { value: string }; price: { value: string } };
    };
    const { listingType, price } = target.elements;

    //se corrisponde
    //TODO -> inserire quantità maggiore di 1
    if (listingType.value === "directListing") {
      createDirectListing(
        {
          assetContractAddress: process.env.NEXT_PUBLIC_COLLECTION_CONTRACT!,
          tokenId: selectNFT.metadata.id,
          currencyContractAddress: NATIVE_TOKEN_ADDRESS,
          listingDurationInSeconds: 60 * 60 * 24 * 7, //week
          quantity: 1,
          buyoutPricePerToken: price.value,
          startTimestamp: new Date(),
        },
        {
          onSuccess(data, variables, context) {
            console.log(data, variables, context);
            router.push("/");
          },
          onError(data, variables, context) {
            console.log(data, variables, context);
          },
        }
      );
    }
    if (listingType.value === "auctionListing") {
      createAuctionListing(
        {
          assetContractAddress: process.env.NEXT_PUBLIC_COLLECTION_CONTRACT!,
          buyoutPricePerToken: price.value,
          tokenId: selectNFT.metadata.id,
          startTimestamp: new Date(),
          currencyContractAddress: NATIVE_TOKEN_ADDRESS,
          listingDurationInSeconds: 60 * 60 * 24 * 7, //week
          quantity: 1,
          reservePricePerToken: 0,
        },
        {
          onSuccess(data, variables, context) {
            console.log(data, variables, context);
            router.push("/");
          },
          onError(data, variables, context) {
            console.log(data, variables, context);
          },
        }
      );
    }
  };

  return (
    <div>
      <main className="flex flex-col justify-center mx-[10px] my-[10px]">
        <h1 className="text-[22px] font-bold text-center">Carica e vendi!</h1>
        <h2 className="text-center">
          Sleziona il prodotto che vuoi vendere e scegli il suo prezzo di
          vendita
        </h2>
        <div className="my-[20px] flex overflow-x-scroll space-x-2 p-4 ">
          {ownedNfts?.data?.map((nft) => {
            return (
              <div
                key={nft.metadata.id}
                className={`flex flex-col p-[10px] space-y-2 card min-w-fit shadow-md rounded-md  ${
                  nft.metadata.id === selectNFT?.metadata.id
                    ? "animate-pulse bg-slate-300"
                    : " border-transparent"
                }`}
                onClick={() => setSelectNFT(nft)}
              >
                <MediaRenderer
                  className="h-15 w-full rounded-md"
                  src={nft.metadata.image}
                />
                <h3 className="text-[18px] font-semibold">
                  {nft.metadata.name}
                </h3>
                <p>
                  {nft.metadata.description?.slice(0, 40) +
                    "..." +
                    nft.metadata.description?.slice(-4)}
                </p>
              </div>
            );
          })}
        </div>
        {selectNFT && (
          <form onSubmit={handleCreateListing}>
            <div className="flex flex-col justify-center px-10">
              <div className="grid grid-cols-2 gap-5">
                <label className="border-r font-light">Crea il prezzo</label>
                <input
                  className="ml-auto  w-6 h-6"
                  type="radio"
                  name="listingType"
                  value="directListing"
                />
                <label className="border-r font-light">Crea base asta</label>
                <input
                  className="ml-auto w-6 h-6"
                  type="radio"
                  name="listingType"
                  value="auctionListing"
                />

                <label className="border-r font-light">Prezzo</label>
                <input
                  className="formField rounded-md"
                  type="text"
                  placeholder="0.001"
                  name="price"
                />
              </div>
              <button
                type="submit"
                className="p-[10px] text-center text-[black] shadow-lg rounded-md my-[10px] hover:p-[12px] hover:shadow-xl"
              >
                Carica ora!
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default Create;
