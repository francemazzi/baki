import Link from "next/link";
import PROFILE_PHOTO from "../../../common/costants";
import Image from "next/image";
import Admin from "../../../pages/[admin]/Admin";

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
  const username = null;

  return (
    <div className=" w-full flex flex-row content-center">
      <div>
        <Link href={"/"}>
          <button>Vicino</button>
        </Link>
      </div>
      {/* TODO
metere boolean che riconosce accedi o no

*/}
      <div>
        {userData.userName ? (
          <>
            {userData.producer ? (
              <>
                <Link href={"/admin"}>
                  <button className=" ml-[10px] mr-[10px]">
                    Carica prodotto
                  </button>
                </Link>
                <Link href={`/${username}`}>
                  <div className="relative aspect-1 h-[20px] w-full cursor-pointer rounded-[10px] bg-slate-100 md:h-[543px] xl:h-[590px]">
                    <Image
                      className=" ml-[10px] mr-[10px]"
                      src={"/img/userPhoto.png"}
                      alt="no-image"
                      objectFit="cover"
                      layout="fill"
                    />
                  </div>
                </Link>
              </>
            ) : (
              <Link href={`/${Admin}`}>
                <button className=" ml-[10px] mr-[10px]">
                  I tuoi pre-ordini
                </button>
              </Link>
            )}
          </>
        ) : (
          <div>
            <div className=" ml-[10px] mr-[10px]">Accedi</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
