import React from "react";
import TestCard from "../../components/molecols/TestCard";
import ProductList from "../../components/organism/ProductList";

function marketplace() {
  return (
    <div>
      <div>
        <ProductList scrollMode="flex-wrap" justify="justify-center" />
        {/*  */}
        {/* test scheda prodotto*/}
        {/* <TestCard /> */}
      </div>
    </div>
  );
}

export default marketplace;
