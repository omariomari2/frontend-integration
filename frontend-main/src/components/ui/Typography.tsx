import { Text, TextProps, StyleSheet, TextStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'overline';

interface TypographyProps extends TextProps {
  variant?: TextVariant;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  gutterBottom?: boolean;
  noWrap?: boolean;
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
}

export function Typography({
  variant = 'body1',
  color,
  align = 'left',
  gutterBottom = false,
  noWrap = false,
  children,
  style,
  ...props
}: TypographyProps) {
  const { colors } = useTheme();
  
  const variantStyles = {
    h1: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: '700',
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: 28,
      lineHeight: 36,
      fontWeight: '700',
      letterSpacing: -0.5,
    },
    h3: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: '600',
      letterSpacing: -0.5,
    },
    h4: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: '600',
      letterSpacing: -0.25,
    },
    h5: {
      fontSize: 18,
      lineHeight: 26,
      fontWeight: '600',
    },
    h6: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '600',
    },
    subtitle1: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '500',
    },
    subtitle2: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '500',
    },
    body1: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400',
    },
    body2: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '400',
    },
    button: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '400',
      opacity: 0.7,
    },
    overline: {
      fontSize: 10,
      lineHeight: 14,
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
  } as const;

  const textStyles = [
    styles.text,
    variantStyles[variant],
    { color: color || colors.text },
    { textAlign: align },
    gutterBottom && styles.gutterBottom,
    noWrap && styles.noWrap,
    style,
  ];

  return (
    <Text style={textStyles} {...props}>
      {children}
    </Text>
  );
}

// Predefined text components for common use cases
export const H1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h1" {...props} />
);

export const H2 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h2" {...props} />
);

export const H3 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h3" {...props} />
);

export const H4 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h4" {...props} />
);

export const H5 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h5" {...props} />
);

export const H6 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h6" {...props} />
);

export const Subtitle1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="subtitle1" {...props} />
);

export const Subtitle2 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="subtitle2" {...props} />
);

export const Body1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="body1" {...props} />
);

export const Body2 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="body2" {...props} />
);

export const ButtonText = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="button" {...props} />
);

export const Caption = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="caption" {...props} />
);

export const Overline = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="overline" {...props} />
);

const styles = StyleSheet.create({
  text: {
    fontFamily: 'System',
  },
  gutterBottom: {
    marginBottom: 8,
  },
  noWrap: {
    overflow: 'hidden',
  },
});
