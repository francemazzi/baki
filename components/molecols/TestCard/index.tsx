import {
  DocumentData,
  onSnapshot,
  QuerySnapshot,
  snapshotEqual,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { produtsCollection } from "../../../lib/controller";
import { NewProductType } from "../../../common/types";

function TestCard() {
  const [products, setProducts] = useState<NewProductType[]>([]);

  useEffect(
    () =>
      onSnapshot(produtsCollection, (snapshot: QuerySnapshot<DocumentData>) => {
        setProducts(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          })
        );
      }),
    []
  );
  console.log(products, "products");
  return (
    <div>
      <div>
        {products && products.length ? (
          <div>{products?.map((product) => product.title)}</div>
        ) : (
          <div>Attendi</div>
        )}
      </div>
      <div>
        {products && products.length ? (
          <div>{products?.map((product) => product.producer)}</div>
        ) : (
          <div>Attendi</div>
        )}
      </div>
    </div>
  );
}

export default TestCard;
