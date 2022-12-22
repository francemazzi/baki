import React from "react";
import ProductCard from "../ProductCard";
import { PRODOTTI } from "../../../common/costants";
import Link from "next/link";
import Loader from "../../atoms/loader/Loader";
//loading foto
import loadingFoto from "../../../public/img/loading.png";
//web3
import {
  ChainId,
  ThirdwebProvider,
  useContract,
  useActiveListings,
} from "@thirdweb-dev/react";
import ProductCardNFT from "../ProductCardNFT";

type TProductList = {
  scrollMode?: string;
  justify?: string;
  productId?: string;
};

const ProductListNFT: React.FC<TProductList> = ({ scrollMode, justify }) => {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
    "marketplace"
  );
  const { data: listings, isLoading: loadingListing } =
    useActiveListings(contract);

  return (
    <div
      className={`flex flex-row my-[10px] items-center ${justify} ${scrollMode}`}
    >
      {loadingListing ? (
        <div>
          <Loader show={true} />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-auto">
          {listings?.map((listing) => {
            return (
              <div key={listing.id}>
                <ProductCardNFT
                  foto={listing ? listing.asset.image : loadingFoto}
                  titolo={listing.asset.name}
                  prezzo={listing.buyoutCurrencyValuePerToken.displayValue}
                  listing={listing.id}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductListNFT;

//   titolo,
//   produttore,
//   categoria,
//   prezzo,
//   portate,
//   linkPage,
