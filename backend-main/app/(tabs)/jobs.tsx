import Headers from '@/components/Headers';
import SearchBar from '@/components/SearchBar';
import React from 'react';
import { Appearance, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const JobsPage = () => {
  const colorScheme = Appearance.getColorScheme();
  const isDark = colorScheme === 'dark';
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#171717' : '#ffffff',
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
      color: isDark ? '#e5e5e5' : '#333333',
      marginBottom: 32,
      fontFamily: 'System',
      fontWeight: 'normal',
    },
    searchContainer: {
      borderWidth: 1,
      borderColor: isDark ? '#555555' : '#cccccc',
      borderRadius: 8,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#171717' : '#ffffff',
    },
    searchIcon: {
      marginRight: 16,
      fontSize: 20,
      color: isDark ? '#ffffff' : '#666666',
    },
    searchText: {
      flex: 1,
      fontSize: 16,
      color: isDark ? '#ffffff' : '#333333',
      fontFamily: 'System',
    }
  });

  const handleSearchPress = () => {
    console.log('Search pressed');
    // Handle search functionality
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#171717' : '#ffffff' }}>
      <Headers />
      <SearchBar placeholder="Search jobs" />
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          When recommended jobs become available, they will be displayed here.
        </Text>
        
        <TouchableOpacity style={styles.searchContainer} onPress={handleSearchPress}>
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