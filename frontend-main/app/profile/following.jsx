import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';

const FollowingPage = () => {
  const [activeSection, setActiveSection] = useState('companies');
  const [searchText, setSearchText] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const theme = {
    background: isDark ? '#171717' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    textSecondary: isDark ? '#9ca3af' : '#6b7280',
    activeIndicator: '#0CAA41',
    searchBackground: isDark ? '#374151' : '#f3f4f6',
    searchPlaceholder: isDark ? '#9ca3af' : '#6b7280',
  };

  const sections = [
    { id: 'companies', title: 'Companies' },
    { id: 'people', title: 'People' },
  ];

  // Custom illustration component
  const EmptyStateIllustration = () => (
    <View style={styles.illustrationContainer}>
      <Svg width="200" height="140" viewBox="0 0 200 140">
        {/* House outline */}
        <Path
          d="M50 120 L50 70 L70 50 L130 50 L150 70 L150 120 Z"
          stroke={theme.text}
          strokeWidth="2"
          fill="none"
        />
        
        {/* Door */}
        <Path
          d="M85 120 L85 85 L115 85 L115 120"
          stroke={theme.text}
          strokeWidth="2"
          fill="none"
        />
        
        {/* Green door panel */}
        <Rect
          x="100"
          y="85"
          width="15"
          height="35"
          fill="#0CAA41"
        />
        
        {/* Door handle */}
        <Circle cx="108" cy="102" r="2" fill={theme.text} />
        
        {/* House number */}
        <Rect
          x="65"
          y="62"
          width="12"
          height="8"
          stroke={theme.text}
          strokeWidth="1"
          fill="none"
        />
        <Text style={[styles.houseNumber, { color: theme.text }]}>15</Text>
        
        {/* Left plant pot */}
        <Path
          d="M30 120 L30 110 L45 110 L45 120"
          stroke={theme.text}
          strokeWidth="2"
          fill="none"
        />
        
        {/* Right plant pot */}
        <Path
          d="M155 120 L155 110 L170 110 L170 120"
          stroke={theme.text}
          strokeWidth="2"
          fill="none"
        />
        
        {/* Plants - simplified flower shapes */}
        <Circle cx="32" cy="108" r="3" stroke={theme.text} strokeWidth="1" fill="none" />
        <Circle cx="38" cy="105" r="3" stroke={theme.text} strokeWidth="1" fill="none" />
        <Circle cx="43" cy="108" r="3" stroke={theme.text} strokeWidth="1" fill="none" />
        
        <Circle cx="157" cy="108" r="3" stroke={theme.text} strokeWidth="1" fill="none" />
        <Circle cx="163" cy="105" r="3" stroke={theme.text} strokeWidth="1" fill="none" />
        <Circle cx="168" cy="108" r="3" stroke={theme.text} strokeWidth="1" fill="none" />
        
        {/* Plant stems */}
        <Path d="M37 108 L37 115" stroke={theme.text} strokeWidth="1" />
        <Path d="M162 108 L162 115" stroke={theme.text} strokeWidth="1" />
      </Svg>
    </View>
  );

  const SearchIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Circle cx="11" cy="11" r="8" stroke={theme.searchPlaceholder} strokeWidth="2"/>
      <Path d="m21 21-4.35-4.35" stroke={theme.searchPlaceholder} strokeWidth="2"/>
    </Svg>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'companies':
        return (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <EmptyStateIllustration />
            
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              You aren't following any companies yet.
            </Text>
            
            <Text style={[styles.emptyDescription, { color: theme.textSecondary }]}>
              You can search for a company and follow it from the company profile page.
            </Text>
            
            <View style={styles.searchSection}>
              <Text style={[styles.searchTitle, { color: theme.text }]}>
                Search for companies
              </Text>
              
              <View style={[styles.searchContainer, { backgroundColor: theme.searchBackground }]}>
                <SearchIcon />
                <TextInput
                  style={[styles.searchInput, { color: theme.text }]}
                  placeholder="Company name, e.g. JobSeek"
                  placeholderTextColor={theme.searchPlaceholder}
                  onPress={() => router.push("/search")} 
                />
              </View>
            </View>
          </ScrollView>
        );
      case 'people':
        return (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              You aren't following any people yet.
            </Text>
            <Text style={[styles.emptyDescription, { color: theme.textSecondary }]}>
              You can search for people and follow them from their profile page.
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
        <Text style={[styles.headerTitle, { color: theme.text }]}>Following</Text>
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
    marginRight: 32,
  },
  tabText: {
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  houseNumber: {
    position: 'absolute',
    top: 62,
    left: 68,
    fontSize: 8,
    fontWeight: 'bold',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
  },
  emptyDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 40,
  },
  searchSection: {
    width: '100%',
  },
  searchTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    height: '100%',
    fontFamily: 'Inter ',
  },
});

export default FollowingPage;