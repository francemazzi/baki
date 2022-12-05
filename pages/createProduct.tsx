import React, { use, useEffect, useState } from "react";
import { Progress, Space } from "antd";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../lib/controller";
import Image from "next/image";
import v4 from "uuid";
import { NewProductType } from "../common/types";

{
  /*
    TODO

      Logica:
      - Assegnare a prodotto caricato: producer, id, img
      - Inserire metatada per collegare image a produttore e prodotto
       
*/
}

const createProduct = () => {
  // const [imgLoad, setImgLoad] = useState<File>();
  const [inputs, setInputs] = useState<NewProductType>({});
  const [downloadURL, setDownloadURL] = useState("");
  const [isUpLoading, setIsUpLoading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);

  const handleUpload = (e: any) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    const files = e.currentTarget.files;

    // IL PROBLEMA è che stai impostando n file non una sola immagine quindi non riesci a salvare tutto
    //Per img la salverà ma non per gli altri dati -> possibile soluzione, specificarlo dentro img

    //OPPURE metti la lettura dell'evento direttamente sul'inpt e non su handleUpload (coem avevi fatto su github)

    //if (value && value[0].size < 1000000000000)

    if (value) {
      setInputs((values) => ({ ...values, [name]: value }));
    } else if (files) {
      setInputs((values) => ({ ...values, [name]: files[0] }));
      console.log(files[0]);
      // setImgLoad(files[0]);
    } else {
      alert("File troppo grande!");
    }
  };

  // INPUT FORM string (da unire poi con image)
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(inputs);
  };

  const handleClickUpload = () => {
    if (inputs.img) {
      const name = inputs.img.name;
      console.log(inputs.img);
      console.log(inputs);
      const storageRef = ref(storage, `images/products/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, inputs.img);

      //Operazione storage immagine
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgressUpload(progress); //mostrare caricamento
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            //upload url
            setDownloadURL(url);
          });
        }
      );
    } else {
      console.log("errore caricament");
    }
  };

  //remove image file
  const handleRemoveFile = () => setInputs({});
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center">
        <h3 className="text-[20px] my-[10px] text-center">
          Carica i tuoi prodotti
        </h3>
        <form onSubmit={handleSubmit}>
          {/* title */}
          <div className="">
            <h3>Carica il nome</h3>
            <div>
              <input
                className="shadow-sm border-r-zinc-500"
                onChange={handleUpload}
                name="title"
                type="text"
                value={inputs.title || ""}
              />
            </div>
          </div>
          {/* Description */}
          <div className="">
            <h3>Aggiungi una descrizione</h3>
            <div>
              <input
                className="shadow-sm border-r-zinc-500"
                onChange={handleUpload}
                name="Description"
                type="text"
                value={inputs.Description || ""}
              />
            </div>
          </div>
          {/* Ingredient */}
          <div className="">
            <h3>Aggiungi gli ingredienti</h3>
            <div>
              <input
                className="shadow-sm border-r-zinc-500"
                onChange={handleUpload}
                name="Ingredient"
                type="text"
                value={inputs.Ingredient || ""}
              />
            </div>
          </div>
          {/* Abbinamenti */}
          <div className="">
            <h3>Carica un Abbinamento con il prodotto</h3>
            <div>
              <input
                className="shadow-sm border-r-zinc-500"
                onChange={handleUpload}
                name="Abbinamenti"
                type="text"
                value={inputs.Abbinamenti || ""}
              />
            </div>
          </div>
          {/* disponibile */}
          <div className="">
            <h3>Carica una quantità disponibile</h3>
            <div>
              <input
                className="shadow-sm border-r-zinc-500"
                onChange={handleUpload}
                name="disponibile"
                type="text"
                value={inputs.disponibile || ""}
              />
            </div>
          </div>

          {/* img */}
          <h3>Carica la foto</h3>
          <div className="flex flex-col">
            <input
              type="file"
              name="img"
              value={inputs.img || ""}
              // onChange={(e) => {
              //   handleUpload(e.target.files);
              // }}
              onChange={handleUpload}
            />
          </div>
        </form>
        <div className="fle flex-col justify-center items-center shadow-md my-[10px]">
          <div>
            {inputs.img && (
              <div className="flex flex-col p-[20px] shadow-md">
                <div className="my-[5px]">{"Nome: " + inputs.img?.name}</div>
                <div className="my-[5px]">
                  {"Dimensione: " + inputs.img?.size}
                </div>
                {/* set -> isuploading */}
                <button
                  className="p-[10px] shadow-lg rounded-md"
                  onClick={handleClickUpload}
                >
                  Carica
                </button>
                {progressUpload > 0 ? (
                  <Progress percent={progressUpload} />
                ) : (
                  <div></div>
                )}
              </div>
            )}

            {/* SHOW UPLOAD CARD */}
            <div className="px-[10px] relative">
              {downloadURL && (
                <div>
                  <div className=" absolute top-0 right-0">
                    <button onClick={handleRemoveFile}>❌</button>
                  </div>
                  <div className="p-[6rem] shadow-md rounded-md">
                    <div className="h-[5rem] w-[10rem] relative">
                      <Image
                        src={downloadURL}
                        alt={"downloadURL"}
                        objectFit="cover"
                        layout="fill"
                        className="rounded-t-md"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default createProduct;
