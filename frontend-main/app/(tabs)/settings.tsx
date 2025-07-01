import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../src/hooks/useTheme';
import { ThemeToggle } from '../../src/components/ThemeToggle';
import { Card } from '../../src/components/ui/Card';
import { H3, Body1, H6 } from '../../src/components/ui/Typography';

export default function SettingsScreen() {
  const { colors, isDark } = useTheme();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Card style={styles.card}>
        <H6 style={styles.sectionTitle}>Appearance</H6>
        <View style={styles.settingItem}>
          <Body1>Theme</Body1>
          <ThemeToggle />
        </View>
      </Card>

      <Card style={styles.card}>
        <H6 style={styles.sectionTitle}>Account</H6>
        <View style={styles.settingItem}>
          <Body1>Edit Profile</Body1>
        </View>
        <View style={styles.divider} />
        <View style={styles.settingItem}>
          <Body1>Notification Settings</Body1>
        </View>
      </Card>

      <Card style={styles.card}>
        <H6 style={styles.sectionTitle}>About</H6>
        <View style={styles.settingItem}>
          <Body1>Version 1.0.0</Body1>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    gap: 16,
  },
  card: {
    width: '100%',
  },
  sectionTitle: {
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  divider: {
    height: 1,
    width: '100%',
    opacity: 0.1,
  },
});
