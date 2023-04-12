import { createContext, useContext } from "react";

export const STORAGE_TOKEN = "token";

export interface UserData {
  id: number;
  email: string;
  role: string;
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
} as UserData;

const emptyUserContext = {
  userData: emptyUserData,
  login: (_token: string, _user: UserData) => {},
  logout: () => {},
};

export const UserContext = createContext(emptyUserContext);

export const useAuthentication = () => useContext(UserContext);
