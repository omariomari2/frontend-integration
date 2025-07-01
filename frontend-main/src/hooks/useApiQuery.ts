import { useQuery, UseQueryOptions, QueryKey, UseQueryResult } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { ApiError } from '../types/api';
import { useAuth } from '../contexts/AuthContext';

export function useApiQuery<TData = unknown, TError = ApiError>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
): UseQueryResult<TData, TError> {
  return useQuery<TData, TError>({
    queryKey,
    queryFn,
    retry: (failureCount, error) => {
      const apiError = error as ApiError;
      // Don't retry on 4xx errors (except 401 which is handled by the interceptor)
      if (apiError?.statusCode && apiError.statusCode >= 400 && apiError.statusCode < 500) {
        return false;
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
    ...options,
  });
}

// Helper hook for authenticated queries
export function useAuthenticatedQuery<TData = unknown, TError = ApiError>(
  queryKey: QueryKey,
  queryFn: (token: string) => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn' | 'enabled'>
) {
  const { getStoredToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingToken, setIsLoadingToken] = useState(true);
  
  // Load token on mount
  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await getStoredToken();
        setToken(token);
      } catch (error) {
        console.error('Error loading auth token:', error);
      } finally {
        setIsLoadingToken(false);
      }
    };
    
    loadToken();
  }, [getStoredToken]);
  
  // Define the enabled type properly to avoid TypeScript errors
  type QueryOptions = Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn' | 'enabled'> & {
    enabled?: boolean;
  };
  
  const queryOptions = options as QueryOptions;

  return useApiQuery<TData, TError>(
    [...(Array.isArray(queryKey) ? queryKey : [queryKey]), { token }],
    async () => {
      if (!token) {
        throw new Error('No authentication token available');
      }
      return queryFn(token);
    },
    {
      ...queryOptions,
      enabled: !isLoadingToken && token !== null && (queryOptions.enabled ?? true),
    }
  );
}
