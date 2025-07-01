import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import { ActivityIndicator, View, StatusBar, Animated, StyleSheet } from 'react-native';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import { ToastProvider } from '../src/contexts/ToastContext';
import { AuthProvider, useAuth } from '../src/contexts/AuthContext';
import { useTheme } from '../src/hooks/useTheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Redirect, usePathname, useNavigation } from 'expo-router';
import { RouteTransition } from '../src/components/transitions/RouteTransition';
import ErrorBoundary from '../src/components/error/ErrorBoundary';
import { Button } from '../src/components/ui/Button';
import { H1, Body1 } from '../src/components/ui/Typography';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './global.css';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Wrapper component to handle theme and safe area
function AppContent() {
  const { colors, isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const segments = useSegments();
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Check if we're in development mode
  const isDevelopment = __DEV__;

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simulate loading assets or any async initialization
        await new Promise(resolve => setTimeout(resolve, 1000));
        setError(null);
      } catch (err) {
        console.error('Initialization error:', err);
        setError(err instanceof Error ? err : new Error('Failed to initialize app'));
      } finally {
        setIsLoading(false);
      }
    };
    initializeApp();
  }, []);

  useEffect(() => {
    if (isLoading || error) return;
    try {
      // Ensure segments is an array
      const currentSegments = Array.isArray(segments) ? segments : [];
      // In development, show the component demo screen at the root
      if (isDevelopment && currentSegments.length === 0) {
        router.replace('/components');
        return;
      }
      // Replace with your actual auth check
      const isAuthenticated = true; // Temporary bypass
      // Only redirect if we're not already on the target route
      if (isAuthenticated && currentSegments[0] !== '(tabs)') {
        router.replace('/(tabs)');
      } else if (!isAuthenticated && currentSegments[0] !== '(auth)') {
        router.replace('/(auth)/login');
      }
    } catch (err) {
      console.error('Navigation error:', err);
      setError(err instanceof Error ? err : new Error('Navigation error'));
    }
  }, [isLoading, segments, isDevelopment, router, error]);

  // Handle route changes with transitions
  useEffect(() => {
    if (pathname !== prevPathnameRef.current) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        prevPathnameRef.current = pathname;
        setIsTransitioning(false);
      }, 300); // Match this with your transition duration
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Only return after all hooks
  if (error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: colors.background }]}> 
        <View style={styles.errorContent}>
          <H1 style={[styles.errorTitle, { color: colors.danger }]}> Oops! Something went wrong </H1>
          <Body1 style={[styles.errorMessage, { color: colors.textSecondary }]}> We're having trouble loading the app. Please try again. </Body1>
          {__DEV__ && (
            <Body1 style={[styles.errorDetails, { color: colors.textSecondary }]}> {error.message} </Body1>
          )}
          <Button onPress={() => setError(null)} style={styles.retryButton}> Try Again </Button>
        </View>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <RouteTransition>
        {!isTransitioning && <Slot />}
      </RouteTransition>
    </View>
  );
}

// Main app wrapper with theme, auth, and gesture handling
export default function RootLayout() {
  return (
    <ErrorBoundary 
      fallback={
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <H1>Something went wrong</H1>
          <Body1 style={{ marginTop: 16, marginBottom: 24, textAlign: 'center' }}>
            The app encountered an unexpected error. Please restart the app.
          </Body1>
          <Button onPress={() => window.location.reload()}>
            Reload App
          </Button>
        </View>
      }
    >
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <ThemeProvider>
              <ToastProvider>
                <AuthProvider>
                  <AppContent />
                </AuthProvider>
              </ToastProvider>
            </ThemeProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
        {__DEV__ && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorContent: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  errorMessage: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 16,
    lineHeight: 24,
  },
  errorDetails: {
    fontFamily: 'monospace',
    marginBottom: 24,
    padding: 12,
    borderRadius: 4,
    alignSelf: 'stretch',
    textAlign: 'left',
  },
  retryButton: {
    width: '100%',
    maxWidth: 200,
  },
});
