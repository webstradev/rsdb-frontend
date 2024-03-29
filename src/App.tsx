import React, { useState } from "react";
import { Layout } from "components/Layout";
import { AuthenticatedRoute } from "components/AuthenticatedRoute";
import { ROUTES } from "routes/routes";
import { NotFound } from "routes/NotFound";
import { useRoutes, useNavigate, useLocation } from "react-router-dom";
import {
  UserData,
  emptyUserData,
  STORAGE_KEY,
  UserContext,
} from "util/useAuthentication";

const routes = [
  {
    path: "/",
    Component: Layout,
    children: ROUTES.map((route) => {
      const { path, authenticated, component } = route;

      return {
        path: path,
        element: authenticated ? (
          <AuthenticatedRoute path={path}>{component}</AuthenticatedRoute>
        ) : (
          component
        ),
      };
    }),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const cachedUserDataString = localStorage.getItem(STORAGE_KEY);
  const data = cachedUserDataString
    ? JSON.parse(cachedUserDataString)
    : emptyUserData;
  const [userData, setUserData] = useState(data);

  const login = (user: UserData) => {
    // Store jwt in browser storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

    // Set data in context
    setUserData(user);

    // Redirect to the home page or the requestedPath
    const path = location.state?.requestedPath || "/";
    navigate(path);
  };

  const logout = () => {
    // Remove jwt from browser storage
    localStorage.removeItem(STORAGE_KEY);

    // Reset user data in context
    setUserData(emptyUserData);

    // Redirect to the login page
    navigate("/");
  };

  const element = useRoutes(routes);

  return (
    <div className="App">
      <UserContext.Provider
        value={{
          userData,
          login,
          logout,
        }}
      >
        {element}
      </UserContext.Provider>
    </div>
  );
};

export default App;
