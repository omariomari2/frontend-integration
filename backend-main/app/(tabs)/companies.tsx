import Headers from '@/components/Headers';
import SearchBar from '@/components/SearchBar';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, useColorScheme, View } from 'react-native';

const CompaniesPage = () => {
  const colorScheme = useColorScheme();
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
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: 24,
      marginTop: 24,
      fontFamily: 'System',
    },
    subtitle: {
      fontSize: 18,
      lineHeight: 27,
      color: isDark ? '#e5e5e5' : '#333333',
      marginBottom: 48,
      fontFamily: 'System',
    },
    illustrationContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 400,
    },
    image: {
      width: '100%',
      maxWidth: 500,
      height: 300,
      resizeMode: 'contain',
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <Headers  />
      <SearchBar placeholder='Search companies' />
      <View style={styles.content}>
        <Text style={styles.title}>Companies</Text>
        <Text style={styles.subtitle}>
          Got burning questions? Get answers about salaries, reviews, interviews, open jobs, diversity and inclusion, and more.
        </Text>
        
        <View style={styles.illustrationContainer}>
          <Image 
            source={{uri: 'https://your-image-url.com/image.png'}} 
            style={styles.image}
            alt="Companies illustration"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CompaniesPage;