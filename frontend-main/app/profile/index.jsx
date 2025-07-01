import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useProfile } from '../../src/hooks/useProfile';

export default function UserProfileScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { data: userData, isLoading, isError, error, refetch } = useProfile();

  useEffect(() => {
    loadUserData();
    
    // Listen for focus to reload user data when returning from profile picture screen
    const unsubscribe = router.addListener?.('focus', () => {
      loadUserData();
    });

    return unsubscribe;
  }, []);

  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        setUserData(JSON.parse(data));
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userToken');
              router.replace('/(auth)/login');
            } catch (error) {
              console.error('Logout failed:', error);
            }
          },
        },
      ]
    );
  };

  const menuItems = [
    { id: 'profile', title: 'Profile', icon: 'user' },
    { id: 'portfolio', title: 'Portfolio', icon: 'briefcase' },
    { id: 'saved', title: 'Saved jobs', icon: 'bookmark' },
    { id: 'preferences', title: 'Job preferences', icon: 'settings' },
    { id: 'following', title: 'Following', icon: 'users' },
    { id: 'activity', title: 'Posting activity', icon: 'message-circle' },
    { id: 'settings', title: 'Account settings', icon: 'settings' },
    { id: 'demographics', title: 'Demographics', icon: 'bar-chart-2' },
  ];

  const handleMenuPress = (itemId) => {
    switch (itemId) {
      case 'profile':
        router.push('./profile/userprofile');
        break;
      case 'portfolio':
        router.push('./profile/portfolio');
        break;
      case 'saved':
        router.push('./profile/savedjobs');
        break;
      case 'preferences':
        router.push('./profile/jobpreferences');
        break;
      case 'following':
        router.push('./profile/following');
        break;
      case 'activity':
        router.push('./profile/postingactivity');
        break;
      case 'settings':
        router.push('./profile/accountsettings');
        break;
      case 'demographics':
        router.push('./profile/demographics');
        break;
      default:
        console.log('Unknown menu item:', itemId);
    }
  };

  const handleAvatarPress = () => {
    // Navigate to profile picture screen
    router.push('./profile/editUser/editProfilePicture');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#171717' : '#ffffff',
    },
    safeArea: {
      flex: 1,
      backgroundColor: isDark ? '#171717' : '#ffffff',
    },
    header: {
      alignItems: 'center',
      paddingVertical: 40,
      paddingHorizontal: 24,
      paddingTop: 20,
    },
     headerText: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    backButton: {
      padding: 4,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      fontFamily: 'Poppins',
      textAlign: 'center',
    },
    headerRight: {
      width: 32,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#5A67D8',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      position: 'relative',
    },
    avatarImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    avatarText: {
      color: '#ffffff',
      fontSize: 36,
      fontFamily: 'Poppins'
    },
    editIcon: {
      position: 'absolute',
      bottom: 4,
      right: 4,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: isDark ? '#374151' : '#f3f4f6',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: isDark ? '#1a1a1a' : '#ffffff',
    },
    name: {
      fontSize: 24,
      fontFamily: 'Poppins',
      color: isDark ? '#ffffff' : '#1a1a1a',
      textAlign: 'center',
      marginBottom: 8,
    },
    email: {
      fontSize: 16,
      fontFamily: 'Poppins',
      color: isDark ? '#a3a3a3' : '#666666',
      textAlign: 'center',
      marginBottom: 10,
    },
    menuContainer: {
      flex: 1,
      paddingHorizontal: 24,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 0,
    },
    menuIcon: {
      width: 24,
      height: 24,
      marginRight: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    menuTitle: {
      fontSize: 16,
      fontFamily: 'Poppins',
      color: isDark ? '#ffffff' : '#1a1a1a',
      flex: 1,
    },
    logoutButton: {
      backgroundColor: '#dc2626',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginTop: 20,
      marginHorizontal: 24,
      marginBottom: 30,
    },
    logoutText: {
      color: '#ffffff',
      fontSize: 16,
      fontFamily: 'Poppins',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 18,
      fontFamily: 'Poppins',
      color: isDark ? '#ffffff' : '#1a1a1a',
    },
  });

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Failed to load profile: {error?.message || 'Unknown error'}</Text>
        <TouchableOpacity onPress={refetch} style={{ marginTop: 16 }}>
          <Text style={{ color: '#2563eb', fontSize: 16 }}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
       {/* Header */}
      <View style={styles.headerText}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <Icon name="chevron-left" size={24} color={isDark ? '#ffffff' : '#000000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
          Profile
        </Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.header}>
        <TouchableOpacity style={styles.avatar} onPress={handleAvatarPress} activeOpacity={0.7}>
          {userData.profileImage ? (
            <Image source={{ uri: userData.profileImage }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarText} className='font-poppins'>
              {getInitials(userData.fullName || userData.name)}
            </Text>
          )}
          <View style={styles.editIcon}>
            <Icon name="camera" size={16} color={isDark ? '#ffffff' : '#374151'} />
          </View>
        </TouchableOpacity>
        <Text style={styles.name}>
          {userData.fullName || userData.name || 'User'}
        </Text>
        <Text style={styles.email}>
          {userData.email || 'No email provided'}
        </Text>
      </View>

      <View style={styles.menuContainer} showsVerticalScrollIndicator={false}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => handleMenuPress(item.id)}
          >
            <View style={styles.menuIcon}>
              <Icon name={item.icon} size={20} color={isDark ? '#ffffff' : '#374151'} />
            </View>
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Icon name="chevron-right" size={16} color={isDark ? '#9ca3af' : '#6b7280'} />
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}