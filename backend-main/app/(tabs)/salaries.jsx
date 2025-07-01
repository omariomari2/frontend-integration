import Headers from '@/components/Headers';
import SearchBar from '@/components/SearchBar';
import { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

const SalariesPage = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Sample salary data
  const [salaryData] = useState([
    {
      id: 1,
      jobTitle: 'Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      baseSalary: '$150,000',
      totalComp: '$280,000',
      experience: '3-5 years',
      verified: true,
    },
    {
      id: 2,
      jobTitle: 'Product Manager',
      company: 'Meta',
      location: 'Menlo Park, CA',
      baseSalary: '$160,000',
      totalComp: '$320,000',
      experience: '5-7 years',
      verified: true,
    },
    {
      id: 3,
      jobTitle: 'Data Scientist',
      company: 'Netflix',
      location: 'Los Gatos, CA',
      baseSalary: '$140,000',
      totalComp: '$250,000',
      experience: '2-4 years',
      verified: false,
    },
    {
      id: 4,
      jobTitle: 'UX Designer',
      company: 'Apple',
      location: 'Cupertino, CA',
      baseSalary: '$130,000',
      totalComp: '$200,000',
      experience: '4-6 years',
      verified: true,
    },
  ]);

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
      fontFamily: 'System',
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? '#e5e5e5' : '#666666',
      marginBottom: 32,
      fontFamily: 'System',
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
    },
    resultsCount: {
      fontSize: 16,
      color: isDark ? '#e5e5e5' : '#666666',
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
  };

  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Tech Companies', 'Startups', 'Remote', 'Senior Level'];

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleCardClick = (salary) => {
    console.log('Salary card clicked:', salary);
  };

  const handleLoadMore = () => {
    console.log('Load more salaries');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Headers />
      <SearchBar placeholder='Search salaries' />
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
            {salaryData.length} salary reports found
          </Text>
          <TouchableOpacity style={styles.sortButton}>
            <Text style={styles.sortText}>Sort by: Relevance</Text>
            <Text style={{ color: isDark ? '#ffffff' : '#333333' }}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Salary Cards */}
        <View style={styles.salaryList}>
          {salaryData.map((salary) => (
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
                  <Text style={styles.baseSalary}>{salary.baseSalary}</Text>
                  <Text style={styles.totalComp}>Total: {salary.totalComp}</Text>
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

        {/* Load More Button */}
        <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
          <Text style={styles.loadMoreText}>Load More Salaries</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SalariesPage;