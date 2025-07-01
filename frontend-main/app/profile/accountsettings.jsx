import { ChevronLeft, ChevronRight } from 'lucide-react-native';
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

const AccountSettingsPage = () => {
  const systemColorScheme = useColorScheme();
  const [themeOverride, setThemeOverride] = useState(null);
  
  // Use override if set, otherwise fall back to system
  const isDarkMode = themeOverride !== null ? themeOverride === 'dark' : systemColorScheme === 'dark';

  const theme = {
    backgroundColor: isDarkMode ? '#171717' : '#ffffff',
    textColor: isDarkMode ? '#ffffff' : '#000000',
    separatorColor: isDarkMode ? '#333333' : '#e5e5e5',
    iconColor: isDarkMode ? '#ffffff' : '#000000',
  };

  const menuItems = [
    { title: 'Push & email notifications', hasArrow: true },
    { title: 'Account emails', hasArrow: true },
    { title: 'Send feedback', hasArrow: false },
    { title: 'Share app', hasArrow: false },
    { title: 'Help center', hasArrow: false },
    { title: 'Privacy', hasArrow: false },
    { title: 'Do not sell', hasArrow: false },
    { title: 'Terms of use', hasArrow: false },
    { title: 'Delete account', hasArrow: false },
  ];

  const MenuItem = ({ title, hasArrow, isLast = false }) => (
    <TouchableOpacity 
      style={[
        styles.menuItem, 
        !isLast && { 
          borderBottomColor: theme.separatorColor, 
          borderBottomWidth: StyleSheet.hairlineWidth 
        }
      ]}
      activeOpacity={0.7}
    >
      <Text style={[styles.menuText, { color: theme.textColor }]}>
        {title}
      </Text>
      {hasArrow && (
        <ChevronRight 
          size={20} 
          color={theme.iconColor} 
          style={styles.chevronIcon}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={theme.backgroundColor} 
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ChevronLeft size={24} color={theme.iconColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.textColor }]}>
          Account settings
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <MenuItem 
            key={item.title}
            title={item.title}
            hasArrow={item.hasArrow}
            isLast={index === menuItems.length - 1}
          />
        ))}
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins', 
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 32,
  },
  menuContainer: {
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    minHeight: 56,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '400',
    flex: 1,
  },
  chevronIcon: {
    marginLeft: 16,
  },
});

export default AccountSettingsPage;