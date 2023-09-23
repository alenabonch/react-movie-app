import { useState } from 'react';

export const useFetch = (request: () => Promise<void>): [() => Promise<void>, boolean, string] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetching = async () => {
    try {
      setLoading(true);
      setError('');
      await request();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return [fetching, loading, error];
}
