import React, { useState, useCallback, useRef, useEffect, Component, ComponentType, ReactNode, ErrorInfo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: (error: Error, resetError: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetError);
      }
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong.</Text>
          <Text style={styles.error}>{this.state.error.toString()}</Text>
          <TouchableOpacity onPress={this.resetError} style={styles.button}>
            <Text style={styles.buttonText}>Try again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);
  const errorRef = useRef<Error | null>(null);

  const handleError = useCallback((error: Error) => {
    console.error('Error caught by useErrorBoundary:', error);
    errorRef.current = error;
    setError(error);
  }, []);

  const resetError = useCallback(() => {
    errorRef.current = null;
    setError(null);
  }, []);

  useEffect(() => {
    return () => {
      resetError();
    };
  }, [resetError]);

  return {
    error,
    hasError: error !== null,
    handleError,
    resetError,
  };
}

type WithErrorBoundaryProps = {
  error: Error;
  resetError: () => void;
};

function withErrorBoundary<P extends object>(
  WrappedComponent: ComponentType<P>,
  FallbackComponent: ComponentType<WithErrorBoundaryProps>
) {
  const WithErrorBoundary: React.FC<P> = (props) => {
    const [error, setError] = useState<Error | null>(null);

    const handleError = useCallback((error: Error) => {
      console.error('Error boundary caught:', error);
      setError(error);
    }, []);

    const resetError = useCallback(() => {
      setError(null);
    }, []);

    if (error) {
      return <FallbackComponent error={error} resetError={resetError} />;
    }

    return (
      <ErrorBoundary onError={handleError}>
        <WrappedComponent {...props as P} />
      </ErrorBoundary>
    );
  };

  // Set display name for better debugging
  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithErrorBoundary.displayName = `withErrorBoundary(${wrappedComponentName})`;

  return WithErrorBoundary;
}

export default ErrorBoundary;
