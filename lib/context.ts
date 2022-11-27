import React from "react";
import { createContext } from "react";

type userType = {
  user: string;
  userName: string;
  producer: boolean;
};

const UserContext = React.createContext<userType>({
  user: "",
  userName: "",
  producer: false,
});

export { UserContext };
