import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import './global.css';

export default function RootLayout() {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      await loadFonts();
      await checkAuthStatus();
    };
    initialize();
  }, []);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        'Inter': require('../assets/fonts/Inter_18pt-Regular.ttf'),
        'Poppins': require('../assets/fonts/Poppins-Bold.ttf'),
      });
      setFontsLoaded(true);
    } catch (error) {
      console.error('Font loading failed:', error);
    }
  };

  const checkAuthStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const userData = await AsyncStorage.getItem('userData');

      if (userData) {
        if (userToken) {
          router.replace('/(tabs)');
        } else {
          router.replace('/(auth)/login');
        }
      } else {
        router.replace('/(auth)/register');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.replace('/(auth)/register');
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
