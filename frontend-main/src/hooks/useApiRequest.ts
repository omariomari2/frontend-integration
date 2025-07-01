import { useState, useCallback } from 'react';
import { ApiError } from '../types/api';

type RequestFunction<T, P extends any[]> = (...args: P) => Promise<T>;

interface UseApiRequestOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
  onFinally?: () => void;
}

interface UseApiRequestResult<T, P extends any[]> {
  data: T | null;
  isLoading: boolean;
  error: ApiError | null;
  execute: (...args: P) => Promise<T | void>;
  reset: () => void;
}

export function useApiRequest<T, P extends any[] = any[]>(
  requestFn: RequestFunction<T, P>,
  options: UseApiRequestOptions<T> = {}
): UseApiRequestResult<T, P> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const execute = useCallback(
    async (...args: P): Promise<T | void> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await requestFn(...args);
        setData(result);
        options.onSuccess?.(result);
        return result;
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError);
        options.onError?.(apiError);
        throw apiError;
      } finally {
        setIsLoading(false);
        options.onFinally?.();
      }
    },
    [requestFn, options]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { data, isLoading, error, execute, reset };
}

// Optimistic update hook
export function useOptimisticUpdate<T, P extends any[] = any[]>(
  updateFn: RequestFunction<T, P>,
  optimisticUpdate: (data: T | null, ...args: P) => T
): [
  (data: T | null) => void,
  (...args: P) => Promise<{ rollback: () => void }>
] {
  const [optimisticData, setOptimisticData] = useState<T | null>(null);

  const setData = useCallback((data: T | null) => {
    setOptimisticData(data);
  }, []);

  const execute = useCallback(
    async (...args: P) => {
      // Save current data for potential rollback
      const previousData = optimisticData;
      
      // Apply optimistic update
      const newData = optimisticUpdate(previousData, ...args);
      setOptimisticData(newData);

      try {
        // Perform the actual update
        const result = await updateFn(...args);
        setOptimisticData(result);
        return { rollback: () => setOptimisticData(previousData) };
      } catch (error) {
        // Rollback on error
        setOptimisticData(previousData);
        throw error;
      }
    },
    [optimisticData, optimisticUpdate, updateFn]
  );

  return [optimisticData, execute];
}
