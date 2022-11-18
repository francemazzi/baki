import React, { useEffect, useState } from "react";
import { TEST_OFFLINE_NAVBAR } from "../../../common/costants";
import Burger from "../burgerMenu/Burger";

function Navbar() {
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
    <div
      className={`${
        isScrolled
          ? "bg-[#ffffff09] w-full shadow-md flex flex-row content-around"
          : "bg-neutral-50 w-full shadow-md flex flex-row content-around"
      }`}
    >
      <div className="text-[1.375rem] font-bold p-[16px]">
        {TEST_OFFLINE_NAVBAR[0].logo}
      </div>
      {width > breakPoint ? (
        TEST_OFFLINE_NAVBAR[0].link.map((nm, i) => {
          return (
            <div key={i} className="content-center">
              <a className="text-black px-5 py-2 font-bold  hover:text-[#CDFCF6]">
                {nm.name}
              </a>
            </div>
          );
        })
      ) : (
        <Burger />
      )}
    </div>
  );
}

export default Navbar;
