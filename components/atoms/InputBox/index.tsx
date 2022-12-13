import React from "react";
type inputType = {
  placeHolderText: string;
};

const InputBox: React.FC<inputType> = ({ placeHolderText }) => {
  return (
    <div className="flex flex-col w-full text-center justify-center px-[10px]">
      <input
        placeHolder={placeHolderText}
        type="text"
        name="subscribe-Newsletter"
        width="w-full"
        className="text-center border-slate-500 bg-[#f3f1f1]  p-[5px] rounded-md text-[16px] shadow-lg"
      />
    </div>
  );
};

export default InputBox;
