import SearchBar from '../../../components/SearchBar.jsx';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';


const SalariesPage = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  
  
  // Extended salary data for load more functionality
  const allSalaryData = [
    {
      id: 1,
      jobTitle: 'Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      baseSalary: 150000,
      totalComp: 280000,
      experience: '3-5 years',
      verified: true,
      category: 'Tech Companies',
      level: 'Mid Level',
    },
    {
      id: 2,
      jobTitle: 'Product Manager',
      company: 'Meta',
      location: 'Menlo Park, CA',
      baseSalary: 160000,
      totalComp: 320000,
      experience: '5-7 years',
      verified: true,
      category: 'Tech Companies',
      level: 'Senior Level',
    },
    {
      id: 3,
      jobTitle: 'Data Scientist',
      company: 'Netflix',
      location: 'Los Gatos, CA',
      baseSalary: 140000,
      totalComp: 250000,
      experience: '2-4 years',
      verified: false,
      category: 'Tech Companies',
      level: 'Mid Level',
    },
    {
      id: 4,
      jobTitle: 'UX Designer',
      company: 'Apple',
      location: 'Cupertino, CA',
      baseSalary: 130000,
      totalComp: 200000,
      experience: '4-6 years',
      verified: true,
      category: 'Tech Companies',
      level: 'Senior Level',
    },
    {
      id: 5,
      jobTitle: 'Frontend Developer',
      company: 'Airbnb',
      location: 'San Francisco, CA',
      baseSalary: 145000,
      totalComp: 240000,
      experience: '2-4 years',
      verified: true,
      category: 'Tech Companies',
      level: 'Mid Level',
    },
    {
      id: 6,
      jobTitle: 'Full Stack Engineer',
      company: 'Stripe',
      location: 'Remote',
      baseSalary: 155000,
      totalComp: 290000,
      experience: '4-6 years',
      verified: true,
      category: 'Remote',
      level: 'Senior Level',
    },
    {
      id: 7,
      jobTitle: 'DevOps Engineer',
      company: 'Shopify',
      location: 'Remote',
      baseSalary: 135000,
      totalComp: 220000,
      experience: '3-5 years',
      verified: false,
      category: 'Remote',
      level: 'Mid Level',
    },
    {
      id: 8,
      jobTitle: 'Software Engineer',
      company: 'Notion',
      location: 'San Francisco, CA',
      baseSalary: 140000,
      totalComp: 260000,
      experience: '1-3 years',
      verified: true,
      category: 'Startups',
      level: 'Junior Level',
    },
    {
      id: 9,
      jobTitle: 'Senior Software Engineer',
      company: 'Discord',
      location: 'San Francisco, CA',
      baseSalary: 170000,
      totalComp: 350000,
      experience: '6-8 years',
      verified: true,
      category: 'Tech Companies',
      level: 'Senior Level',
    },
    {
      id: 10,
      jobTitle: 'Machine Learning Engineer',
      company: 'OpenAI',
      location: 'San Francisco, CA',
      baseSalary: 180000,
      totalComp: 400000,
      experience: '5-7 years',
      verified: true,
      category: 'Startups',
      level: 'Senior Level',
    },
    {
      id: 11,
      jobTitle: 'Backend Developer',
      company: 'Amazon',
      location: 'Seattle, WA',
      baseSalary: 152000,
      totalComp: 275000,
      experience: '3-5 years',
      verified: true,
      category: 'Tech Companies',
      level: 'Mid Level',
    },
    {
      id: 12,
      jobTitle: 'Mobile Developer',
      company: 'Uber',
      location: 'San Francisco, CA',
      baseSalary: 148000,
      totalComp: 265000,
      experience: '4-6 years',
      verified: false,
      category: 'Tech Companies',
      level: 'Senior Level',
    },
    {
      id: 13,
      jobTitle: 'Technical Lead',
      company: 'Microsoft',
      location: 'Redmond, WA',
      baseSalary: 185000,
      totalComp: 380000,
      experience: '7-9 years',
      verified: true,
      category: 'Tech Companies',
      level: 'Senior Level',
    },
    {
      id: 14,
      jobTitle: 'Junior Developer',
      company: 'Figma',
      location: 'San Francisco, CA',
      baseSalary: 120000,
      totalComp: 180000,
      experience: '0-2 years',
      verified: true,
      category: 'Startups',
      level: 'Junior Level',
    },
    {
      id: 15,
      jobTitle: 'Cloud Engineer',
      company: 'Salesforce',
      location: 'San Francisco, CA',
      baseSalary: 158000,
      totalComp: 285000,
      experience: '4-6 years',
      verified: true,
      category: 'Tech Companies',
      level: 'Senior Level',
    },
    {
      id: 16,
      jobTitle: 'Product Designer',
      company: 'Spotify',
      location: 'New York, NY',
      baseSalary: 135000,
      totalComp: 210000,
      experience: '3-5 years',
      verified: false,
      category: 'Tech Companies',
      level: 'Mid Level',
    },
    {
      id: 17,
      jobTitle: 'Security Engineer',
      company: 'Cloudflare',
      location: 'Remote',
      baseSalary: 165000,
      totalComp: 310000,
      experience: '5-7 years',
      verified: true,
      category: 'Remote',
      level: 'Senior Level',
    },
    {
      id: 18,
      jobTitle: 'Data Engineer',
      company: 'Snowflake',
      location: 'San Mateo, CA',
      baseSalary: 145000,
      totalComp: 270000,
      experience: '3-5 years',
      verified: true,
      category: 'Tech Companies',
      level: 'Mid Level',
    },
    {
      id: 19,
      jobTitle: 'QA Engineer',
      company: 'TestCo',
      location: 'Austin, TX',
      baseSalary: 95000,
      totalComp: 140000,
      experience: '2-4 years',
      verified: false,
      category: 'Startups',
      level: 'Mid Level',
    },
    {
      id: 20,
      jobTitle: 'Site Reliability Engineer',
      company: 'Datadog',
      location: 'New York, NY',
      baseSalary: 162000,
      totalComp: 295000,
      experience: '4-6 years',
      verified: true,
      category: 'Tech Companies',
      level: 'Senior Level',
    },
    {
      id: 21,
      jobTitle: 'Engineering Manager',
      company: 'Atlassian',
      location: 'San Francisco, CA',
      baseSalary: 190000,
      totalComp: 420000,
      experience: '8-10 years',
      verified: true,
      category: 'Tech Companies',
      level: 'Senior Level',
    },
    {
      id: 22,
      jobTitle: 'Full Stack Developer',
      company: 'GitLab',
      location: 'Remote',
      baseSalary: 142000,
      totalComp: 235000,
      experience: '3-5 years',
      verified: true,
      category: 'Remote',
      level: 'Mid Level',
    },
    {
      id: 23,
      jobTitle: 'Game Developer',
      company: 'Unity',
      location: 'San Francisco, CA',
      baseSalary: 125000,
      totalComp: 190000,
      experience: '2-4 years',
      verified: false,
      category: 'Tech Companies',
      level: 'Mid Level',
    },
    {
      id: 24,
      jobTitle: 'iOS Developer',
      company: 'Square',
      location: 'San Francisco, CA',
      baseSalary: 155000,
      totalComp: 280000,
      experience: '4-6 years',
      verified: true,
      category: 'Tech Companies',
      level: 'Senior Level',
    },
    {
      id: 25,
      jobTitle: 'Data Analyst',
      company: 'Tableau',
      location: 'Seattle, WA',
      baseSalary: 105000,
      totalComp: 155000,
      experience: '1-3 years',
      verified: true,
      category: 'Tech Companies',
      level: 'Junior Level',
    },
    {
      id: 26,
      jobTitle: 'Platform Engineer',
      company: 'Twilio',
      location: 'San Francisco, CA',
      baseSalary: 160000,
      totalComp: 305000,
      experience: '5-7 years',
      verified: true,
      category: 'Tech Companies',
      level: 'Senior Level',
    },
    {
      id: 27,
      jobTitle: 'Frontend Engineer',
      company: 'Vercel',
      location: 'Remote',
      baseSalary: 138000,
      totalComp: 225000,
      experience: '3-5 years',
      verified: false,
      category: 'Remote',
      level: 'Mid Level',
    },
    {
      id: 28,
      jobTitle: 'Blockchain Developer',
      company: 'Coinbase',
      location: 'San Francisco, CA',
      baseSalary: 175000,
      totalComp: 340000,
      experience: '4-6 years',
      verified: true,
      category: 'Tech Companies',
      level: 'Senior Level',
    },
    {
      id: 29,
      jobTitle: 'AI Researcher',
      company: 'Anthropic',
      location: 'San Francisco, CA',
      baseSalary: 195000,
      totalComp: 450000,
      experience: '6-8 years',
      verified: true,
      category: 'Startups',
      level: 'Senior Level',
    },
    {
      id: 30,
      jobTitle: 'Solutions Engineer',
      company: 'MongoDB',
      location: 'New York, NY',
      baseSalary: 140000,
      totalComp: 230000,
      experience: '3-5 years',
      verified: true,
      category: 'Tech Companies',
      level: 'Mid Level',
    }
  ];

  const [displayedSalaries, setDisplayedSalaries] = useState(allSalaryData.slice(0, 4));
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Relevance');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filters = ['All', 'Tech Companies', 'Startups', 'Remote', 'Senior Level'];
  const sortOptions = ['Relevance', 'Salary (High to Low)', 'Salary (Low to High)', 'Company (A-Z)', 'Experience'];

  const formatSalary = (amount) => {
    return `$${amount.toLocaleString()}`;
  };

  const getFilteredData = () => {
    let filtered = allSalaryData;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(salary => 
        salary.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        salary.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        salary.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (activeFilter !== 'All') {
      if (activeFilter === 'Senior Level') {
        filtered = filtered.filter(salary => salary.level === 'Senior Level');
      } else {
        filtered = filtered.filter(salary => salary.category === activeFilter);
      }
    }

    return filtered;
  };

  const getSortedData = (data) => {
    const sortedData = [...data];
    
    switch (sortBy) {
      case 'Salary (High to Low)':
        return sortedData.sort((a, b) => b.totalComp - a.totalComp);
      case 'Salary (Low to High)':
        return sortedData.sort((a, b) => a.totalComp - b.totalComp);
      case 'Company (A-Z)':
        return sortedData.sort((a, b) => a.company.localeCompare(b.company));
      case 'Experience':
        return sortedData.sort((a, b) => {
          // Extract first number from experience range for sorting
          const getExpNum = (exp) => parseInt(exp.split('-')[0]);
          return getExpNum(a.experience) - getExpNum(b.experience);
        });
      default:
        return sortedData; // Relevance - keep original order
    }
  };

  const getDisplayData = () => {
    const filtered = getFilteredData();
    const sorted = getSortedData(filtered);
    return sorted.slice(0, displayedSalaries.length);
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setDisplayedSalaries(getFilteredData().slice(0, 4)); // Reset to first 4 items
  };

  const handleSortClick = () => {
    setShowSortMenu(!showSortMenu);
  };

  const handleSortOptionClick = (option) => {
    setSortBy(option);
    setShowSortMenu(false);
    // Keep current number of displayed items but re-sort
    const currentCount = displayedSalaries.length;
    const filtered = getFilteredData();
    const sorted = getSortedData(filtered);
    setDisplayedSalaries(sorted.slice(0, currentCount));
  };

  const handleCardClick = (salary) => {
    console.log('Salary card clicked:', salary);
    // You can implement navigation to detailed view here
  };

  const handleLoadMore = () => {
    const filtered = getFilteredData();
    const sorted = getSortedData(filtered);
    const currentCount = displayedSalaries.length;
    const nextBatch = sorted.slice(0, currentCount + 4);
    setDisplayedSalaries(nextBatch);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Reset displayed salaries when searching
    setDisplayedSalaries(getFilteredData().slice(0, 4));
  };

  const displayData = getDisplayData();
  const filteredTotal = getFilteredData().length;
  const hasMoreToLoad = displayData.length < filteredTotal;

  const styles = {
    container: {
      flex: 1,
      backgroundColor: isDark ? '#171717' : '#ffffff',
    },
    scrollContainer: {
      flexGrow: 1,
    },
    content: {
      flex: 1,
      padding: 20,
      maxWidth: 1200,
    },
    pageTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: 8,
     
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? '#e5e5e5' : '#666666',
      marginBottom: 32,
      
    },
    searchPlaceholder: {
      backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
      padding: 16,
      borderRadius: 8,
      marginBottom: 32,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: isDark ? '#444444' : '#cccccc',
      alignItems: 'center',
    },
    placeholderText: {
      color: isDark ? '#888888' : '#666666',
      fontSize: 14,
      fontStyle: 'italic',
    },
    filtersContainer: {
      flexDirection: 'row',
      gap: 16,
      marginBottom: 24,
      flexWrap: 'wrap',
    },
    filterButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: isDark ? '#444444' : '#cccccc',
      backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
    },
    filterButtonActive: {
      backgroundColor: '#22c55e',
      borderColor: '#22c55e',
    },
    filterText: {
      color: isDark ? '#ffffff' : '#333333',
      fontSize: 14,
      fontWeight: '500',
    },
    filterTextActive: {
      color: '#ffffff',
    },
    resultsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      zIndex: 1000,
    },
    resultsCount: {
      fontSize: 16,
      color: isDark ? '#e5e5e5' : '#666666',
    },
    sortContainer: {
      position: 'relative',
      zIndex: 2000,
    },
    sortButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      padding: 8,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: isDark ? '#444444' : '#cccccc',
      borderRadius: 6,
      backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
    },
    sortText: {
      color: isDark ? '#ffffff' : '#333333',
      fontSize: 14,
    },
    sortMenu: {
      position: 'absolute',
      top: '100%',
      right: 0,
      marginTop: 4,
      backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
      borderWidth: 1,
      borderColor: isDark ? '#444444' : '#cccccc',
      borderRadius: 6,
      minWidth: 180
    },
    sortOption: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#444444' : '#e5e5e5',
      zIndex: 1000,
    },
    sortOptionLast: {
      borderBottomWidth: 0,
    },
    sortOptionText: {
      color: isDark ? '#ffffff' : '#333333',
      fontSize: 14,
    },
    sortOptionActive: {
      backgroundColor: isDark ? '#444444' : '#f0f0f0',
    },
    salaryList: {
      gap: 16,
    },
    salaryCard: {
      backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
      borderWidth: 1,
      borderColor: isDark ? '#444444' : '#e5e5e5',
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    jobInfo: {
      flex: 1,
    },
    jobTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: 4,
    },
    companyLocation: {
      fontSize: 14,
      color: isDark ? '#e5e5e5' : '#666666',
      marginBottom: 8,
    },
    experience: {
      fontSize: 12,
      color: isDark ? '#22c55e' : '#16a34a',
      backgroundColor: isDark ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.1)',
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 12,
      alignSelf: 'flex-start',
    },
    salaryInfo: {
      alignItems: 'flex-end',
    },
    baseSalary: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: 4,
    },
    totalComp: {
      fontSize: 14,
      color: isDark ? '#e5e5e5' : '#666666',
      marginBottom: 8,
    },
    verifiedBadge: {
      fontSize: 12,
      color: '#22c55e',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    loadMoreButton: {
      padding: 16,
      backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
      borderWidth: 1,
      borderColor: isDark ? '#444444' : '#e5e5e5',
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 24,
    },
    loadMoreText: {
      color: isDark ? '#ffffff' : '#333333',
      fontSize: 16,
      fontWeight: '500',
    },
    noResults: {
      textAlign: 'center',
      color: isDark ? '#888888' : '#666666',
      fontSize: 16,
      marginTop: 40,
      fontStyle: 'italic',
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar 
        onPress={() => router.push("/search")}
        placeholder='Search salaries' 
        onSearch={handleSearch}
        value={searchQuery}
      />
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Header */}
        <Text style={styles.pageTitle}>Salaries</Text>
        <Text style={styles.subtitle}>
          Discover salary ranges and compensation packages for thousands of jobs
        </Text>

        {/* Filters */}
        <View style={styles.filtersContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                activeFilter === filter && styles.filterButtonActive,
              ]}
              onPress={() => handleFilterClick(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.filterTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Results Header */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredTotal} salary reports found
          </Text>
          <View style={styles.sortContainer}>
            <TouchableOpacity style={styles.sortButton} onPress={handleSortClick}>
              <Text style={styles.sortText}>Sort by: {sortBy}</Text>
              <Text style={{ color: isDark ? '#ffffff' : '#333333' }}>
                {showSortMenu ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>
            {showSortMenu && (
              <View style={styles.sortMenu}>
                {sortOptions.map((option, index) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.sortOption,
                      index === sortOptions.length - 1 && styles.sortOptionLast,
                      sortBy === option && styles.sortOptionActive,
                    ]}
                    onPress={() => handleSortOptionClick(option)}
                  >
                    <Text style={styles.sortOptionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Salary Cards */}
        {displayData.length > 0 ? (
          <View style={styles.salaryList}>
            {displayData.map((salary) => (
              <TouchableOpacity
                key={salary.id}
                style={styles.salaryCard}
                onPress={() => handleCardClick(salary)}
                activeOpacity={0.8}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.jobInfo}>
                    <Text style={styles.jobTitle}>{salary.jobTitle}</Text>
                    <Text style={styles.companyLocation}>
                      {salary.company} • {salary.location}
                    </Text>
                    <View style={styles.experience}>
                      <Text style={{ 
                        fontSize: 12, 
                        color: isDark ? '#22c55e' : '#16a34a' 
                      }}>
                        {salary.experience}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.salaryInfo}>
                    <Text style={styles.baseSalary}>{formatSalary(salary.baseSalary)}</Text>
                    <Text style={styles.totalComp}>Total: {formatSalary(salary.totalComp)}</Text>
                    {salary.verified && (
                      <View style={styles.verifiedBadge}>
                        <Text style={{ color: '#22c55e', fontSize: 12 }}>✓</Text>
                        <Text style={{ color: '#22c55e', fontSize: 12 }}>Verified</Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text style={styles.noResults}>
            No salary reports found matching your criteria.
          </Text>
        )}

        {/* Load More Button */}
        {hasMoreToLoad && (
          <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
            <Text style={styles.loadMoreText}>
              Load More Salaries ({filteredTotal - displayData.length} remaining)
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SalariesPage;