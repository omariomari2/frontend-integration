import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Appearance,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// Import all data
import { bowlsData } from '@/data/bowlsData';
import { companiesData } from '@/data/companiesData';
import { conversationsData } from '@/data/conversationsData';
import { interviewsData } from '@/data/interviewsData';
import { jobsData } from '@/data/jobsData';
import { reviewsData } from '@/data/reviewsData';
import { salariesData } from '@/data/salariesData';

const router = useRouter();

const SearchCommunityScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Set to dark mode by default to match screenshot
  const [activeSection, setActiveSection] = useState('conversations');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const sections = [
    { id: 'conversations', name: 'Conversations', icon: 'message-circle' },
    { id: 'bowls', name: 'Bowls', icon: 'coffee' },
    { id: 'jobs', name: 'Jobs', icon: 'briefcase' },
    { id: 'companies', name: 'Companies', icon: 'building' },
    { id: 'salaries', name: 'Salaries', icon: 'dollar-sign' },
    { id: 'reviews', name: 'Reviews', icon: 'star' },
    { id: 'interviews', name: 'Interviews', icon: 'users' },
  ];

  const placeholders = {
    conversations: { search: 'Conversations', location: 'All locations' },
    bowls: { search: 'Search bowls...', location: 'All categories' },
    jobs: { search: 'Job titles, keywords...', location: 'City, state, or remote' },
    companies: { search: 'Company names...', location: 'All industries' },
    salaries: { search: 'Job titles...', location: 'City, state' },
    reviews: { search: 'Company names...', location: 'All locations' },
    interviews: { search: 'Company names...', location: 'All positions' },
  };

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    setIsDarkMode(colorScheme === 'dark');
    
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });
    
    return () => subscription?.remove();
  }, []);

  const getDataForSection = (section) => {
    switch (section) {
      case 'conversations': return conversationsData;
      case 'bowls': return bowlsData;
      case 'jobs': return jobsData;
      case 'companies': return companiesData;
      case 'salaries': return salariesData;
      case 'reviews': return reviewsData;
      case 'interviews': return interviewsData;
      default: return [];
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      // If no search query, show all data for the current section
      const data = getDataForSection(activeSection);
      setSearchResults(data);
      setHasSearched(true);
      return;
    }

    const data = getDataForSection(activeSection);
    const filtered = data.filter(item => {
      const searchText = searchQuery.toLowerCase();
      
      switch (activeSection) {
        case 'conversations':
          return item.title.toLowerCase().includes(searchText) ||
                 item.preview.toLowerCase().includes(searchText) ||
                 item.tags.some(tag => tag.toLowerCase().includes(searchText));
        case 'bowls':
          return item.name.toLowerCase().includes(searchText) ||
                 item.description.toLowerCase().includes(searchText) ||
                 item.category.toLowerCase().includes(searchText);
        case 'jobs':
          return item.title.toLowerCase().includes(searchText) ||
                 item.company.toLowerCase().includes(searchText) ||
                 item.requirements.some(req => req.toLowerCase().includes(searchText));
        case 'companies':
          return item.name.toLowerCase().includes(searchText) ||
                 item.industry.toLowerCase().includes(searchText);
        case 'salaries':
          return item.jobTitle.toLowerCase().includes(searchText) ||
                 item.company.toLowerCase().includes(searchText);
        case 'reviews':
          return item.company.toLowerCase().includes(searchText) ||
                 item.title.toLowerCase().includes(searchText) ||
                 item.position.toLowerCase().includes(searchText);
        case 'interviews':
          return item.company.toLowerCase().includes(searchText) ||
                 item.position.toLowerCase().includes(searchText);
        default:
          return false;
      }
    });

    setSearchResults(filtered);
    setHasSearched(true);
  };

  const resetSearch = () => {
    setSearchQuery('');
    setLocationQuery('');
    setSearchResults([]);
    setHasSearched(false);
  };

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    resetSearch();
  };

  // Auto-load data when section changes
  useEffect(() => {
    if (activeSection === 'conversations') {
      const data = getDataForSection(activeSection);
      setSearchResults(data);
      setHasSearched(true);
    }
  }, [activeSection]);

  const renderSearchBar = () => (
    <View style={[styles.searchContainer, isDarkMode && styles.searchContainerDark]}>
      <View style={[styles.searchInputContainer, isDarkMode && styles.searchInputContainerDark]}>
        <Icon name="search" size={20} color={isDarkMode ? '#6B7280' : '#6B7280'} />
        <TextInput
          style={[styles.searchInput, isDarkMode && styles.searchInputDark]}
          placeholder={placeholders[activeSection].search}
          placeholderTextColor={isDarkMode ? '#6B7280' : '#6B7280'}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>
      
      <View style={[styles.searchInputContainer, isDarkMode && styles.searchInputContainerDark]}>
        <Icon name="map-pin" size={20} color={isDarkMode ? '#6B7280' : '#6B7280'} />
        <TextInput
          style={[styles.searchInput, isDarkMode && styles.searchInputDark]}
          placeholder={placeholders[activeSection].location}
          placeholderTextColor={isDarkMode ? '#6B7280' : '#6B7280'}
          value={locationQuery}
          onChangeText={setLocationQuery}
          returnKeyType="search"
        />
      </View>
    </View>
  );

  const renderSectionTabs = () => (
    <View style={[styles.sectionContainer, isDarkMode && styles.sectionContainerDark]}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.sectionContent}
      >
        {sections.map((section) => (
          <TouchableOpacity
            key={section.id}
            style={[
              styles.sectionTab,
              activeSection === section.id && styles.sectionTabActive,
            ]}
            onPress={() => handleSectionChange(section.id)}
          >
            <Text style={[
              styles.sectionTabText,
              isDarkMode && styles.sectionTabTextDark,
              activeSection === section.id && styles.sectionTabTextActive,
            ]}>
              {section.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderConversationItem = ({ item }) => (
    <TouchableOpacity style={[styles.resultItem, isDarkMode && styles.resultItemDark]}>
      <View style={styles.conversationHeader}>
        <Text style={[styles.conversationTitle, isDarkMode && styles.textDark]}>{item.title}</Text>
        <Text style={[styles.conversationTime, isDarkMode && styles.textSecondaryDark]}>{item.time}</Text>
      </View>
      <Text style={[styles.conversationPreview, isDarkMode && styles.textSecondaryDark]}>{item.preview}</Text>
      <View style={styles.conversationMeta}>
        <Text style={[styles.conversationAuthor, isDarkMode && styles.textSecondaryDark]}>by {item.author}</Text>
        <View style={styles.conversationStats}>
          <Text style={[styles.statText, isDarkMode && styles.textSecondaryDark]}>{item.replies} replies</Text>
          <Text style={[styles.statText, isDarkMode && styles.textSecondaryDark]}>{item.likes} likes</Text>
        </View>
      </View>
      <View style={styles.tagsContainer}>
        {item.tags.map((tag, index) => (
          <View key={index} style={[styles.tag, isDarkMode && styles.tagDark]}>
            <Text style={[styles.tagText, isDarkMode && styles.tagTextDark]}>#{tag}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  const renderBowlItem = ({ item }) => (
    <TouchableOpacity style={[styles.resultItem, isDarkMode && styles.resultItemDark]}>
      <View style={styles.bowlHeader}>
        <Text style={styles.bowlIcon}>{item.icon}</Text>
        <View style={styles.bowlInfo}>
          <Text style={[styles.bowlName, isDarkMode && styles.textDark]}>{item.name}</Text>
          <Text style={[styles.bowlMembers, isDarkMode && styles.textSecondaryDark]}>{item.members} members</Text>
        </View>
        {item.isPrivate && (
          <View style={[styles.privateBadge, isDarkMode && styles.privateBadgeDark]}>
            <Text style={[styles.privateBadgeText, isDarkMode && styles.privateBadgeTextDark]}>Private</Text>
          </View>
        )}
      </View>
      <Text style={[styles.bowlDescription, isDarkMode && styles.textSecondaryDark]}>{item.description}</Text>
      <View style={styles.bowlMeta}>
        <Text style={[styles.bowlCategory, isDarkMode && styles.textSecondaryDark]}>{item.category}</Text>
        <Text style={[styles.bowlPosts, isDarkMode && styles.textSecondaryDark]}>{item.posts} posts</Text>
      </View>
    </TouchableOpacity>
  );

  const renderJobItem = ({ item }) => (
    <TouchableOpacity style={[styles.resultItem, isDarkMode && styles.resultItemDark]}>
      <View style={styles.jobHeader}>
        <Text style={[styles.jobTitle, isDarkMode && styles.textDark]}>{item.title}</Text>
        <Text style={[styles.jobPosted, isDarkMode && styles.textSecondaryDark]}>{item.posted}</Text>
      </View>
      <Text style={[styles.jobCompany, isDarkMode && styles.textSecondaryDark]}>{item.company}</Text>
      <Text style={[styles.jobLocation, isDarkMode && styles.textSecondaryDark]}>{item.location}</Text>
      <View style={styles.jobDetails}>
        <Text style={[styles.jobSalary, isDarkMode && styles.textDark]}>{item.salary}</Text>
        <Text style={[styles.jobType, isDarkMode && styles.textSecondaryDark]}>{item.type}</Text>
        {item.remote && (
          <View style={[styles.remoteBadge, isDarkMode && styles.remoteBadgeDark]}>
            <Text style={[styles.remoteBadgeText, isDarkMode && styles.remoteBadgeTextDark]}>Remote</Text>
          </View>
        )}
      </View>
      <Text style={[styles.jobApplicants, isDarkMode && styles.textSecondaryDark]}>{item.applicants} applicants</Text>
      <View style={styles.requirementsContainer}>
        {item.requirements.map((req, index) => (
          <View key={index} style={[styles.requirement, isDarkMode && styles.requirementDark]}>
            <Text style={[styles.requirementText, isDarkMode && styles.requirementTextDark]}>{req}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  const renderCompanyItem = ({ item }) => (
    <TouchableOpacity style={[styles.resultItem, isDarkMode && styles.resultItemDark]}>
      <View style={styles.companyHeader}>
        <Text style={styles.companyLogo}>{item.logo}</Text>
        <View style={styles.companyInfo}>
          <Text style={[styles.companyName, isDarkMode && styles.textDark]}>{item.name}</Text>
          <View style={styles.companyRating}>
            <Text style={[styles.ratingText, isDarkMode && styles.textDark]}>★ {item.rating}</Text>
            <Text style={[styles.reviewCount, isDarkMode && styles.textSecondaryDark]}>({item.reviews} reviews)</Text>
          </View>
        </View>
      </View>
      <Text style={[styles.companyDescription, isDarkMode && styles.textSecondaryDark]}>{item.description}</Text>
      <View style={styles.companyMeta}>
        <Text style={[styles.companyIndustry, isDarkMode && styles.textSecondaryDark]}>{item.industry}</Text>
        <Text style={[styles.companySize, isDarkMode && styles.textSecondaryDark]}>{item.size}</Text>
      </View>
      <Text style={[styles.companyLocation, isDarkMode && styles.textSecondaryDark]}>{item.headquarters}</Text>
    </TouchableOpacity>
  );

  const renderSalaryItem = ({ item }) => (
    <TouchableOpacity style={[styles.resultItem, isDarkMode && styles.resultItemDark]}>
      <View style={styles.salaryHeader}>
        <Text style={[styles.salaryJobTitle, isDarkMode && styles.textDark]}>{item.jobTitle}</Text>
        <Text style={[styles.salaryDate, isDarkMode && styles.textSecondaryDark]}>{item.submittedDate}</Text>
      </View>
      <Text style={[styles.salaryCompany, isDarkMode && styles.textSecondaryDark]}>{item.company}</Text>
      <View style={styles.salaryDetails}>
        <View style={styles.salaryItem}>
          <Text style={[styles.salaryLabel, isDarkMode && styles.textSecondaryDark]}>Base Salary</Text>
          <Text style={[styles.salaryAmount, isDarkMode && styles.textDark]}>${item.baseSalary.toLocaleString()}</Text>
        </View>
        <View style={styles.salaryItem}>
          <Text style={[styles.salaryLabel, isDarkMode && styles.textSecondaryDark]}>Total Comp</Text>
          <Text style={[styles.salaryAmount, isDarkMode && styles.textDark]}>${item.totalComp.toLocaleString()}</Text>
        </View>
      </View>
      <View style={styles.salaryMeta}>
        <Text style={[styles.salaryExperience, isDarkMode && styles.textSecondaryDark]}>{item.experience}</Text>
        <Text style={[styles.salaryLocation, isDarkMode && styles.textSecondaryDark]}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderReviewItem = ({ item }) => (
    <TouchableOpacity style={[styles.resultItem, isDarkMode && styles.resultItemDark]}>
      <View style={styles.reviewHeader}>
        <Text style={[styles.reviewCompany, isDarkMode && styles.textDark]}>{item.company}</Text>
        <View style={styles.reviewRating}>
          <Text style={[styles.ratingText, isDarkMode && styles.textDark]}>★ {item.rating}</Text>
        </View>
      </View>
      <Text style={[styles.reviewTitle, isDarkMode && styles.textDark]}>{item.title}</Text>
      <View style={styles.reviewMeta}>
        <Text style={[styles.reviewPosition, isDarkMode && styles.textSecondaryDark]}>{item.position}</Text>
        <Text style={[styles.reviewEmployment, isDarkMode && styles.textSecondaryDark]}>{item.employment}</Text>
        <Text style={[styles.reviewDate, isDarkMode && styles.textSecondaryDark]}>{item.date}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text style={[styles.reviewLabel, isDarkMode && styles.textSecondaryDark]}>Pros:</Text>
        <Text style={[styles.reviewText, isDarkMode && styles.textDark]}>{item.pros}</Text>
        <Text style={[styles.reviewLabel, isDarkMode && styles.textSecondaryDark]}>Cons:</Text>
        <Text style={[styles.reviewText, isDarkMode && styles.textDark]}>{item.cons}</Text>
      </View>
      <Text style={[styles.reviewHelpful, isDarkMode && styles.textSecondaryDark]}>{item.helpful} found helpful</Text>
    </TouchableOpacity>
  );

  const renderInterviewItem = ({ item }) => (
    <TouchableOpacity style={[styles.resultItem, isDarkMode && styles.resultItemDark]}>
      <View style={styles.interviewHeader}>
        <Text style={[styles.interviewCompany, isDarkMode && styles.textDark]}>{item.company}</Text>
        <View style={[styles.difficultyBadge, styles[`difficulty${item.difficulty}`]]}>
          <Text style={styles.difficultyText}>{item.difficulty}</Text>
        </View>
      </View>
      <Text style={[styles.interviewPosition, isDarkMode && styles.textSecondaryDark]}>{item.position}</Text>
      <View style={styles.interviewMeta}>
        <Text style={[styles.interviewExperience, isDarkMode && styles.textSecondaryDark]}>Experience: {item.experience}</Text>
        <Text style={[styles.interviewDuration, isDarkMode && styles.textSecondaryDark]}>Duration: {item.duration}</Text>
      </View>
      <Text style={[styles.interviewProcess, isDarkMode && styles.textDark]}>{item.process}</Text>
      <View style={styles.interviewQuestions}>
        <Text style={[styles.questionsLabel, isDarkMode && styles.textSecondaryDark]}>Sample Questions:</Text>
        {item.questions.slice(0, 2).map((question, index) => (
          <Text key={index} style={[styles.questionText, isDarkMode && styles.textDark]}>• {question}</Text>
        ))}
      </View>
      <View style={styles.interviewResult}>
        <Text style={[styles.resultLabel, isDarkMode && styles.textSecondaryDark]}>
          Result: {item.offer ? 'Offer Received' : 'No Offer'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderResultItem = ({ item }) => {
    switch (activeSection) {
      case 'conversations': return renderConversationItem({ item });
      case 'bowls': return renderBowlItem({ item });
      case 'jobs': return renderJobItem({ item });
      case 'companies': return renderCompanyItem({ item });
      case 'salaries': return renderSalaryItem({ item });
      case 'reviews': return renderReviewItem({ item });
      case 'interviews': return renderInterviewItem({ item });
      default: return null;
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="search" size={60} color={isDarkMode ? '#4B5563' : '#9CA3AF'} />
      <Text style={[styles.emptyStateText, isDarkMode && styles.emptyStateTextDark]}>
        {hasSearched ? 'No results found' : `Search ${activeSection} to see results`}
      </Text>
      {hasSearched && (
        <TouchableOpacity style={styles.clearButton} onPress={resetSearch}>
          <Text style={styles.clearButtonText}>Clear Search</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#1F2937' : '#ffffff'}
      />
      
      {/* Header */}
      <View style={[styles.header, isDarkMode && styles.headerDark]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="chevron-left" size={24} color={isDarkMode ? '#ffffff' : '#000000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDarkMode && styles.headerTitleDark]}>Search community</Text>
      </View>

      {/* Search Bars */}
      {renderSearchBar()}

      {/* Section Tabs */}
      {renderSectionTabs()}

      {/* Results */}
      <View style={[styles.resultsContainer, isDarkMode && styles.resultsContainerDark]}>
        {searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
            renderItem={renderResultItem}
            keyExtractor={(item) => `${activeSection}-${item.id}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.resultsList}
          />
        ) : (
          renderEmptyState()
        )}
      </View>
    </SafeAreaView>
  );
};

// Theme colors constant
const colors = {
  light: {
    background: '#ffffff',
    surface: '#f8f9fa',
    surfaceSecondary: '#ffffff',
    primary: '#0caa41', // Glassdoor green
    primaryLight: '#e8f5e8',
    secondary: '#1861bf', // Glassdoor blue
    secondaryLight: '#e3f2fd',
    text: '#2d2d2d',
    textSecondary: '#767676',
    textTertiary: '#999999',
    border: '#e4e6ea',
    borderLight: '#f0f2f7',
    shadow: 'rgba(0, 0, 0, 0.08)',
    overlay: 'rgba(0, 0, 0, 0.6)',
    success: '#0caa41',
    warning: '#ff6900',
    error: '#d93025',
    searchInput: '#f0f2f7',
    searchInputText: '#2d2d2d',
    placeholder: '#767676',
    tabInactive: '#767676',
    tabActive: '#0caa41',
    cardShadow: 'rgba(0, 0, 0, 0.04)',
  },
  dark: {
    background: '#171717',
    surface: '#262626',
    surfaceSecondary: '#1f1f1f',
    primary: '#0caa41', // Keep Glassdoor green
    primaryLight: '#1a3d1a',
    secondary: '#4285f4', // Lighter blue for dark mode
    secondaryLight: '#1a2332',
    text: '#ffffff',
    textSecondary: '#a3a3a3',
    textTertiary: '#737373',
    border: '#404040',
    borderLight: '#2a2a2a',
    shadow: 'rgba(0, 0, 0, 0.3)',
    overlay: 'rgba(0, 0, 0, 0.8)',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    searchInput: '#2a2a2a',
    searchInputText: '#ffffff',
    placeholder: '#737373',
    tabInactive: '#a3a3a3',
    tabActive: '#22c55e',
    cardShadow: 'rgba(0, 0, 0, 0.2)',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  containerDark: {
    backgroundColor: colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.light.background,
  },
  headerDark: {
    backgroundColor: colors.dark.background,
    borderBottomColor: colors.dark.border,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    color: colors.light.text,
    fontFamily: 'Poppins',
    marginLeft: 50
  },
  headerTitleDark: {
    color: colors.dark.text,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: colors.light.background,
    gap: 12,
  },
  searchContainerDark: {
    backgroundColor: colors.dark.background,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light.searchInput,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.light.border,
  },
  searchInputContainerDark: {
    backgroundColor: colors.dark.searchInput,
    borderColor: colors.dark.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.light.searchInputText,
  },
  searchInputDark: {
    color: colors.dark.searchInputText,
  },
  sectionContainer: {
    backgroundColor: colors.light.background,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.borderLight,
  },
  sectionContainerDark: {
    backgroundColor: colors.dark.background,
    borderBottomColor: colors.dark.border,
  },
  sectionContent: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  sectionTab: {
    paddingHorizontal: 0,
    paddingVertical: 12,
    marginRight: 32,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  sectionTabActive: {
    borderBottomColor: colors.light.tabActive,
  },
  sectionTabText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.light.tabInactive,
  },
  sectionTabTextDark: {
    color: colors.dark.tabInactive,
  },
  sectionTabTextActive: {
    color: colors.light.tabActive,
    fontWeight: '600',
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: colors.light.surface,
  },
  resultsContainerDark: {
    backgroundColor: colors.dark.background,
  },
  resultsList: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  resultItem: {
    backgroundColor: colors.light.surfaceSecondary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.light.border,
    shadowColor: colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultItemDark: {
    backgroundColor: colors.dark.surface,
    borderColor: colors.dark.border,
    shadowColor: colors.dark.cardShadow,
  },
  textDark: {
    color: colors.dark.text,
  },
  textSecondaryDark: {
    color: colors.dark.textSecondary,
  },
  
  // Conversation styles
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  conversationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.light.text,
    flex: 1,
    marginRight: 8,
    lineHeight: 22,
  },
  conversationTime: {
    fontSize: 12,
    color: colors.light.textTertiary,
  },
  conversationPreview: {
    fontSize: 14,
    color: colors.light.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  conversationMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  conversationAuthor: {
    fontSize: 12,
    color: colors.light.textSecondary,
  },
  conversationStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statText: {
    fontSize: 12,
    color: colors.light.textTertiary,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: colors.light.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagDark: {
    backgroundColor: colors.dark.primaryLight,
  },
  tagText: {
    fontSize: 12,
    color: colors.light.primary,
    fontWeight: '500',
  },
  tagTextDark: {
    color: colors.dark.primary,
  },

  // Bowl styles
  bowlHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bowlIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  bowlInfo: {
    flex: 1,
  },
  bowlName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.light.text,
  },
  bowlMembers: {
    fontSize: 12,
    color: colors.light.textSecondary,
  },
  privateBadge: {
    backgroundColor: '#fff4e6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  privateBadgeDark: {
    backgroundColor: '#332b1f',
  },
  privateBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.light.warning,
  },
  privateBadgeTextDark: {
    color: colors.dark.warning,
  },
  bowlDescription: {
    fontSize: 14,
    color: colors.light.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  bowlMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bowlCategory: {
    fontSize: 12,
    color: colors.light.textTertiary,
  },
  bowlPosts: {
    fontSize: 12,
    color: colors.light.textTertiary,
  },

  // Job styles
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.light.text,
    flex: 1,
    marginRight: 8,
    lineHeight: 22,
  },
  jobPosted: {
    fontSize: 12,
    color: colors.light.textTertiary,
  },
  jobCompany: {
    fontSize: 14,
    color: colors.light.secondary,
    marginBottom: 4,
    fontWeight: '500',
  },
  jobLocation: {
    fontSize: 14,
    color: colors.light.textSecondary,
    marginBottom: 12,
  },
  jobDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  jobSalary: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.light.primary,
  },
  jobType: {
    fontSize: 12,
    color: colors.light.textSecondary,
  },
  remoteBadge: {
    backgroundColor: colors.light.secondaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  remoteBadgeDark: {
    backgroundColor: colors.dark.secondaryLight,
  },
  remoteBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.light.secondary,
  },
  remoteBadgeTextDark: {
    color: colors.dark.secondary,
  },
  jobApplicants: {
    fontSize: 12,
    color: colors.light.textTertiary,
    marginBottom: 12,
  },
  requirementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  requirement: {
    backgroundColor: colors.light.borderLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  requirementDark: {
    backgroundColor: colors.dark.borderLight,
  },
  requirementText: {
    fontSize: 12,
    color: colors.light.textSecondary,
  },
  requirementTextDark: {
    color: colors.dark.textSecondary,
  },

  // Company styles
  companyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  companyLogo: {
    fontSize: 24,
    marginRight: 12,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.light.text,
  },
  companyRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.light.primary,
  },
  reviewCount: {
    fontSize: 12,
    color: colors.light.textSecondary,
  },
  companyDescription: {
    fontSize: 14,
    color: colors.light.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  companyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  companyIndustry: {
    fontSize: 12,
    color: colors.light.textSecondary,
  },
  companySize: {
    fontSize: 12,
    color: colors.light.textTertiary,
  },
  companyLocation: {
    fontSize: 12,
    color: colors.light.textTertiary,
  },

  // Salary styles
  salaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  salaryJobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.light.text,
    flex: 1,
    marginRight: 8,
  },
  salaryDate: {
    fontSize: 12,
    color: colors.light.textTertiary,
  },
  salaryCompany: {
    fontSize: 14,
    color: colors.light.secondary,
    marginBottom: 12,
    fontWeight: '500',
  },
  salaryDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  salaryItem: {
    flex: 1,
  },
  salaryLabel: {
    fontSize: 12,
    color: colors.light.textSecondary,
    marginBottom: 4,
  },
  salaryAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.light.primary,
  },
  salaryMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  salaryExperience: {
    fontSize: 12,
    color: colors.light.textSecondary,
  },
  salaryLocation: {
    fontSize: 12,
    color: colors.light.textTertiary,
  },

  // Review styles
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewCompany: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.light.text,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.light.text,
    marginBottom: 8,
  },
  reviewMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  reviewPosition: {
    fontSize: 12,
    color: colors.light.textSecondary,
  },
  reviewEmployment: {
    fontSize: 12,
    color: colors.light.textTertiary,
  },
  reviewDate: {
    fontSize: 12,
    color: colors.light.textTertiary,
  },
  reviewContent: {
    marginBottom: 12,
  },
  reviewLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.light.textSecondary,
    marginBottom: 4,
    marginTop: 8,
  },
  reviewText: {
    fontSize: 14,
    color: colors.light.text,
    lineHeight: 20,
  },
  reviewHelpful: {
    fontSize: 12,
    color: colors.light.textTertiary,
  },

  // Interview styles
  interviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  interviewCompany: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.light.text,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  difficultyEasy: {
    backgroundColor: '#e8f5e9',
  },
  difficultyMedium: {
    backgroundColor: '#fff4e6',
  },
  difficultyHard: {
    backgroundColor: '#ffebee',
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.light.text,
  },
  interviewPosition: {
    fontSize: 14,
    color: colors.light.textSecondary,
    marginBottom: 8,
  },
  interviewMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  interviewExperience: {
    fontSize: 12,
    color: colors.light.textSecondary,
  },
  interviewDuration: {
    fontSize: 12,
    color: colors.light.textSecondary,
  },
  interviewProcess: {
    fontSize: 14,
    color: colors.light.text,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  interviewQuestions: {
    marginBottom: 12,
  },
  questionsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.light.textSecondary,
    marginBottom: 8,
  },
  questionText: {
    fontSize: 13,
    color: colors.light.text,
    marginBottom: 4,
    paddingLeft: 8,
  },
  interviewResult: {
    borderTopWidth: 1,
    borderTopColor: colors.light.borderLight,
    paddingTop: 8,
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.light.textSecondary,
  },

  // Empty state
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.light.textSecondary,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  emptyStateTextDark: {
    color: colors.dark.textSecondary,
  },
  clearButton: {
    backgroundColor: colors.light.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
  },
  clearButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SearchCommunityScreen;