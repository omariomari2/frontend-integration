import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

const Header = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const isIOS = Platform.OS === 'ios';
  const isAndroid = Platform.OS === 'android';

  const styles = StyleSheet.create({
    container: {
      paddingTop: isIOS ? 44 : isAndroid ? StatusBar.currentHeight || 0 : 0,
      backgroundColor: isDark ? '#171717' : '#ffffff',
      borderBottomWidth: 0, // ✅ remove any bottom border
      shadowColor: 'transparent', // ✅ remove shadow
      elevation: 0, // ✅ remove Android shadow
      zIndex: 10, // keep it above
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 16,
    },
    logo: {
      fontSize: 22,
      fontWeight: '900',
      color: '#0CAA41',
      fontFamily: 'Poppins',
      letterSpacing: 1,
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
    },
    iconButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: 'transparent',
    },
  });

  const iconColor = isDark ? '#ffffff' : '#333333';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>JOBSEEK</Text>

        <View style={styles.rightSection}>
          <Link href="/notifications" asChild>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color={iconColor} />
            </TouchableOpacity>
          </Link>

          <Link href="/profile" asChild>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="person-outline" size={24} color={iconColor} />
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default Header;
