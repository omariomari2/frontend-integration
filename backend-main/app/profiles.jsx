import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

const ProfilePage = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const theme = {
    background: isDarkMode ? '#171717' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    secondaryText: isDarkMode ? '#B0B0B0' : '#666666',
    cardBackground: isDarkMode ? '#2A2A2A' : '#F8F8F8',
    border: isDarkMode ? '#3A3A3A' : '#E0E0E0',
    accent: '#22C55E',
  };

  const ProfileItem = ({ icon, title, onPress }) => (
    <TouchableOpacity 
      style={[styles.profileItem, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.itemLeft}>
        <Ionicons name={icon} size={24} color={theme.text} style={styles.itemIcon} />
        <Text style={[styles.itemText, { color: theme.text }]}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.secondaryText} />
    </TouchableOpacity>
  );

  const UserAvatar = ({ initials }) => (
    <View style={[styles.avatar, { backgroundColor: theme.accent }]}>
      <Text style={styles.avatarText}>{initials}</Text>
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
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Profile</Text>
        <View style={styles.themeToggle} />
      </View>

      {/* User Info */}
      <View style={styles.userSection}>
        <UserAvatar initials="JS" />
        <Text style={[styles.userName, { color: theme.text }]}>
          Jesse Sarfo-Boateng
        </Text>
      </View>

      {/* Profile Options */}
      <View style={styles.optionsContainer}>
        <ProfileItem
          icon="person-outline"
          title="Profile"
          onPress={() => console.log('Profile pressed')}
        />
        
        <ProfileItem
          icon="bookmark-outline"
          title="Saved jobs"
          onPress={() => console.log('Saved jobs pressed')}
        />
        
        <ProfileItem
          icon="briefcase-outline"
          title="Job preferences"
          onPress={() => console.log('Job preferences pressed')}
        />
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  themeToggle: {
    padding: 5,
  },
  userSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '600',
  },
  userName: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  optionsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemIcon: {
    marginRight: 16,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default ProfilePage;