import { useState } from 'react';
import { REQUEST_CANCELLED_ERROR } from '../services/MovieService';

export const useFetch = (request: () => Promise<void>): [() => Promise<void>, boolean, string] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetching = async () => {
    try {
      setLoading(true);
      setError('');
      await request();
      setLoading(false);
    } catch (e: any) {
      if (!REQUEST_CANCELLED_ERROR) {
        setLoading(false);
        setError(e.message);
      }
    }
  }

  return [fetching, loading, error];
}
