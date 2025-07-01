import { ENDPOINTS } from '../../config/api';
import { apiClient } from '../api/apiClient';
import { AuthResponse, LoginCredentials, RegisterData, User } from '../../types/auth';
import {
  getStoredToken as getToken,
  getStoredRefreshToken as getRefreshToken,
  clearStoredTokens as clearTokens,
  isTokenExpired,
  setAuthToken,
  setRefreshToken,
} from '../../utils/auth';

export const AUTH_TOKEN_KEY = 'auth_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

// Re-export token management functions
export const getAuthToken = getToken;
export const clearAuthTokens = clearTokens;

// API calls
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>(
      ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    
    if (response.token && response.refreshToken) {
      await setAuthToken(response.token);
      await setRefreshToken(response.refreshToken);
    }
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (userData: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>(
      ENDPOINTS.AUTH.REGISTER,
      userData
    );
    
    if (response.token && response.refreshToken) {
      await setAuthToken(response.token);
      await setRefreshToken(response.refreshToken);
    }
    
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const refreshAuthToken = async (): Promise<string | null> => {
  try {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) return null;

    const response = await apiClient.post<{ token: string }>(
      ENDPOINTS.AUTH.REFRESH_TOKEN,
      { refreshToken }
    );

    if (response.token) {
      await setAuthToken(response.token);
      return response.token;
    }
    
    return null;
  } catch (error) {
    console.error('Token refresh error:', error);
    await clearAuthTokens();
    return null;
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const token = await getAuthToken();
    if (!token) return null;
    
    return await apiClient.get<User>(ENDPOINTS.AUTH.ME);
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    await clearAuthTokens();
  }
};
