import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const CompanyProfile = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Mock company data - in real app, fetch based on ID from route params
  const [company, setCompany] = useState({
    id: '1', // In real app, get from route params
    name: 'TechCorp Solutions',
    logo: 'https://via.placeholder.com/100x100/007AFF/FFFFFF?text=TC',
    industry: 'Technology',
    location: 'San Francisco, CA',
    employees: '1,000-5,000',
    founded: '2015',
    website: 'techcorp.com',
    description: 'Leading technology company specializing in innovative software solutions and digital transformation services for enterprises worldwide.',
    culture: 'We foster a collaborative environment where creativity and innovation thrive. Our team values work-life balance, continuous learning, and making a positive impact.',
    benefits: [
      'Health, dental, and vision insurance',
      'Flexible working hours',
      'Remote work options',
      'Professional development budget',
      '401(k) with company matching',
      'Unlimited PTO'
    ],
    openJobs: 12,
    followers: '2.5k',
    rating: 4.8
  });

  useEffect(() => {
    // Simulate API call to fetch company data based on ID from route params
    console.log('Fetching company data...');
  }, []);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const theme = {
    background: isDarkMode ? '#171717' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    secondaryText: isDarkMode ? '#B0B0B0' : '#666666',
    cardBackground: isDarkMode ? '#2A2A2A' : '#F8F8F8',
    border: isDarkMode ? '#3A3A3A' : '#E0E0E0',
    accent: '#22C55E',
    success: '#22C55E',
    warning: '#FF9500',
  };

  const InfoCard = ({ title, children }) => (
    <View style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
      <Text style={[styles.cardTitle, { color: theme.text }]}>{title}</Text>
      {children}
    </View>
  );

  const InfoRow = ({ icon, label, value }) => (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={20} color={theme.accent} style={styles.infoIcon} />
      <View style={styles.infoContent}>
        <Text style={[styles.infoLabel, { color: theme.secondaryText }]}>{label}</Text>
        <Text style={[styles.infoValue, { color: theme.text }]}>{value}</Text>
      </View>
    </View>
  );

  const BenefitItem = ({ benefit }) => (
    <View style={styles.benefitItem}>
      <Ionicons name="checkmark-circle" size={20} color={theme.success} />
      <Text style={[styles.benefitText, { color: theme.text }]}>{benefit}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={theme.background} 
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="chevron-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Company</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Company Header */}
        <View style={styles.companyHeader}>
          <Image 
            source={{ uri: company.logo }} 
            style={[styles.companyLogo, { borderColor: theme.border }]}
          />
          <Text style={[styles.companyName, { color: theme.text }]}>{company.name}</Text>
          <Text style={[styles.companyIndustry, { color: theme.secondaryText }]}>{company.industry}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.accent }]}>{company.rating}</Text>
              <Text style={[styles.statLabel, { color: theme.secondaryText }]}>Rating</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.accent }]}>{company.followers}</Text>
              <Text style={[styles.statLabel, { color: theme.secondaryText }]}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.accent }]}>{company.openJobs}</Text>
              <Text style={[styles.statLabel, { color: theme.secondaryText }]}>Open Jobs</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.followButton, { backgroundColor: isFollowing ? theme.cardBackground : theme.accent, borderColor: theme.accent }]}
              onPress={toggleFollow}
            >
              <Text style={[styles.followButtonText, { color: isFollowing ? theme.accent : '#FFFFFF' }]}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.jobsButton, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
              <Text style={[styles.jobsButtonText, { color: theme.text }]}>View Jobs</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Company Info */}
        <InfoCard title="Company Information">
          <InfoRow icon="location-outline" label="Location" value={company.location} />
          <InfoRow icon="people-outline" label="Company Size" value={company.employees} />
          <InfoRow icon="calendar-outline" label="Founded" value={company.founded} />
          <InfoRow icon="globe-outline" label="Website" value={company.website} />
        </InfoCard>

        {/* About */}
        <InfoCard title="About">
          <Text style={[styles.descriptionText, { color: theme.text }]}>{company.description}</Text>
        </InfoCard>

        {/* Culture */}
        <InfoCard title="Company Culture">
          <Text style={[styles.descriptionText, { color: theme.text }]}>{company.culture}</Text>
        </InfoCard>

        {/* Benefits */}
        <InfoCard title="Benefits & Perks">
          <View style={styles.benefitsList}>
            {company.benefits.map((benefit, index) => (
              <BenefitItem key={index} benefit={benefit} />
            ))}
          </View>
        </InfoCard>

        <View style={styles.bottomSpacing} />
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  companyHeader: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  companyLogo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
  },
  companyName: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  companyIndustry: {
    fontSize: 16,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  followButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  followButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  jobsButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  jobsButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoIcon: {
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    fontSize: 16,
    flex: 1,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default CompanyProfile;