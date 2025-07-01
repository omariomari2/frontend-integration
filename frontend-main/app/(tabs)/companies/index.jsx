import SearchBar from '../../../components/SearchBar.jsx';

import { useRouter } from 'expo-router';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from 'react-native';

const CompaniesPage = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const router = useRouter();

  const theme = {
    background: isDarkMode ? '#171717' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    secondaryText: isDarkMode ? '#E5E5E5' : '#333333',
    accent: '#22C55E',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <SearchBar onPress={() => router.push("/search")} placeholder='Search companies' />
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Companies</Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 24,
    marginTop: 24,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 27,
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

export default CompaniesPage;