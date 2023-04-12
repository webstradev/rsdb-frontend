import { createContext, useContext } from "react";

export const STORAGE_TOKEN = "token";

interface UserData {
  id: number;
  email: string;
  role: string;
}

export type UserContextType = {
  userData: UserData;
  login: (token: string, email: string, role: string) => void;
  logout: () => void;
};

export const emptyUserData = {
  id: 0,
  email: "",
  role: "user",
};

const emptyUserContext = {
  userData: emptyUserData,
  login: (_token: string, _email: string, _role: string) => {},
  logout: () => {},
};

export const UserContext = createContext(emptyUserContext);

export const useAuthentication = () => useContext(UserContext);
