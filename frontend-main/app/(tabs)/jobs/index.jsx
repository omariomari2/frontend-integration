import SearchBar from '../../../components/SearchBar.jsx';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';


// Theme configuration
const themes = {
  light: {
    background: '#ffffff',
    surface: '#ffffff',
    text: '#333333',
    textSecondary: '#666666',
    border: '#cccccc',
    searchIcon: '#666666',
  },
  dark: {
    background: '#171717',
    surface: '#171717',
    text: '#e5e5e5',
    textSecondary: '#cccccc',
    border: '#555555',
    searchIcon: '#ffffff',
  }
};

const JobsPage = () => {
  // Use the hook for better performance and automatic updates
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = themes[isDark ? 'dark' : 'light'];
  const router = useRouter();

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 24,
    },
    content: {
      flex: 1,
      maxWidth: 600,
      alignSelf: 'center',
      width: '100%',
    },
    title: {
      fontSize: 18,
      lineHeight: 27,
      color: theme.text,
      marginBottom: 32,
      fontFamily: 'System',
      fontWeight: 'normal',
    },
    searchContainer: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.surface,
      // Add subtle shadow for better visual hierarchy
      shadowColor: isDark ? '#000000' : '#000000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 2,
      elevation: 2, // For Android
    },
    searchIcon: {
      marginRight: 16,
      fontSize: 20,
      color: theme.searchIcon,
    },
    searchText: {
      flex: 1,
      fontSize: 16,
      color: theme.textSecondary,
      fontFamily: 'System',
      lineHeight: 24,
    }
  });

  const handleSearchPress = () => {
    console.log('Search pressed');
    // Handle search functionality
    // You might want to navigate to a search screen or open a modal
  };
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <SearchBar 
        onPress={() => router.push("/search")}
        placeholder="Search jobs" 
        // Pass theme props to SearchBar if it supports theming
        theme={theme}
        isDark={isDark}
      />
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>
            When recommended jobs become available, they will be displayed here.
          </Text>
          
          <TouchableOpacity 
            style={styles.searchContainer} 
            onPress={handleSearchPress}
            activeOpacity={0.7}
            accessible={true}
            accessibilityLabel="Search for job opportunities"
            accessibilityHint="Opens job search interface"
          >
            <Text style={styles.searchIcon}>🔍</Text>
            <Text style={styles.searchText}>
              Looking for new opportunities? Try searching by job title and location.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default JobsPage;