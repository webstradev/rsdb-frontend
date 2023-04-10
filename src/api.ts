import axios from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    crossDomain?: boolean;
    xDomain?: boolean;
    xDomainRequest?: boolean;
  }
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_PATH,
  crossDomain: true,
  xDomain: true,
  xDomainRequest: true,
});
