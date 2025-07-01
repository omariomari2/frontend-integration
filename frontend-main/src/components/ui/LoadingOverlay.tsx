import React from 'react';
import { View, ActivityIndicator, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface LoadingOverlayProps {
  isLoading: boolean;
  fullScreen?: boolean;
  size?: 'small' | 'large';
  color?: string;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  fullScreen = false,
  size = 'large',
  color,
  style,
  children,
}) => {
  const { colors } = useTheme();
  const spinnerColor = color || colors.primary;

  if (!isLoading) return <>{children}</>;

  return (
    <View style={[fullScreen ? styles.fullScreen : styles.container, style]}>
      {!fullScreen && children}
      <View style={[styles.overlay, fullScreen && styles.fullScreenOverlay]}>
        <ActivityIndicator size={size} color={spinnerColor} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  fullScreenOverlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});
