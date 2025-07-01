import { Stack } from 'expo-router';
import './global.css';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // 👈 applies to all screens unless overridden
      }}
    >
      {/* Optional: define individual screens if needed */}
    </Stack>
  );
}
