import Link from "next/link";
import PROFILE_PHOTO from "../../../common/costants";
import Image from "next/image";
import Admin from "../../../pages/[admin]/Admin";
import Username from "../../../pages/[username]/Username";

type userType = {
  user: string;
  userName: string;
  producer: boolean;
};

const Login: React.FC = () => {
  // user data
  const userData: userType = {
    user: "",
    userName: "",
    producer: false,
  };

  const user = null;
  const username = false;

  return (
    <div className="w-full flex lg:flex-row sm:flex-col content-center">
      <div>
        <Link href={"/marketplace"}>
          <button>Vicino</button>
        </Link>
      </div>
      {username && (
        <div>
          {userData.producer ? (
            <div className="flex lg:flex-row sm:flex-col">
              <Link href={"/admin"}>
                <button className=" ml-[10px] mr-[10px]">
                  Carica prodotto
                </button>
              </Link>
              <Link href={`/${Username}`}>
                <div className="relative aspect-1 h-[20px] w-full cursor-pointer rounded-[10px] bg-slate-100 md:h-[543px] xl:h-[590px]">
                  <Image
                    className=" ml-[10px] mr-[10px]"
                    src={PROFILE_PHOTO}
                    alt="no-image"
                    objectFit="cover"
                    layout="fill"
                  />
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex lg:flex-row sm:flex-col">
              <div>
                <Link href={`/${Admin}`}>
                  <button className=" ml-[10px] mr-[10px]">
                    I tuoi pre-ordini
                  </button>
                </Link>
              </div>
              <div>
                <Link href={`/${Username}`}>
                  <div>Profilo</div>
                  {/* prossima feature inserire immagine profilo */}
                  {/* <div className="relative h-[5px] cursor-pointer rounded-[10px] bg-slate-100 md:h-[10px] xl:h-[10px]">
                  <Image
                    className=" ml-[10px] mr-[10px]"
                    src={PROFILE_PHOTO}
                    alt="no-image"
                    objectFit="cover"
                    layout="fill"
                  />
                </div> */}
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
      {!username && (
        <div>
          <Link href={"/enter"}>
            <button className=" ml-[10px] mr-[10px]">Accedi</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Login;