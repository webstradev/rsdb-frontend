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
    responseCallback: (res: AxiosResponse) => void
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
    responseCallback: (res: AxiosResponse) => void
  ) => {
    setLoading(true);
    try {
      const res = await apiMethodMap[method](path, body);
      setStatus(res.status);
      handleResponse(res);
      responseCallback(res);
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
  }, []);

  return { status, statusText, data, error, loading, sendToAPI };
};
