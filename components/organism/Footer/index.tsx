import Link from "next/link";
import React from "react";
import { TEST_OFFLINE_NAVBAR } from "../../../common/costants";
import InputBox from "../../atoms/InputBox";
import Login from "../../molecols/Login/Login";

const Footer = () => {
  return (
    <div className=" flex flex-col justify-center items-center mt-[3rem] shadow-inner p-[10px]">
      <div className="flex flex-col justify-center items-center">
        <h2 className="p-[10px]">Iscriviti ora alla Newsletter! 📧</h2>
        <InputBox placeHolderText="Scrivi qui la tua email ora!" />
      </div>
      {/* navlist */}
      <div className="py-[15px] flex flex-col lg:flex-row items-center justify-center">
        {TEST_OFFLINE_NAVBAR[0].link.map((nm, i) => {
          return (
            <div key={i} className="content-center">
              <Link
                href={nm.href}
                className="text-black px-5 py-2 font-bold hover:text-[#CDFCF6]"
              >
                {nm.name}
              </Link>
            </div>
          );
        })}
        <div>
          <Login />
        </div>
      </div>
      <div className="text-[1.375rem] font-bold p-[5px] ">
        <Link href={"/"}>
          <button>{TEST_OFFLINE_NAVBAR[0].logo}</button>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
