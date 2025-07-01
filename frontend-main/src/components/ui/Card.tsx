import { View, StyleSheet, ViewStyle, Pressable, PressableProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

type CardVariant = 'elevated' | 'outline' | 'filled' | 'unstyled';

interface CardProps extends PressableProps {
  variant?: CardVariant;
  children: React.ReactNode;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  pressable?: boolean;
}

export function Card({
  variant = 'elevated',
  children,
  style,
  contentStyle,
  pressable = false,
  ...props
}: CardProps) {
  const { colors } = useTheme();

  const variantStyles = {
    elevated: {
      backgroundColor: colors.card,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
      borderWidth: 0,
    },
    outline: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: 'transparent',
      elevation: 0,
    },
    filled: {
      backgroundColor: colors.muted,
      borderWidth: 0,
      shadowColor: 'transparent',
      elevation: 0,
    },
    unstyled: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      shadowColor: 'transparent',
      elevation: 0,
    },
  };

  const cardStyles = [
    styles.card,
    variantStyles[variant],
    style,
  ];

  const content = (
    <View style={[styles.content, contentStyle]}>
      {children}
    </View>
  );

  if (pressable) {
    return (
      <Pressable
        style={({ pressed }) => [
          cardStyles,
          pressed && styles.pressed,
        ]}
        {...props}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={cardStyles}>{content}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
  },
  pressed: {
    opacity: 0.8,
  },
});

// Card Subcomponents
Card.Header = function CardHeader({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return (
    <View style={[styles.header, style]}>
      {children}
    </View>
  );
};

Card.Body = function CardBody({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return (
    <View style={[styles.body, style]}>
      {children}
    </View>
  );
};

Card.Footer = function CardFooter({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return (
    <View style={[styles.footer, style]}>
      {children}
    </View>
  );
};

const componentStyles = StyleSheet.create({
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  body: {
    padding: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
});
