import React from "react";
import { buttonType } from "../../../common/types";

const Button: React.FC<buttonType> = ({ text, color, textColor }) => {
  return (
    <div
      className={`flex flex-col bg-[${color}] hover:bg-[#ff8066af] p-[10px] shadow-lg rounded-md items-center justify-center`}
    >
      <div className={`text-[16px] text-[${textColor}]`}>{text}</div>
    </div>
  );
};

export default Button;
