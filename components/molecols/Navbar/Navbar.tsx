import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TEST_OFFLINE_NAVBAR } from "../../../common/costants";
import Burger from "../burgerMenu/Burger";
import Login from "../Login/Login";
import { UserContext } from "../../../lib/context";
import BusketIcon from "../../atoms/BusketIcon";
import { useContext } from "react";

type userType = {
  user: string;
  userName: string;
  producer: boolean;
};

function Navbar() {
  //UserContext
  const { user, userName, producer } = useContext(UserContext);
  //   const router = useRouter();
  const [currentRoute, setCurrentRoute] = useState<string>();
  const [isScrolled, setIsScrolled] = useState<boolean>();
  const [width, setWidth] = useState(
    typeof window !== "undefined" && window.innerWidth
  );
  const breakPoint: number = 550;

  //Router modify
  //   useEffect(() => {
  //     const pathName = router.pathname;
  //     setCurrentRoute(pathName);
  //   }, []);

  //scroll menu trasnparent
  //scroll menu trasnparent

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const changeWidth = () => setWidth(window.innerWidth);
    window.addEventListener("resize", changeWidth);

    return window.removeEventListener("resize", changeWidth);
  }, [width]);

  return (
    <div>
      <div
        className={`${
          isScrolled
            ? "bg-[#ffffff09] w-full shadow-md flex flex-row content-center justify-center items-center"
            : "bg-neutral-50 w-full shadow-md flex flex-row content-center justify-center items-center"
        }`}
      >
        <div className="w-full flex flex-row content-between items-center justify-between">
          <div className="text-[1.375rem] font-bold p-[16px] ">
            <Link href={"/"}>
              <button>{TEST_OFFLINE_NAVBAR[0].logo}</button>
            </Link>
          </div>
          <div className=" hidden lg:flex lg:flex-row content-center">
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
          <div className="lg:hidden">
            <Burger onClick={() => {}} href="" disabled />
          </div>
        </div>
        <div className="pr-[1rem]">
          <BusketIcon />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
