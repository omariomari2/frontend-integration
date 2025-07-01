import { useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

const UserPortfolioPage = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Sample user data
  const [userData] = useState({
    name: 'Sarah Chen',
    title: 'Senior Product Designer',
    location: 'San Francisco, CA',
    bio: 'Passionate designer with 6+ years of experience creating user-centered digital experiences. I specialize in mobile app design and design systems.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop',
    stats: {
      projects: 24,
      followers: 1248,
      following: 892,
      likes: 3204
    },
    skills: ['UI/UX Design', 'Figma', 'Sketch', 'Prototyping', 'Design Systems', 'User Research'],
    experience: [
      {
        id: 1,
        company: 'Airbnb',
        role: 'Senior Product Designer',
        duration: '2022 - Present',
        description: 'Lead design for mobile booking experience'
      },
      {
        id: 2,
        company: 'Spotify',
        role: 'Product Designer',
        duration: '2020 - 2022',
        description: 'Designed features for music discovery and playlists'
      },
      {
        id: 3,
        company: 'Startup Inc',
        role: 'UI/UX Designer',
        duration: '2018 - 2020',
        description: 'Full product design from concept to launch'
      }
    ],
    projects: [
      {
        id: 1,
        title: 'Travel App Redesign',
        category: 'Mobile Design',
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop',
        likes: 234
      },
      {
        id: 2,
        title: 'Banking Dashboard',
        category: 'Web Design',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
        likes: 189
      },
      {
        id: 3,
        title: 'Food Delivery App',
        category: 'Mobile Design',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
        likes: 156
      },
      {
        id: 4,
        title: 'Design System',
        category: 'System Design',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=300&h=200&fit=crop',
        likes: 298
      }
    ]
  });

  const [activeTab, setActiveTab] = useState('projects');

  const styles = {
    container: {
      flex: 1,
      backgroundColor: isDark ? '#1a1a1a' : '#f2f4f7',
    },
    safeArea: {
      flex: 1,
      backgroundColor: isDark ? '#1a1a1a' : '#f2f4f7',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: isDark ? '#1a1a1a' : '#f2f4f7',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.9)',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    backButtonText: {
      fontSize: 18,
      color: isDark ? '#ffffff' : '#0d5b2c',
      fontWeight: '600',
    },
    scrollContainer: {
      flexGrow: 1,
      paddingTop: 60,
    },
    coverImage: {
      width: '100%',
      height: 200,
      backgroundColor: isDark ? '#2a2a2a' : '#e8f4fd',
    },
    profileSection: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 24,
      backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
      marginTop: -30,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      position: 'relative',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    profileHeader: {
      alignItems: 'center',
      marginBottom: 24,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginTop: -50,
      borderWidth: 4,
      borderColor: isDark ? '#2a2a2a' : '#ffffff',
      backgroundColor: isDark ? '#444444' : '#e0e0e0',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 8,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#1a1a1a',
      marginTop: 12,
      textAlign: 'center',
    },
    title: {
      fontSize: 16,
      color: isDark ? '#b3b3b3' : '#5a5a5a',
      marginTop: 4,
      textAlign: 'center',
    },
    location: {
      fontSize: 14,
      color: isDark ? '#888888' : '#7a7a7a',
      marginTop: 2,
      textAlign: 'center',
    },
    bio: {
      fontSize: 14,
      color: isDark ? '#cccccc' : '#4a4a4a',
      lineHeight: 20,
      textAlign: 'center',
      marginTop: 16,
      paddingHorizontal: 16,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 20,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: isDark ? '#444444' : '#e5e7eb',
      marginVertical: 24,
    },
    statItem: {
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#1a1a1a',
    },
    statLabel: {
      fontSize: 12,
      color: isDark ? '#b3b3b3' : '#6b7280',
      marginTop: 4,
    },
    actionButtons: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 24,
    },
    followButton: {
      flex: 1,
      backgroundColor: '#0d5b2c',
      paddingVertical: 12,
      borderRadius: 25,
      alignItems: 'center',
      shadowColor: '#0d5b2c',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    messageButton: {
      flex: 1,
      backgroundColor: 'transparent',
      paddingVertical: 12,
      borderRadius: 25,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#0d5b2c',
    },
    followButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
    messageButtonText: {
      color: '#0d5b2c',
      fontSize: 16,
      fontWeight: '600',
    },
    tabsContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 20,
      backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
      paddingVertical: 8,
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
      borderBottomWidth: 3,
      borderBottomColor: 'transparent',
    },
    activeTab: {
      borderBottomColor: '#0d5b2c',
    },
    tabText: {
      fontSize: 16,
      color: isDark ? '#b3b3b3' : '#6b7280',
      fontWeight: '500',
    },
    activeTabText: {
      color: '#0d5b2c',
      fontWeight: '700',
    },
    contentSection: {
      paddingHorizontal: 20,
      backgroundColor: isDark ? '#1a1a1a' : '#f2f4f7',
      paddingBottom: 40,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#1a1a1a',
      marginBottom: 16,
    },
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 24,
    },
    skillTag: {
      backgroundColor: isDark ? '#444444' : '#e8f4fd',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: isDark ? '#555555' : '#0d5b2c',
    },
    skillText: {
      fontSize: 12,
      color: isDark ? '#ffffff' : '#0d5b2c',
      fontWeight: '600',
    },
    experienceItem: {
      backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: isDark ? '#444444' : '#e5e7eb',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    experienceHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    companyName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#1a1a1a',
    },
    duration: {
      fontSize: 12,
      color: isDark ? '#b3b3b3' : '#6b7280',
      backgroundColor: isDark ? '#444444' : '#f3f4f6',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    role: {
      fontSize: 14,
      color: '#0d5b2c',
      marginBottom: 4,
      fontWeight: '600',
    },
    description: {
      fontSize: 13,
      color: isDark ? '#cccccc' : '#4b5563',
      lineHeight: 18,
    },
    projectsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 20,
    },
    projectCard: {
      width: (width - 52) / 2,
      backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: 12,
      borderWidth: 1,
      borderColor: isDark ? '#444444' : '#e5e7eb',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    projectImage: {
      width: '100%',
      height: 120,
      backgroundColor: isDark ? '#444444' : '#f3f4f6',
    },
    projectInfo: {
      padding: 12,
    },
    projectTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#1a1a1a',
      marginBottom: 4,
    },
    projectCategory: {
      fontSize: 12,
      color: isDark ? '#b3b3b3' : '#6b7280',
      marginBottom: 8,
    },
    projectFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    likeCount: {
      fontSize: 12,
      color: isDark ? '#b3b3b3' : '#6b7280',
    },
    heartIcon: {
      fontSize: 14,
      color: '#0d5b2c',
    },
  };

  const renderProjects = () => (
    <View style={styles.projectsGrid}>
      {userData.projects.map((project) => (
        <TouchableOpacity key={project.id} style={styles.projectCard} activeOpacity={0.8}>
          <Image source={{ uri: project.image }} style={styles.projectImage} />
          <View style={styles.projectInfo}>
            <Text style={styles.projectTitle}>{project.title}</Text>
            <Text style={styles.projectCategory}>{project.category}</Text>
            <View style={styles.projectFooter}>
              <Text style={styles.likeCount}>{project.likes} likes</Text>
              <Text style={styles.heartIcon}>♥</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderExperience = () => (
    <View>
      {userData.experience.map((exp) => (
        <View key={exp.id} style={styles.experienceItem}>
          <View style={styles.experienceHeader}>
            <Text style={styles.companyName}>{exp.company}</Text>
            <Text style={styles.duration}>{exp.duration}</Text>
          </View>
          <Text style={styles.role}>{exp.role}</Text>
          <Text style={styles.description}>{exp.description}</Text>
        </View>
      ))}
    </View>
  );

  const renderSkills = () => (
    <View>
      <Text style={styles.sectionTitle}>Skills</Text>
      <View style={styles.skillsContainer}>
        {userData.skills.map((skill, index) => (
          <View key={index} style={styles.skillTag}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const handleGoBack = () => {
    console.log('Navigate back to previous page');
    // Add your navigation logic here
    // Example: navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        barStyle={isDark ? 'light-content' : 'dark-content'} 
        backgroundColor={isDark ? '#1a1a1a' : '#f2f4f7'} 
      />
      
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleGoBack}
          activeOpacity={0.8}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Cover Image */}
        <Image source={{ uri: userData.coverImage }} style={styles.coverImage} />
        
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: userData.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.title}>{userData.title}</Text>
            <Text style={styles.location}>{userData.location}</Text>
            <Text style={styles.bio}>{userData.bio}</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.stats.projects}</Text>
              <Text style={styles.statLabel}>Projects</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.stats.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.stats.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.stats.likes}</Text>
              <Text style={styles.statLabel}>Likes</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.followButton} activeOpacity={0.8}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton} activeOpacity={0.8}>
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'projects' && styles.activeTab]}
            onPress={() => setActiveTab('projects')}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === 'projects' && styles.activeTabText]}>
              Projects
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'experience' && styles.activeTab]}
            onPress={() => setActiveTab('experience')}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === 'experience' && styles.activeTabText]}>
              Experience
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'about' && styles.activeTab]}
            onPress={() => setActiveTab('about')}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === 'about' && styles.activeTabText]}>
              About
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.contentSection}>
          {activeTab === 'projects' && renderProjects()}
          {activeTab === 'experience' && renderExperience()}
          {activeTab === 'about' && renderSkills()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserPortfolioPage;