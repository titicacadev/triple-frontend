import { useEffect, useState } from "react";
import fetch from "isomorphic-fetch";

interface IResponse {
  ok?: boolean;
  status?: number;
  statusText?: string;
}

interface IOption {
  method?: string;
  body?: string;
  headers?: {
    [key: string]: string;
  };
  credentials?: string;
  cache?: string;
  mode?: string;
}

export default function useFetch(
  url: string,
  options: IOption = {}
): {
  data: any;
  loading: boolean;
  error?: Error;
} {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    (async () => {
      if (!url) return;

      const response = await fetch(url, options);

      setLoading(false);

      try {
        if (response.ok) {
          setData(await response.json());
        } else {
          setError(createFetchError(response));
        }
      } catch (e) {
        setError(e);
      }
    })();
  }, [url, options]);

  return { data, loading, error };
}

const createFetchError = (response: IResponse): Error => {
  const err = new Error(`${response.status} ${response.statusText}`);
  err.name = "FetchError";
  return err;
};
