import { useEffect, useState } from 'react';

import { client } from '../sanity/client';

export type QueryStatus = 'loading' | 'ready' | 'error' | 'unconfigured';

export interface QueryResult<T> {
  status: QueryStatus;
  data: T | null;
  error: Error | null;
}

export const useSanityQuery = <T>(
  query: string,
  params: Record<string, unknown> = {},
): QueryResult<T> => {
  const paramsKey = JSON.stringify(params);
  const [result, setResult] = useState<QueryResult<T>>(() => ({
    status: client ? 'loading' : 'unconfigured',
    data: null,
    error: null,
  }));

  useEffect(() => {
    if (!client) return;

    const controller = new AbortController();
    setResult({ status: 'loading', data: null, error: null });

    client
      .fetch<T>(query, JSON.parse(paramsKey), { signal: controller.signal })
      .then((data) => {
        if (controller.signal.aborted) return;
        setResult({ status: 'ready', data, error: null });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error('Sanity query failed', error);
        setResult({
          status: 'error',
          data: null,
          error: error instanceof Error ? error : new Error(String(error)),
        });
      });

    return () => controller.abort();
  }, [query, paramsKey]);

  return result;
};
