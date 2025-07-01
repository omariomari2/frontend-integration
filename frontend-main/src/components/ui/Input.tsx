import { TextInput, TextInputProps, StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

type InputVariant = 'default' | 'outline' | 'filled' | 'unstyled';
type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends TextInputProps {
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  error?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

export function Input({
  variant = 'default',
  size = 'md',
  label,
  error,
  leftElement,
  rightElement,
  style,
  containerStyle,
  inputStyle,
  ...props
}: InputProps) {
  const { colors } = useTheme();

  const variantStyles = {
    default: {
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.border,
    },
    filled: {
      backgroundColor: colors.muted,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    unstyled: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      paddingHorizontal: 0,
    },
  };

  const sizeStyles = {
    sm: {
      paddingVertical: 6,
      paddingHorizontal: 10,
      fontSize: 14,
      height: 32,
      borderRadius: 6,
    },
    md: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      fontSize: 16,
      height: 40,
      borderRadius: 8,
    },
    lg: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      fontSize: 16,
      height: 48,
      borderRadius: 10,
    },
  };

  const inputStyles = [
    styles.input,
    variantStyles[variant],
    sizeStyles[size],
    { color: colors.text },
    style,
  ];

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: colors.text, marginBottom: 4 }]}>
          {label}
        </Text>
      )}
      <View style={[styles.inputContainer, { borderColor: error ? colors.danger : colors.border }]}>
        {leftElement && (
          <View style={styles.leftElement}>
            {leftElement}
          </View>
        )}
        <TextInput
          style={[inputStyles, inputStyle]}
          placeholderTextColor={colors.mutedText}
          {...props}
        />
        {rightElement && (
          <View style={styles.rightElement}>
            {rightElement}
          </View>
        )}
      </View>
      {error && (
        <Text style={[styles.error, { color: colors.danger }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    padding: 0,
    margin: 0,
    height: '100%',
  },
  leftElement: {
    marginLeft: 12,
    marginRight: 8,
  },
  rightElement: {
    marginRight: 12,
    marginLeft: 8,
  },
  error: {
    marginTop: 4,
    fontSize: 12,
  },
});
