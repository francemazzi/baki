import React from "react";
import { buttonType } from "../../../common/types";
//ff7f66
const Button: React.FC<buttonType> = ({
  text,
  color,
  textColor,
  colorHover,
}) => {
  return (
    <div
      className={`flex flex-col bg-[${color}] hover:bg-[${colorHover}] p-[10px] shadow-lg rounded-md items-center justify-center`}
    >
      <div className={`text-[16px] text-[${textColor}]`}>{text}</div>
    </div>
  );
};

export default Button;
