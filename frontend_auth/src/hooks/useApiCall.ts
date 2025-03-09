import { useState } from 'react';

export function useApiCall<T>(apiFunction: (...args: any[]) => Promise<T>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callApi = async (...args: any[]): Promise<T> => {
    setLoading(true);
    try {
      const result = await apiFunction(...args);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { callApi, loading, error };
}
