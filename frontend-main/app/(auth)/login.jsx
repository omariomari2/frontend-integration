import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const userData = await AsyncStorage.getItem('userData');
      
      if (userData) {
        const user = JSON.parse(userData);
        
        if (user.email === formData.email && user.password === formData.password) {
          await AsyncStorage.setItem('userToken', 'authenticated');
          router.replace('/(tabs)');
        } else {
          Alert.alert('Error', 'Invalid email or password');
        }
      } else {
        Alert.alert('Error', 'No account found. Please register first.');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      flex: 1,
      backgroundColor: isDark ? '#171717' : '#ffffff',
    },
    content: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
    },
    header: {
      marginBottom: 48,
      alignItems: 'center',
    },
    image: {
      width: 320,
      height: 250,
      borderRadius: 12,
      marginBottom: 32,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#171717',
      marginBottom: 8,
      fontFamily: 'Poppins',
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? '#a3a3a3' : '#666666',
      textAlign: 'center',
      fontFamily: 'Inter',
    },
    form: {
      marginBottom: 32,
    },
    inputGroup: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#171717',
      marginBottom: 8,
      fontFamily: 'Poppins',
    },
    input: {
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#d1d5db',
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      backgroundColor: isDark ? '#1f2937' : '#f9fafb',
      color: isDark ? '#ffffff' : '#171717',
      fontFamily: 'Inter'
    },
    button: {
      backgroundColor: '#0CAA41',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginTop: 8,
    },
    buttonDisabled: {
      backgroundColor: '#6b7280',
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
      fontFamily: 'Poppins',
    },
    forgotPassword: {
      alignItems: 'center',
      marginTop: 16,
    },
    forgotText: {
      color: '#0CAA41',
      fontSize: 14,
      fontWeight: '500',
      fontFamily: 'Poppins',
    },
    registerLink: {
      marginTop: 32,
      alignItems: 'center',
    },
    registerText: {
      color: isDark ? '#a3a3a3' : '#666666',
      fontSize: 14,
    },
    registerButton: {
      color: '#0CAA41',
      fontWeight: '600',
    },
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Image 
            source={require('@/assets/gifs/people-search.gif')} 
            style={styles.image}
          />
          
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({...formData, email: text})}
              placeholder="Enter your email"
              placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={formData.password}
              onChangeText={(text) => setFormData({...formData, password: text})}
              placeholder="Enter your password"
              placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.registerLink}>
          <Text style={styles.registerText}>
            Don't have an account?{' '}
            <Text 
              style={styles.registerButton}
              onPress={() => router.push('/(auth)/register')}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}