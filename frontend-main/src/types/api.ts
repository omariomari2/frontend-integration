// Base API response type
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
  status?: number;
}

// Paginated response type
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Error response type
export interface ApiError extends Error {
  response?: {
    status: number;
    data: {
      message?: string;
      error?: string;
      errors?: Record<string, string[]>;
    };
  };
  message: string;
  status?: number;
  statusCode?: number;
  code?: string;
  details?: any;
  
  // Add index signature to allow any string key
  [key: string]: any;
}
