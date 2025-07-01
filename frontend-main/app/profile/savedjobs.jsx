import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const SavedJobsPage = () => {
  const [activeSection, setActiveSection] = useState('saved');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const theme = {
    background: isDark ? '#171717' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    textSecondary: isDark ? '#9ca3af' : '#6b7280',
    activeIndicator: '#0CAA41',
  };

  const sections = [
    { id: 'saved', title: 'Saved jobs' },
    { id: 'alerts', title: 'Job alerts' },
    { id: 'applied', title: 'Applied jobs' },
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'saved':
        return (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: theme.text }]}>
              You haven't saved any jobs yet.
            </Text>
          </View>
        );
      case 'alerts':
        return (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: theme.text }]}>
              No job alerts set up yet.
            </Text>
          </View>
        );
      case 'applied':
        return (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: theme.text }]}>
              You haven't applied to any jobs yet.
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="chevron-left" size={24} color={isDark ? '#ffffff' : '#000000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Saved</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tab Navigation */} 
      <View style={styles.tabContainer}>
        {sections.map((section) => (
          <TouchableOpacity
            key={section.id}
            style={[
              styles.tab,
              activeSection === section.id && {
                borderBottomColor: theme.activeIndicator,
                borderBottomWidth: 2,
              },
            ]}
            onPress={() => setActiveSection(section.id)}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: activeSection === section.id ? theme.text : theme.textSecondary,
                  fontWeight: activeSection === section.id ? '600' : '400',
                },
              ]}
            >
              {section.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {renderSectionContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 56,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 24,
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  placeholder: {
    width: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginRight: 24,
  },
  tabText: {
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default SavedJobsPage;