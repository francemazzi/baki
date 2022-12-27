import React, { useState } from "react";

const Reasearch = () => {
  //poi si può espoertare su altro foglio di lavoro (se servisse ma con redux forse no)
  const [show, setShow] = useState(false);
  const handleClickOne = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  return (
    <div className="py-[20px]">
      <div className="flex flex-row items-center justify-center">
        <div className="flex items-center w-full px-2 md:px-5 py-2 bg-[#fffefe] shadow-lg rounded-lg">
          <div className="mr-[5px]">🔎</div>
          <input
            className=" outline-none w-full h-full bg-[#fffefe]"
            placeholder="Scrivi qui quello che vuoi..."
            type="text"
            onChange={handleClickOne}
          />
        </div>
        <button
          className={`px-2 md:px-5 py-2 bg-[#e9d7d7] shadow-lg font-semibold rounded-full ${
            show ? "" : "hidden"
          }`}
        >
          Cerca
        </button>
      </div>
    </div>
  );
};

export default Reasearch;
