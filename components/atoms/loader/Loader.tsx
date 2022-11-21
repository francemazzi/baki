import React from "react";

interface showInterface {
  show: boolean;
}

const Loader: React.FC<showInterface> = ({ show }) => {
  return show ? (
    <div className="border-solid border-gray-200 border-t-[#ff00006b] rounded-full w-[50px] h-[50px] animate-spin border-t-[10px] border-[10px]"></div>
  ) : (
    <div>Errore caricamento</div>
  );
};

export default Loader;
