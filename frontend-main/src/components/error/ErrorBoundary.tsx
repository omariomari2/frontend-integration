import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { H1, Body1 } from '../ui/Typography';
import { useTheme } from '../../hooks/useTheme';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return <ErrorFallback error={this.state.error} onReset={() => this.setState({ hasError: false, error: null })} />;
    }

    return this.props.children;
  }
}

const ErrorFallback = ({ error, onReset }: { error: Error | null; onReset: () => void }) => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <H1 style={[styles.title, { color: colors.danger }]}>Something went wrong</H1>
        <Body1 style={[styles.message, { color: colors.textSecondary }]}>
          An unexpected error occurred. Please try again later.
        </Body1>
        {__DEV__ && error && (
          <Body1 style={[styles.error, { color: colors.textSecondary }]}>
            {error.message}
          </Body1>
        )}
        <Button
          title="Try again"
          onPress={onReset}
          color={colors.primary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 16,
    lineHeight: 24,
  },
  error: {
    fontFamily: 'monospace',
    marginBottom: 24,
    padding: 12,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignSelf: 'stretch',
  },
});

export default ErrorBoundary;
