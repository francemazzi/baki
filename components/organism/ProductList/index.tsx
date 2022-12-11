import React from "react";
import ProductCard from "../ProductCard";
import { PRODOTTI } from "../../../common/costants";
import Link from "next/link";

type TProductList = {
  scrollMode?: string;
  justify?: string;
  productId?: string;
};

const ProductList: React.FC<TProductList> = ({ scrollMode, justify }) => {
  return (
    <div className={`flex flex-row items-center ${justify} ${scrollMode}`}>
      {PRODOTTI.map((i, id) => {
        return (
          <div key={id}>
            <ProductCard
              linkPage={`/marketplace/${i.titolo}`}
              foto={i.foto}
              titolo={i.titolo}
              produttore={i.produttore}
              categoria={i.categoria}
              prezzo={i.prezzo}
              portate={i.portate}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
