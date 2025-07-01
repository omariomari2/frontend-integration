import React, { useState } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useTheme } from '../../src/hooks/useTheme';
import { Button } from '../../src/components/ui/Button';
import { H1, Body1 } from '../../src/components/ui/Typography';
import { useAuth } from '../../src/contexts/AuthContext';
import { useToast } from '../../src/contexts/ToastContext';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { colors } = useTheme();
  const { register } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      showToast('Please fill in all fields', { type: 'warning' });
      return;
    }

    if (password !== confirmPassword) {
      showToast('Passwords do not match', { type: 'warning' });
      return;
    }

    try {
      setIsLoading(true);
      await register(email, password, name);
      showToast('Account created successfully!', { type: 'success' });
      router.replace('/(tabs)');
    } catch (error) {
      showToast('Registration failed. Please try again.', { type: 'danger' });
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
        <H1 style={[styles.title, { color: colors.text }]}>Create Account</H1>
        <Body1 style={[styles.subtitle, { color: colors.textSecondary }]}>
          Join us to get started
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
            placeholder="Full Name"
            placeholderTextColor={colors.textSecondary}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
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

          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: colors.card,
                color: colors.text,
                borderColor: colors.border 
              }
            ]}
            placeholder="Confirm Password"
            placeholderTextColor={colors.textSecondary}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <Button 
            onPress={handleRegister}
            isLoading={isLoading}
            style={styles.button}
          >
            Create Account
          </Button>

          <Body1 style={[styles.footer, { color: colors.textSecondary }]}>
            Already have an account?{' '}
            <Body1 
              style={{ color: colors.primary, fontWeight: '600' }}
              onPress={() => router.push('/auth/login')}
            >
              Sign In
            </Body1>
          </Body1>
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
    marginBottom: 24,
  },
  footer: {
    textAlign: 'center' as const,
    color: 'inherit',
  },
});
