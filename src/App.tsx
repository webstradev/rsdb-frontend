import React, { useState } from "react";
import { Layout } from "components/Layout";
import { ROUTES } from "routes/routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  UserData,
  emptyUserData,
  STORAGE_TOKEN,
  UserContext,
} from "util/useAuthentication";

const AppRouter = createBrowserRouter(
  ROUTES.map((route) => {
    const { path, component } = route;

    return {
      path: path,
      element: <Layout>{component}</Layout>,
    };
  })
);

export const App: React.FC = () => {
  const [userData, setUserData] = useState(emptyUserData);

  const login = (token: string, user: UserData) => {
    // Store jwt in browser storage
    localStorage.setItem(STORAGE_TOKEN, token);

    // Set data in context
    setUserData(user);
  };

  const logout = () => {
    // Remove jwt from browser storage
    localStorage.removeItem(STORAGE_TOKEN);

    // Reset user data in context
    setUserData(emptyUserData);
  };

  return (
    <div className="App">
      <UserContext.Provider
        value={{
          userData,
          login,
          logout,
        }}
      >
        <RouterProvider router={AppRouter} />
      </UserContext.Provider>
    </div>
  );
};

export default App;
