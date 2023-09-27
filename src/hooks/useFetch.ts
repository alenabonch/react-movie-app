import axios, { CancelToken, CancelTokenSource } from 'axios';
import { useState } from 'react';
let cancelToken: CancelTokenSource;

export const useFetch = (request: (cancelToken: CancelToken) => Promise<void>): [() => Promise<void>, boolean, string] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetching = async () => {
    if (cancelToken) {
      cancelToken.cancel();
    }
    cancelToken = axios.CancelToken.source();

    try {
      setLoading(true);
      setError('');
      await request(cancelToken.token);
      setLoading(false);
    } catch (e: any) {
      if (!axios.isCancel(e)) {
        setLoading(false);
        setError(e.message);
      }
    }
  }

  return [fetching, loading, error];
}
