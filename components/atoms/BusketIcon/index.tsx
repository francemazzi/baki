import React from "react";

type buttonAddType = {
  onClick?: () => void;
};

const BusketIcon: React.FC<buttonAddType> = ({ onClick }) => {
  return (
    <div>
      <div>
        <button
          className="bg-[#FFF] shadow-md h-[40px] w-[40px] rounded-full"
          onClick={onClick}
        >
          🧺
        </button>
      </div>
    </div>
  );
};

export default BusketIcon;
