// hooks/useFetch.tsx
import axios from "axios";
import { useState, useEffect } from "react";

interface UseFetchReturn<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

const useFetch = <T = unknown>(api: string): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.get<T>(api, {
          signal: controller.signal,
        });
        if (mounted) setData(response.data);
      } catch (err) {
        if (mounted && axios.isAxiosError(err)) {
          setError(err.message || "خطای سرور!");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [api]);

  return { data, error, loading };
};

export default useFetch;