import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

const ProfileScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const styles = createStyles(isDark);

  // Profile state
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Software Developer passionate about mobile development and user experience.',
    location: 'San Francisco, CA',
    joinedDate: 'January 2023',
    avatar: null, // You can add an image URL here
  });

  // Settings state
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: isDark,
    emailUpdates: false,
    pushNotifications: true,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const ProfileHeader = () => (
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        {profileData.avatar ? (
          <Image source={{ uri: profileData.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {profileData.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
        )}
        <TouchableOpacity style={styles.editAvatarButton}>
          <Text style={styles.editAvatarText}>✏️</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.profileName}>{profileData.name}</Text>
      <Text style={styles.profileEmail}>{profileData.email}</Text>
      
      {profileData.bio && (
        <Text style={styles.profileBio}>{profileData.bio}</Text>
      )}
      
      <View style={styles.profileDetails}>
        <Text style={styles.profileDetail}>📍 {profileData.location}</Text>
        <Text style={styles.profileDetail}>📅 Joined {profileData.joinedDate}</Text>
      </View>
    </View>
  );

  const SettingItem = ({ title, value, onToggle, icon }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: isDark ? '#333333' : '#e5e5e5', true: '#00cc88' }}
        thumbColor={value ? '#ffffff' : isDark ? '#666666' : '#f4f3f4'}
      />
    </View>
  );

  const MenuItem = ({ title, onPress, icon, hasArrow = true }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <Text style={styles.menuIcon}>{icon}</Text>
        <Text style={styles.menuTitle}>{title}</Text>
      </View>
      {hasArrow && <Text style={styles.menuArrow}>›</Text>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={styles.container.backgroundColor}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ProfileHeader />
        
        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <SettingItem
            title="Push Notifications"
            value={settings.pushNotifications}
            onToggle={() => toggleSetting('pushNotifications')}
            icon="🔔"
          />
          
          <SettingItem
            title="Email Updates"
            value={settings.emailUpdates}
            onToggle={() => toggleSetting('emailUpdates')}
            icon="📧"
          />
          
          <SettingItem
            title="Dark Mode"
            value={settings.darkMode}
            onToggle={() => toggleSetting('darkMode')}
            icon="🌙"
          />
        </View>

        {/* Menu Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <MenuItem
            title="Privacy & Security"
            icon="🔒"
            onPress={() => console.log('Privacy pressed')}
          />
          
          <MenuItem
            title="Help & Support"
            icon="❓"
            onPress={() => console.log('Help pressed')}
          />
          
          <MenuItem
            title="About"
            icon="ℹ️"
            onPress={() => console.log('About pressed')}
          />
          
          <MenuItem
            title="Terms of Service"
            icon="📄"
            onPress={() => console.log('Terms pressed')}
          />
        </View>

        {/* Logout Section */}
        <View style={styles.section}>
          <MenuItem
            title="Sign Out"
            icon="🚪"
            onPress={() => console.log('Sign out pressed')}
            hasArrow={false}
          />
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>89</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (isDark) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? '#171717' : '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: isDark ? '#333333' : '#e5e5e5',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: isDark ? '#ffffff' : '#000000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: isDark ? '#ffffff' : '#000000',
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  editButtonText: {
    fontSize: 16,
    color: '#00cc88',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: isDark ? '#333333' : '#f0f0f0',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: isDark ? '#333333' : '#e5e5e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: isDark ? '#ffffff' : '#000000',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: isDark ? '#333333' : '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: isDark ? '#171717' : '#ffffff',
  },
  editAvatarText: {
    fontSize: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: isDark ? '#ffffff' : '#000000',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: isDark ? '#999999' : '#666666',
    marginBottom: 12,
  },
  profileBio: {
    fontSize: 14,
    color: isDark ? '#cccccc' : '#333333',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  profileDetails: {
    alignItems: 'center',
  },
  profileDetail: {
    fontSize: 14,
    color: isDark ? '#999999' : '#666666',
    marginBottom: 4,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: isDark ? '#ffffff' : '#000000',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: isDark ? '#333333' : '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    color: isDark ? '#ffffff' : '#000000',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: isDark ? '#333333' : '#f0f0f0',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuTitle: {
    fontSize: 16,
    color: isDark ? '#ffffff' : '#000000',
  },
  menuArrow: {
    fontSize: 20,
    color: isDark ? '#666666' : '#999999',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 24,
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: isDark ? '#333333' : '#f0f0f0',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: isDark ? '#ffffff' : '#000000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: isDark ? '#999999' : '#666666',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: isDark ? '#333333' : '#e5e5e5',
  },
});

export default ProfileScreen;