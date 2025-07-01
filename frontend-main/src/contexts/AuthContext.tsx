import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { getToken, removeToken, setToken } from '../utils/tokenStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  name: string;
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  getStoredToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on initial load
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Failed to load user', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // TODO: Replace with actual API call
      // const response = await api.post('/auth/login', { email, password });
      // const { user: userData, token } = response.data;
      
      // Mock user and token for development
      const mockUser = {
        id: '1',
        email,
        name: email.split('@')[0],
      };
      const mockToken = 'mock-jwt-token';
      
      // Store the token using our secure storage
      await setToken(mockToken);
      
      // Store user data in AsyncStorage (non-sensitive data)
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      // TODO: Replace with actual API call
      // const response = await api.post('/auth/register', { email, password, name });
      // const { user: userData, token } = response.data;
      
      // Mock user and token for development
      const mockUser = {
        id: '1',
        email,
        name,
      };
      const mockToken = 'mock-jwt-token';
      
      // Store the token using our secure storage
      await setToken(mockToken);
      
      // Store user data in AsyncStorage (non-sensitive data)
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Remove the auth token
      await removeToken();
      
      // Clear user data
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  // Function to get the stored token asynchronously
  const getStoredToken = useCallback((): Promise<string | null> => {
    return getToken().catch(error => {
      console.error('Error getting auth token:', error);
      return null;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: isLoading,
        login,
        logout,
        register,
        getStoredToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
