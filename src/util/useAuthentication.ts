/**
 * This file contains the user authentication related functionality for the application.
 *
 * It exports:
 * - STORAGE_KEY: a constant storing the key for the user data in local storage
 * - UserData interface: defining the structure of the user data object
 * - UserContextType type: defining the structure of the user context object that's used in the authentication flow
 * - emptyUserData: a constant representing an empty user data object
 * - UserContext: a context object created using React's createContext API with initial value of emptyUserContext
 * - useAuthentication: a hook function that returns the UserContext object that can be used for accessing the user data and auth methods
 */
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
