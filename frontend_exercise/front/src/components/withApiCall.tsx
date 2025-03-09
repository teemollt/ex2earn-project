import React from 'react';

export function withApiCall<P>(
  WrappedComponent: React.ComponentType<P>,
  apiFunction: (...args: any[]) => Promise<any>
) {
  return (props: P) => {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const callApi = async (...args: any[]) => {
      setLoading(true);
      try {
        const result = await apiFunction(...args);
        return result;
      } catch (err: any) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return (
      <WrappedComponent {...props} callApi={callApi} loading={loading} error={error} />
    );
  };
}
