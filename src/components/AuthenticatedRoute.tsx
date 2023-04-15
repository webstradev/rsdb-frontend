/**
 * This file exports an `AuthenticatedRoute` component which can be used in place of a `Route` component from `react-router-dom`
 * to create a route that requires the user to be authenticated before it can be accessed.
 *
 * @remarks
 * This component checks whether the user is authenticated by calling the `useAuthentication` hook, and redirects to the
 * `/login` route if the user is not authenticated.
 *
 * @param path - The path of the route to render.
 * @param children - The children to render when the route is accessed and the user is authenticated.
 *
 * @returns A React component that renders the `children` if the user is authenticated, or a redirect to `/login` otherwise.
 *
 * @example
 * ```
 * import { AuthenticatedRoute } from './AuthenticatedRoute';
 *
 * // Renders a protected route that requires the user to be authenticated
 * <AuthenticatedRoute path='/dashboard'>
 *   <Dashboard />
 * </AuthenticatedRoute>
 * ```
 *
 * @see {@link https://reactrouter.com/web/api/Route | Route}
 */

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
