import { useState, useEffect } from "react";
import { api } from "util/api";
import { useAuthentication } from "./useAuthentication";

export type TApiResponse = {
  status: number;
  statusText: string;
  data: any;
  error: any;
  loading: boolean;
};

export const useApiGet = (path: string): TApiResponse => {
  const [status, setStatus] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const { logout } = useAuthentication();

  const getFromAPI = async () => {
    setLoading(true);

    try {
      const res = await api.get(path);
      setStatus(res.status);
      setStatusText(res.statusText);
      setData(res.data);
      setError(null);
      setLoading(false);
    } catch (error: any) {
      if (error.response?.status === 401) {
        logout();
      }
      setError(error);
    }

    setLoading(false);
  };
  useEffect(() => {
    getFromAPI();
  }, []);

  return { status, statusText, data, error, loading };
};
