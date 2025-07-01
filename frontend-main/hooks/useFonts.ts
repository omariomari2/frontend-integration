import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

function timeout(ms: number) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`${ms}ms timeout exceeded`)), ms)
  );
}

export function useFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        if (Platform.OS !== 'web') {
          await SplashScreen.preventAutoHideAsync();
        }

        await Promise.race([
          Font.loadAsync({
            Poppins: require('../assets/fonts/Poppins-Bold.ttf'),
            Inter: require('../assets/fonts/Inter_18pt-Regular.ttf'),
          }),
          timeout(8000),
        ]);

        setFontsLoaded(true);
        if (Platform.OS !== 'web') {
          await SplashScreen.hideAsync();
        }
      } catch (e) {
        console.warn('Font loading error:', e);
      }
    }

    prepare();
  }, []);

  return fontsLoaded;
}
