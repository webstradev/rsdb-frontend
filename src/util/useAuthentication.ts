import { createContext, useContext } from "react";

export const STORAGE_KEY = "userData";

export interface UserData {
  id: number;
  email: string;
  role: string;
  token: string;
}

export type UserContextType = {
  userData: UserData;
  login: (token: string, user: UserData) => void;
  logout: () => void;
};

export const emptyUserData = {
  id: 0,
  email: "",
  role: "user",
  token: "",
} as UserData;

const emptyUserContext = {
  userData: emptyUserData,
  login: (_user: UserData) => {},
  logout: () => {},
};

export const UserContext = createContext(emptyUserContext);

export const useAuthentication = () => useContext(UserContext);
