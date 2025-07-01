import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'auth_token';

// Use SecureStore on mobile, localStorage on web
const getStorage = () => {
  if (Platform.OS === 'web') {
    return {
      getItem: async (key: string) => {
        if (typeof window !== 'undefined') {
          return localStorage.getItem(key);
        }
        return null;
      },
      setItem: async (key: string, value: string) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem(key, value);
        }
      },
      deleteItem: async (key: string) => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(key);
        }
      },
    };
  }
  
  return {
    getItem: SecureStore.getItemAsync,
    setItem: SecureStore.setItemAsync,
    deleteItem: SecureStore.deleteItemAsync,
  };
};

export const getToken = async (): Promise<string | null> => {
  try {
    const storage = getStorage();
    return await storage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

export const setToken = async (token: string): Promise<void> => {
  try {
    const storage = getStorage();
    await storage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error setting auth token:', error);
  }
};

export const removeToken = async (): Promise<void> => {
  try {
    const storage = getStorage();
    await storage.deleteItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
};
