import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle, TouchableOpacityProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger' | 'warning' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  style,
  textStyle,
  disabled,
  ...props
}: ButtonProps) {
  const { colors } = useTheme();

  const variantStyles = {
    primary: {
      backgroundColor: colors.primary,
      borderWidth: 0,
    },
    secondary: {
      backgroundColor: colors.secondary,
      borderWidth: 0,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.border,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    link: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    danger: {
      backgroundColor: colors.danger,
      borderWidth: 0,
    },
    warning: {
      backgroundColor: colors.warning,
      borderWidth: 0,
    },
    success: {
      backgroundColor: colors.success,
      borderWidth: 0,
    },
  };

  const sizeStyles = {
    sm: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 6,
    },
    md: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    lg: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 10,
    },
  };

  const textStyles = {
    sm: {
      fontSize: 14,
      lineHeight: 20,
    },
    md: {
      fontSize: 16,
      lineHeight: 24,
    },
    lg: {
      fontSize: 18,
      lineHeight: 28,
    },
  };

  const buttonStyles = [
    styles.button,
    variantStyles[variant],
    sizeStyles[size],
    disabled && styles.disabled,
    style,
  ];

  const textColor = variant === 'primary' || variant === 'secondary' ? 'white' : colors.text;

  return (
    <TouchableOpacity
      style={buttonStyles}
      activeOpacity={0.7}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text
            style={[
              styles.text,
              { color: textColor },
              textStyles[size],
              textStyle,
            ]}
          >
            {children}
          </Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    fontWeight: '500',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});
