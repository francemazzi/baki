import React from "react";
import ProductCard from "../ProductCard";
import { PRODOTTI } from "../../../common/costants";

const ProductList = () => {
  return (
    <div className="flex flex-row items-center justify-center flex-wrap">
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
