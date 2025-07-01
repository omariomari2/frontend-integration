// Base API configuration
export const API_CONFIG = {
  // In a real app, this would come from environment variables
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 30000, // 30 seconds
  HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
} as const;

// API endpoints
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  PROFILE: {
    GET: '/profile',
    UPDATE: '/profile',
    AVATAR: '/profile/avatar',
  },
  PORTFOLIO: {
    GET: '/portfolio',
    ITEM: (id: string) => `/portfolio/${id}`,
    UPLOAD: '/portfolio/upload',
  },
} as const;

export type ApiEndpoint = 
  | typeof ENDPOINTS.AUTH[keyof typeof ENDPOINTS.AUTH]
  | typeof ENDPOINTS.PROFILE[keyof typeof ENDPOINTS.PROFILE]
  | ReturnType<typeof ENDPOINTS.PORTFOLIO.ITEM>
  | string; // Allow custom endpoints
