import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { G, Path, Rect, Svg } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');
const router = useRouter();

// Custom SVG illustration component
const EmptyStateIllustration = ({ color }) => (
  <Svg width="120" height="80" viewBox="0 0 120 80" fill="none">
    {/* Laptop base */}
    <Path
      d="M10 55 L110 55 L115 65 L5 65 Z"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    
    {/* Laptop screen */}
    <Rect
      x="20"
      y="20"
      width="80"
      height="50"
      rx="3"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    
    {/* Screen content - code blocks */}
    <Rect x="25" y="25" width="70" height="3" fill="#0CAA41" opacity="0.7" />
    <Rect x="25" y="30" width="50" height="2" fill={color} opacity="0.5" />
    <Rect x="25" y="34" width="60" height="2" fill={color} opacity="0.5" />
    <Rect x="25" y="38" width="40" height="2" fill={color} opacity="0.5" />
    
    {/* Window controls */}
    <G>
      <Rect x="75" y="25" width="8" height="6" rx="1" fill={color} opacity="0.3" />
      <Rect x="85" y="25" width="8" height="6" rx="1" fill="#0CAA41" opacity="0.7" />
    </G>
    
    {/* Cat character */}
    <G transform="translate(5, 40)">
      {/* Cat body */}
      <Path
        d="M8 15 Q8 12 12 12 Q16 12 16 15 L16 20 Q16 22 12 22 Q8 22 8 20 Z"
        fill={color}
        opacity="0.8"
      />
      {/* Cat head */}
      <Path
        d="M10 8 Q10 5 12 5 Q14 5 14 8 Q14 12 12 12 Q10 12 10 8 Z"
        fill={color}
        opacity="0.8"
      />
      {/* Cat ears */}
      <Path d="M9 6 L11 3 L11 7 Z" fill={color} opacity="0.8" />
      <Path d="M13 7 L13 3 L15 6 Z" fill={color} opacity="0.8" />
      {/* Cat eyes */}
      <View style={{ position: 'absolute', top: 6, left: 10, width: 2, height: 2, borderRadius: 1, backgroundColor: '#fff' }} />
      <View style={{ position: 'absolute', top: 6, left: 13, width: 2, height: 2, borderRadius: 1, backgroundColor: '#fff' }} />
      {/* Cat tail */}
      <Path
        d="M16 18 Q20 16 22 20 Q20 22 18 20"
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity="0.8"
      />
    </G>
  </Svg>
);

const PostingActivityScreen = () => {
  const colorScheme = useColorScheme();
  const [activeTab, setActiveTab] = useState('Posts');
  
  const isDark = colorScheme === 'dark';
  
  const theme = {
    background: isDark ? '#171717' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    textSecondary: isDark ? '#a3a3a3' : '#666666',
    illustration: isDark ? '#ffffff' : '#000000',
  };

  const renderTabContent = () => {
    if (activeTab === 'Posts') {
      return (
        <View style={styles.emptyStateContainer}>
          <EmptyStateIllustration color={theme.illustration} />
          <Text style={[styles.emptyStateTitle, { color: theme.text }]}>
            No posts yet
          </Text>
          <View style={styles.emptyStateSubtitle}>
            <Text style={[styles.emptyStateText, { color: theme.textSecondary }]}>
              Ask burning questions or share your hot take
            </Text>
            <Text style={[styles.emptyStateText, { color: theme.textSecondary }]}>
              (anonymously). 
            </Text>
            <TouchableOpacity>
              <Text style={[styles.emptyStateLink, { color: '#0CAA41' }]}>
                Post in community
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.emptyStateContainer}>
          <EmptyStateIllustration color={theme.illustration} />
          <Text style={[styles.emptyStateTitle, { color: theme.text }]}>
            No comments yet
          </Text>
          <Text style={[styles.emptyStateText, { color: theme.textSecondary }]}>
            Your comments and replies will appear here
          </Text>
        </View>
      );
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
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Posting activity
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'Posts' && styles.activeTab
          ]}
          onPress={() => setActiveTab('Posts')}
        >
          <Text style={[
            styles.tabText,
            { color: theme.text },
            activeTab === 'Posts' && styles.activeTabText
          ]}>
            Posts
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'Comments & replies' && styles.activeTab
          ]}
          onPress={() => setActiveTab('Comments & replies')}
        >
          <Text style={[
            styles.tabText,
            { color: theme.text },
            activeTab === 'Comments & replies' && styles.activeTabText
          ]}>
            Comments & replies
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        {renderTabContent()}
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
    paddingHorizontal: 16,
    paddingVertical: 7,
    height: 56,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  headerSpacer: {
    width: 32,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 4,
    marginRight: 32,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#0CAA41',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabText: {
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 16,
  },
  emptyStateSubtitle: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 280,
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  emptyStateLink: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default PostingActivityScreen;