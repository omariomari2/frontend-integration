import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useTheme } from '../../src/hooks/useTheme';
import { Button } from '../../src/components/ui/Button';
import { H1, Body1 } from '../../src/components/ui/Typography';
import { useAuth } from '../../src/contexts/AuthContext';
import { useToast } from '../../src/contexts/ToastContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { colors } = useTheme();
  const { login } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      showToast('Please enter both email and password', { type: 'warning' });
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
      showToast('Logged in successfully!', { type: 'success' });
      router.replace('/(tabs)');
    } catch (error) {
      showToast('Login failed. Please try again.', { type: 'danger' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.content}>
        <H1 style={[styles.title, { color: colors.text }]}>Welcome Back</H1>
        <Body1 style={[styles.subtitle, { color: colors.textSecondary }]}>
          Sign in to continue
        </Body1>

        <View style={styles.form}>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: colors.card,
                color: colors.text,
                borderColor: colors.border 
              }
            ]}
            placeholder="Email"
            placeholderTextColor={colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: colors.card,
                color: colors.text,
                borderColor: colors.border 
              }
            ]}
            placeholder="Password"
            placeholderTextColor={colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity 
            style={styles.forgotPassword}
            onPress={() => router.push('/auth/forgot-password')}
          >
            <Body1 style={{ color: colors.primary }}>Forgot password?</Body1>
          </TouchableOpacity>

          <Button 
            onPress={handleLogin}
            isLoading={isLoading}
            style={styles.button}
          >
            Sign In
          </Button>

          <View style={styles.footer}>
            <Body1 style={{ color: colors.textSecondary }}>
              Don't have an account?{' '}
            </Body1>
            <TouchableOpacity onPress={() => router.push('/auth/register')}>
              <Body1 style={{ color: colors.primary, fontWeight: '600' }}>
                Sign Up
              </Body1>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    marginBottom: 8,
    textAlign: 'center' as const,
    color: 'inherit',
  },
  subtitle: {
    textAlign: 'center' as const,
    marginBottom: 32,
    color: 'inherit',
  },
  form: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    marginTop: 8,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
});
