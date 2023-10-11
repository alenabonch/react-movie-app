import axios, { CancelToken, CancelTokenSource } from 'axios';
import { useState } from 'react';

export const useFetch = (request: (cancelToken: CancelToken) => Promise<any>): [() => Promise<void>, boolean, any, any] => {
  let cancelToken: CancelTokenSource;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetching = async () => {
    if (cancelToken) {
      cancelToken.cancel();
    }
    cancelToken = axios.CancelToken.source();

    try {
      setLoading(true);
      setError(null);
      setData(null);
      const data = await request(cancelToken.token);
      setLoading(false);
      setData(data);
    } catch (e: any) {
      if (!axios.isCancel(e)) {
        setLoading(false);
        setError(e);
      }
    }
  }

  return [fetching, loading, error, data];
}
