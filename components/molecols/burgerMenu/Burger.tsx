import React, { useState } from "react";
import { TEST_OFFLINE_NAVBAR } from "../../../common/costants";

interface burgerMenu {
  onClick: () => void;
  href: string;
  disabled: boolean;
}

const Burger: React.FC<burgerMenu> = ({
  onClick = () => {},
  href,
  disabled = false,
}) => {
  const [popup, setPopup] = useState(false);

  const handleClick = () => {
    if (!popup) {
      setPopup(true);
      onClick();
    } else {
      setPopup(false);
      onClick();
    }
  };

  return (
    <div>
      <div className="p-[22px]">
        {!popup ? (
          <button className=" font-bold" onClick={handleClick}>
            Menu
          </button>
        ) : (
          <button className="hover:text-[red] font-bold" onClick={handleClick}>
            Chiudi
          </button>
        )}

        {popup && (
          <div className="flex flex-col">
            {TEST_OFFLINE_NAVBAR[0].link.map((nm, i) => {
              return (
                <div key={i} className="content-center">
                  <a className="text-black px-5 py-2 font-bold hover:text-[#CDFCF6]">
                    {nm.name}
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Burger;
