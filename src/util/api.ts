/**
 * Module for handling HTTP requests using Axios.
 *
 * It exports an instance of Axios with a base URL set to the API endpoint defined in the environment variables.
 * The instance is created with cross-domain options enabled and an interceptor to add the JWT token to the Authorization header.
 *
 * It also exports a utility function to retrieve the authentication token from the browser's local storage.
 */
import axios, { InternalAxiosRequestConfig } from "axios";
import { STORAGE_KEY } from "./useAuthentication";

declare module "axios" {
  export interface AxiosRequestConfig {
    crossDomain?: boolean;
    xDomain?: boolean;
    xDomainRequest?: boolean;
  }
}

/**
 * Returns the authentication token stored in local storage if it exists.
 *
 * @returns {string | null} The authentication token or null if it does not exist.
 */ export const getAuthToken = () => {
  const userDataString = localStorage.getItem(STORAGE_KEY);
  const data = userDataString ? JSON.parse(userDataString) : null;
  return data?.token;
};

/**
 * Creates an axios instance with the baseURL set to the API path specified in the environment variables.
 * Includes an interceptor that adds an authorization token to the header of each request if a token exists in local storage.
 * @returns {AxiosInstance} The configured axios instance.
 */
const createApi = () => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_PATH,
    crossDomain: true,
    xDomain: true,
    xDomainRequest: true,
  });

  // Intercept the request and add the authorization token to the header
  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const authToken = getAuthToken();

    // If no token exists in the browser then we continue normally.
    if (!authToken) return config;

    // If we have a token we add it as the bearer to the authorization header
    config.headers["Authorization"] = `Bearer ${authToken}`;
    return config;
  });

  return api;
};

// Create a global API
export const api = createApi();
