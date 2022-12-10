import React from "react";
import ProductCard from "../ProductCard";
import { PRODOTTI } from "../../../common/costants";

type TProductList = {
  scrollMode?: string;
};

const ProductList: React.FC<TProductList> = ({ scrollMode }) => {
  return (
    <div className={`flex flex-row items-center justify-center ${scrollMode}`}>
      {PRODOTTI.map((i, id) => {
        return (
          <div key={id}>
            <ProductCard
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
