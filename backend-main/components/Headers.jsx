import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';

const Headers = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: isDark ? '#171717' : '#ffffff',
      paddingHorizontal: 24,
      paddingVertical: 16,
      // borderBottomWidth: 1,
      // borderBottomColor: isDark ? '#333333' : '#e5e5e5',
    },
    logo: {
      fontSize: 20,
      fontWeight: '900', // use string for weight
      color: '#22c55e',
      fontFamily: 'System',
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
    <View style={styles.header}>
      <Text style={styles.logo}>JOBSEEK</Text>


      <View style={styles.rightSection}>
        <Link href="/notifications" asChild>
        <TouchableOpacity style={styles.iconButton} onPress={() => console.log('Notification pressed')}>
          <Ionicons name="notifications-outline" size={24} color={iconColor} />
        </TouchableOpacity>
        </Link>

        <Link href="/profiles" asChild>
        <TouchableOpacity style={styles.iconButton} onPress={() => console.log('Profile pressed')}>
          <Ionicons name="person-outline" size={24} color={iconColor} />
        </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default Headers;
