import Link from "next/link";
import PROFILE_PHOTO from "../../../common/costants";

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

  return (
    <div className=" w-full flex flex-row content-center">
      <div>
        <Link href={"/"}>
          <button>Vicino</button>
        </Link>
      </div>

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
                <Link href={"/usernamete"}>
                  <Image className=" ml-[10px] mr-[10px]" src={PROFILE_PHOTO} />
                </Link>
              </>
            ) : (
              <Link href={"/admin"}>
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
