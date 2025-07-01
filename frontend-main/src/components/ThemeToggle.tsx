import { Switch, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Moon, Sun } from 'lucide-react-native';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const { colors } = useTheme();

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      padding: 8,
      borderRadius: 20,
      backgroundColor: colors.muted,
    }}>
      <Sun size={20} color={isDark ? colors.mutedText : colors.primary} />
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        trackColor={{ false: colors.border, true: colors.primaryLight }}
        thumbColor={isDark ? colors.primary : colors.background}
      />
      <Moon size={20} color={isDark ? colors.primary : colors.mutedText} />
    </View>
  );
}
