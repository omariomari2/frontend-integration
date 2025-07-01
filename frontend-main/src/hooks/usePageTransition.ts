import { useCallback, useRef } from 'react';
import { Animated } from 'react-native';

export function usePageTransition() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const startTransition = useCallback((duration = 300) => {
    // Reset animations
    fadeAnim.setValue(0);
    slideAnim.setValue(50);

    // Start animations
    return Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }),
    ]);
  }, [fadeAnim, slideAnim]);

  const getTransitionStyles = useCallback(() => ({
    opacity: fadeAnim,
    transform: [
      {
        translateY: slideAnim,
      },
    ],
  }), [fadeAnim, slideAnim]);

  return {
    startTransition,
    getTransitionStyles,
  };
}
