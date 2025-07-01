import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';

// Define theme types
type Theme = 'light' | 'dark' | 'system';

// Define color palette
interface Colors {
  // Primary
  primary: string;
  primaryLight: string;
  primaryDark: string;
  
  // Secondary
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  
  // Status
  success: string;
  warning: string;
  danger: string;
  info: string;
  
  // Grayscale
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  muted: string;
  mutedText: string;
  
  // UI
  shadow: string;
  backdrop: string;
  
  // Additional
  overlay: string;
  notification: string;
}

// Define theme interface
export interface ThemeContextType {
  theme: Theme;
  colors: Colors;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// Default light theme colors
const lightColors: Colors = {
  // Primary
  primary: '#007AFF',
  primaryLight: '#66B0FF',
  primaryDark: '#0051A7',
  
  // Secondary
  secondary: '#5856D6',
  secondaryLight: '#A4A2FF',
  secondaryDark: '#2E2DA3',
  
  // Status
  success: '#34C759',
  warning: '#FF9500',
  danger: '#FF3B30',
  info: '#5AC8FA',
  
  // Grayscale
  background: '#FFFFFF',
  card: '#F2F2F7',
  text: '#000000',
  textSecondary: '#3A3A3C',
  border: '#D1D1D6',
  muted: '#F2F2F7',
  mutedText: '#8E8E93',
  
  // UI
  shadow: 'rgba(0, 0, 0, 0.1)',
  backdrop: 'rgba(0, 0, 0, 0.5)',
  
  // Additional
  overlay: 'rgba(0, 0, 0, 0.5)',
  notification: '#FF3B30',
};

// Dark theme colors
const darkColors: Colors = {
  // Primary
  primary: '#0A84FF',
  primaryLight: '#3E9EFF',
  primaryDark: '#0062CC',
  
  // Secondary
  secondary: '#5E5CE6',
  secondaryLight: '#7D7AFF',
  secondaryDark: '#4A48B8',
  
  // Status
  success: '#30D158',
  warning: '#FF9F0A',
  danger: '#FF453A',
  info: '#64D2FF',
  
  // Grayscale
  background: '#000000',
  card: '#1C1C1E',
  text: '#FFFFFF',
  textSecondary: '#EBEBF5',
  border: '#38383A',
  muted: '#2C2C2E',
  mutedText: '#8E8E93',
  
  // UI
  shadow: 'rgba(0, 0, 0, 0.3)',
  backdrop: 'rgba(0, 0, 0, 0.7)',
  
  // Additional
  overlay: 'rgba(0, 0, 0, 0.7)',
  notification: '#FF453A',
};

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  colors: lightColors,
  isDark: false,
  setTheme: () => {},
  toggleTheme: () => {},
});

// Theme provider props
interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: Theme;
}

// Theme provider component
export function ThemeProvider({ children, initialTheme = 'system' }: ThemeProviderProps) {
  const systemTheme = useColorScheme() || 'light';
  const [theme, setTheme] = React.useState<Theme>(initialTheme);
  
  // Determine the current theme (light/dark) based on the theme setting
  const isDark = React.useMemo(() => {
    return theme === 'system' ? systemTheme === 'dark' : theme === 'dark';
  }, [theme, systemTheme]);
  
  // Get the current color scheme
  const colors = isDark ? darkColors : lightColors;
  
  // Toggle between light and dark theme
  const toggleTheme = React.useCallback(() => {
    setTheme(prevTheme => {
      if (prevTheme === 'system') {
        return systemTheme === 'dark' ? 'light' : 'dark';
      }
      return prevTheme === 'dark' ? 'light' : 'dark';
    });
  }, [systemTheme]);
  
  // Update theme
  const updateTheme = React.useCallback((newTheme: Theme) => {
    setTheme(newTheme);
  }, []);
  
  // Create the context value
  const contextValue = React.useMemo(
    () => ({
      theme,
      colors,
      isDark,
      setTheme: updateTheme,
      toggleTheme,
    }),
    [theme, colors, isDark, updateTheme, toggleTheme]
  );
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Helper hook to get the current theme colors
export function useThemeColors() {
  const { colors } = useTheme();
  return colors;
}

// Helper hook to check if dark mode is active
export function useIsDark() {
  const { isDark } = useTheme();
  return isDark;
}
