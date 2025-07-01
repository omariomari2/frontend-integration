import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0CAA41', // green like Glassdoor
        tabBarInactiveTintColor: isDark ? '#a1a1aa' : '#4b5563',
        tabBarStyle: {
          backgroundColor: isDark ? '#171717' : '#ffffff', // bg-neutral-900 for dark mode
          borderTopColor: isDark ? '#1f2937' : '#e5e7eb',
          height: 80,
          
        },
        tabBarLabelStyle: {
          fontSize: 12,
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
    </Tabs>
  );
}
