import { FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../src/hooks/useTheme';
import Header from '../../components/Header'; // Adjust path if needed

export default function TabLayout() {
  const { colors, isDark } = useTheme();

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.mutedText,
            tabBarStyle: {
              backgroundColor: colors.card,
              borderTopColor: colors.border,
              height: 80,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: 'Inter'
            },

          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Community',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account-group" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="jobs"
            options={{
              title: 'Jobs',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="briefcase" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="companies"
            options={{
              title: 'Companies',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="building" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="salaries"
            options={{
              title: 'Salaries',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="money-check-alt" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Settings',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="settings" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  content: { 
    flex: 1,
  },
});
