import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Button } from '../src/components/ui/Button';
import { H1, Body1 } from '../src/components/ui/Typography';
import { useTheme } from '../src/hooks/useTheme';

export default function NotFoundScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <H1 style={[styles.title, { color: colors.primary }]}>404</H1>
        <H1 style={[styles.subtitle, { color: colors.text }]}>
          Page Not Found
        </H1>
        <Body1 style={[styles.message, { color: colors.textSecondary }]}>
          The page you're looking for doesn't exist or has been moved.
        </Body1>
        <Link href="/(tabs)" asChild>
          <Button style={styles.button}>
            Go to Home
          </Button>
        </Link>
      </View>
    </View>
  );
}

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
    fontSize: 120,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    marginBottom: 32,
    fontSize: 18,
    lineHeight: 28,
  },
  button: {
    width: '100%',
    maxWidth: 200,
  },
});
