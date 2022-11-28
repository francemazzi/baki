import React from "react";

const ProductCard = () => {
  return (
    <div className="m-[15px]">
      <div className="flex flex-col justify-center w-[12rem] shadow-md rounded-md">
        {/* foto prodotto + add cart */}
        <div className="flex flex-col justify-end h-[10rem] bg-[red] rounded-t-md ">
          {/* bg ha foto prodotto */}
          <div className="flex flex-row items-center justify-around pb-[5px]">
            <div>N° portate</div>
            <div>
              <button className="bg-[#FFF] h-[40px] w-[40px] rounded-full">
                🧺
              </button>
            </div>
          </div>
        </div>
        {/* dettagli produttore */}
        <div className="mt-[15px] pl-[5px]">
          <div className=" pb-[5px]">titolo</div>
          <div className="pt-[5px] pb-[5px] ">produttore</div>
          {/* Prezzo - quantità */}
          <div className="flex flex-row items-center justify-around pt-[5px] pb-[5px]">
            <div>Prezzo</div>
            <div>N° portate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
