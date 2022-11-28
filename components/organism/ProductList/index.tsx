import React from "react";
import ProductCard from "../ProductCard";
import { PRODOTTI } from "../../../common/costants";

const ProductList = () => {
  return (
    <>
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
    </>
  );
};

export default ProductList;
