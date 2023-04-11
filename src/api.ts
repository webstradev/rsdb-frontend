import axios, { InternalAxiosRequestConfig } from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    crossDomain?: boolean;
    xDomain?: boolean;
    xDomainRequest?: boolean;
  }
}

export const getAuthToken = () => localStorage.getItem("token");

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
