import {
  DocumentData,
  onSnapshot,
  QuerySnapshot,
  snapshotEqual,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { produtsCollection, storage } from "../../../lib/controller";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { NewProductType } from "../../../common/types";
import Image from "next/image";

function TestCard() {
  const [products, setProducts] = useState<NewProductType[]>([]);
  const [imageList, setImageList] = useState<string>();

  //Richiamo dati
  const imageListRef = ref(storage, "images/");

  //download data string
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

  //   download image
  //   TODO
  //risolvere bug img download
  useEffect(() => {
    console.log(imageListRef, "images");
    // listAll(imageListRef).then((response) => {
    //   response.items.forEach((item) => {
    //     getDownloadURL(item).then((url) => {
    //       setImageList((prev) => [...prev, url]);
    //     });
    //   });
    // });
  }, []);

  console.log(products, "products");
  return (
    <div>
      <div>
        {products && products.length ? (
          <div>
            {products?.map((product) => (
              <div key={product.id}>{product.title}</div>
            ))}
          </div>
        ) : (
          <div>Attendi</div>
        )}
      </div>
      <div>
        {products && products.length ? (
          <div>
            {products?.map((product) => (
              <div key={product.id}>
                <div>{product.Description}</div>
                {/* <div className="h-[20px] w-[20px] relative">
                  <Image
                    src={product?.img}
                    alt="photo not upload"
                    objectFit="cover"
                    layout="fill"
                  />
                </div> */}
              </div>
            ))}
          </div>
        ) : (
          <div>Attendi</div>
        )}
      </div>
    </div>
  );
}

export default TestCard;
