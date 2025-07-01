import { useState, useCallback } from 'react';
import { ApiError } from '../types/api';

interface UseMutationOptions<T, V> {
  onSuccess?: (data: T, variables: V) => void;
  onError?: (error: ApiError, variables: V) => void;
  onSettled?: (data: T | null, error: ApiError | null, variables: V) => void;
  optimisticUpdate?: (oldData: T | null, variables: V) => T;
  rollbackOnError?: boolean;
}

export function useMutation<T, V = any>(
  mutationFn: (variables: V) => Promise<T>,
  options: UseMutationOptions<T, V> = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const mutate = useCallback(
    async (variables: V) => {
      let rollbackData: T | null = null;
      
      // Set loading state
      setIsLoading(true);
      setIsError(false);
      setStatus('loading');

      // Apply optimistic update if provided
      if (options.optimisticUpdate) {
        rollbackData = data;
        setData((prev) => options.optimisticUpdate!(prev, variables));
      }

      try {
        // Execute the mutation
        const result = await mutationFn(variables);
        
        // Update state on success
        setData(result);
        setIsSuccess(true);
        setStatus('success');
        
        // Call success callback
        if (options.onSuccess) {
          options.onSuccess(result, variables);
        }
        
        return result;
      } catch (err) {
        const apiError = err as ApiError;
        
        // Rollback on error if enabled
        if (options.rollbackOnError && rollbackData !== null) {
          setData(rollbackData);
        }
        
        // Update error state
        setError(apiError);
        setIsError(true);
        setStatus('error');
        
        // Call error callback
        if (options.onError) {
          options.onError(apiError, variables);
        }
        
        throw apiError;
      } finally {
        setIsLoading(false);
        
        // Call settled callback
        if (options.onSettled) {
          options.onSettled(data, error, variables);
        }
      }
    },
    [mutationFn, options, data, error]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsError(false);
    setIsSuccess(false);
    setStatus('idle');
  }, []);

  return {
    mutate,
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    status,
    reset,
  };
}

// Helper hook for common mutation patterns
export function useApiMutation<T, V = any>(
  mutationFn: (variables: V) => Promise<T>,
  options: Omit<UseMutationOptions<T, V>, 'optimisticUpdate' | 'rollbackOnError'> = {}
) {
  return useMutation(mutationFn, options);
}

export function useOptimisticMutation<T, V = any>(
  mutationFn: (variables: V) => Promise<T>,
  optimisticUpdate: (oldData: T | null, variables: V) => T,
  options: Omit<UseMutationOptions<T, V>, 'optimisticUpdate' | 'rollbackOnError'> = {}
) {
  return useMutation(mutationFn, {
    ...options,
    optimisticUpdate,
    rollbackOnError: true,
  });
}
