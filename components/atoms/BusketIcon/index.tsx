import React from "react";

type buttonAddType = {
  onClick?: () => void;
};

const BusketIcon: React.FC<buttonAddType> = ({ onClick }) => {
  return (
    <div>
      <div>
        <button
          className="bg-[#FFF] shadow-md h-[40px] w-[40px] rounded-full hover:scale-105 transition-all duration-150 aese-out"
          onClick={onClick}
        >
          🧺
        </button>
      </div>
    </div>
  );
};

export default BusketIcon;
