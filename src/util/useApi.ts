/**
 * Custom hook for making HTTP requests to the API using the Axios library.
 * @param method The HTTP method to use (e.g. "get", "post", "put", "delete").
 * @param path The API endpoint to send the request to.
 * @returns An object containing the current status, status text, data, error, loading state,
 * and a function to send a request to the API.
 */
import { useState, useEffect } from "react";
import { api } from "util/api";
import { useAuthentication } from "./useAuthentication";
import { AxiosResponse, AxiosRequestConfig } from "axios";

export type TApiResponse = {
  status: number;
  statusText: string;
  data: any;
  error: any;
  loading: boolean;
  sendToAPI: (
    body: any,
    responseCallback?: (res: AxiosResponse) => void
  ) => void;
};

const apiMethodMap = {
  post: api.post,
  put: api.put,
  delete: api.delete,
} as {
  [key: string]: <T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => Promise<R>;
};

export const useApi = (method: string, path: string): TApiResponse => {
  const [status, setStatus] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const { logout } = useAuthentication();

  const handleResponse = (res: AxiosResponse) => {
    setStatus(res.status);
    setStatusText(res.statusText);
    setData(res.data);
    setError(null);
  };

  const handleError = (error: any) => {
    if (error.response?.status === 401) {
      logout();
      return;
    }
    setError(error);
  };

  const sendToAPI = async (
    body: any,
    // The optional response callback is to be used in cases where the state is needed in the same function
    // that calls sendToAPI due to React not being able to guarantee that
    // setState will have completed before completed execution.
    responseCallback?: (res: AxiosResponse) => void
  ) => {
    setLoading(true);
    try {
      const res = await apiMethodMap[method](path, body);
      setStatus(res.status);
      handleResponse(res);
      if (responseCallback) {
        responseCallback(res);
      }
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const getFromAPI = async () => {
    setLoading(true);
    try {
      const res = await api.get(path);
      handleResponse(res);
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (method === "get") {
      getFromAPI();
    }
  }, [method, path]);

  return { status, statusText, data, error, loading, sendToAPI };
};
