import React from "react";
import { useAuthentication } from "util/useAuthentication";
import { Navigate } from "react-router-dom";

interface AuthenticatedRouteProps {
  path: string;
  children: React.ReactNode;
}
export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  path,
  children,
}) => {
  const { userData } = useAuthentication();

  if (userData.id === 0) {
    return <Navigate to="/login" replace state={{ requestedPath: path }} />;
  }

  return <>{children}</>;
};
