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
import { url } from "inspector";

const createProduct = () => {
  const [imgLoad, setImgLoad] = useState<File>();
  const [downloadURL, setDownloadURL] = useState("");
  const [isUpLoading, setIsUpLoading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);

  const handleUploadImage = (files: any) => {
    if (files && files[0].size < 1000000000000) {
      setImgLoad(files[0]);
    } else {
      alert("File troppo grande!");
    }
  };

  const handleClickUpload = () => {
    if (imgLoad) {
      const name = imgLoad.name;
      const storageRef = ref(storage, `images/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imgLoad);
      //Operazione storage
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgressUpload(progress); //mostrare caricamento
          console.log("Upload is " + progress + "% done");
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
  return (
    <div className="flex flex-col items-center justify-center">
      {/* title */}
      {/* <div className="">
        <h3>Carica il nome</h3>
        <div>
          <input type="file" />
        </div>
      </div> */}

      {/* Image */}
      <div className="flex flex-col justify-center">
        <h3 className="text-[20px] my-[10px] text-center">
          Carica i tuoi prodotti
        </h3>
        <div className="flex flex-col">
          <input
            type="file"
            onChange={(e) => {
              handleUploadImage(e.target.files);
            }}
          />
        </div>
        <div className="fle flex-col justify-center items-center shadow-md my-[10px]">
          <div>
            {imgLoad && (
              <div className="flex flex-col p-[20px] shadow-md">
                <div className="my-[5px]">{"Nome: " + imgLoad.name}</div>
                <div className="my-[5px]">{"Dimensione: " + imgLoad.size}</div>
                {/* set -> isuploading */}
                <button
                  className="p-[10px] shadow-lg rounded-md"
                  onClick={handleClickUpload}
                >
                  Carica
                </button>
                {progressUpload && <Progress percent={progressUpload} />}
              </div>
            )}
            {downloadURL && (
              <div className="p-[6rem] shadow-md rounded-md">
                <div className="w-[5rem] h-[5rem] relative">
                  <Image
                    src={downloadURL}
                    alt={downloadURL}
                    objectFit="cover"
                    layout="fill"
                    className="rounded-t-md"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default createProduct;
