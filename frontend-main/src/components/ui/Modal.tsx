import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Modal as RNModal, View, Animated, Pressable, StyleSheet, Platform, ViewStyle, StyleProp, useWindowDimensions, BackHandler } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Card } from './Card';

export interface ModalRef {
  open: () => void;
  close: () => void;
}

interface ModalProps {
  children: React.ReactNode;
  visible: boolean;
  onDismiss?: () => void;
  animationType?: 'none' | 'slide' | 'fade';
  position?: 'center' | 'bottom' | 'top';
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  backdropOpacity?: number;
  dismissible?: boolean;
  onShow?: () => void;
  onRequestClose?: () => void;
}

const Modal = forwardRef<ModalRef, ModalProps>(({
  children,
  visible = false,
  onDismiss,
  animationType = 'fade',
  position = 'center',
  style,
  contentContainerStyle,
  backdropOpacity = 0.5,
  dismissible = true,
  onShow,
  onRequestClose,
}, ref) => {
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isMounted = useRef(false);

  // Expose open/close methods via ref
  useImperativeHandle(ref, () => ({
    open: () => {
      if (visible) return;
      isMounted.current = true;
      if (animationType === 'slide') {
        slideAnim.setValue(height);
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: Platform.OS === 'ios' ? 5 : 0,
        }).start();
      } else if (animationType === 'fade') {
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    },
    close: () => {
      if (animationType === 'slide') {
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          onDismiss?.();
        });
      } else if (animationType === 'fade') {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          onDismiss?.();
        });
      } else {
        onDismiss?.();
      }
    },
  }));

  // Handle visibility changes
  React.useEffect(() => {
    if (visible) {
      isMounted.current = true;
      if (animationType === 'slide') {
        slideAnim.setValue(height);
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: Platform.OS === 'ios' ? 5 : 0,
        }).start();
      } else if (animationType === 'fade') {
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
      onShow?.();
    } else if (isMounted.current) {
      if (animationType === 'slide') {
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          isMounted.current = false;
          onDismiss?.();
        });
      } else if (animationType === 'fade') {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          isMounted.current = false;
          onDismiss?.();
        });
      } else {
        isMounted.current = false;
        onDismiss?.();
      }
    }
  }, [visible, animationType]);

  // Handle back button on Android
  React.useEffect(() => {
    if (Platform.OS === 'android' && visible) {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          if (dismissible) {
            onRequestClose?.() || onDismiss?.();
            return true;
          }
          return false;
        }
      );
      return () => backHandler.remove();
    }
  }, [visible, dismissible, onRequestClose, onDismiss]);

  // Don't render anything if not visible and not animating
  if (!visible && !isMounted.current) {
    return null;
  }

  // Animation styles
  const backdropStyle = {
    backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})`,
    opacity: animationType === 'fade' ? fadeAnim : 1,
  };

  const contentTransform = [];
  if (animationType === 'slide') {
    if (position === 'bottom') {
      contentTransform.push({ translateY: slideAnim });
    } else if (position === 'top') {
      contentTransform.push({ translateY: Animated.multiply(slideAnim, new Animated.Value(-1)) });
    }
  }

  // Create a base style object
  const baseStyle: ViewStyle = {
    ...styles.content,
    backgroundColor: colors.background,
  };

  // Apply position styles
  if (position === 'center') {
    Object.assign(baseStyle, styles.centerPosition);
  } else if (position === 'bottom') {
    Object.assign(baseStyle, styles.bottomPosition);
  } else if (position === 'top') {
    Object.assign(baseStyle, styles.topPosition);
  }

  // Apply custom styles if provided
  if (contentContainerStyle) {
    Object.assign(baseStyle, StyleSheet.flatten(contentContainerStyle));
  }

  // Opacity is handled by the Animated.View
  const contentStyle: ViewStyle = {
    ...baseStyle,
    opacity: animationType === 'fade' ? 1 : 1,
    transform: contentTransform as any, // Type assertion for transform array
  };

  return (
    <RNModal
      transparent
      animationType="none"
      visible={true}
      onRequestClose={() => {
        if (dismissible) {
          onRequestClose?.() || onDismiss?.();
        }
      }}
    >
      <Pressable
        style={[styles.backdrop, backdropStyle]}
        onPress={dismissible ? (onRequestClose || onDismiss) : undefined}
      >
        <Pressable style={styles.innerPressable}>
          <Animated.View style={contentStyle}>
            <Card style={[{ flex: 1 }, style]}>
              {children}
            </Card>
          </Animated.View>
        </Pressable>
      </Pressable>
    </RNModal>
  );
});

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerPressable: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    margin: 20,
    borderRadius: 12,
    maxWidth: '100%',
    maxHeight: '90%',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centerPosition: {
    maxWidth: 500,
  },
  bottomPosition: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  topPosition: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    margin: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});

export { Modal };
