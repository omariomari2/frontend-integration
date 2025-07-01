import { Ionicons } from '@expo/vector-icons';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

const JobCard = ({ job, onPress, theme }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme?.surface || (isDark ? '#1f1f1f' : '#ffffff'),
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 20,
      marginVertical: 6,
      shadowColor: isDark ? '#000000' : '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: theme?.border || (isDark ? '#333' : '#f0f0f0'),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    logo: {
      width: 48,
      height: 48,
      borderRadius: 8,
      marginRight: 12,
      backgroundColor: theme?.border || (isDark ? '#333' : '#f0f0f0'),
    },
    headerText: {
      flex: 1,
    },
    jobTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme?.text || (isDark ? '#ffffff' : '#000000'),
      marginBottom: 4,
      lineHeight: 22,
    },
    companyName: {
      fontSize: 14,
      color: theme?.primary || '#007AFF',
      fontWeight: '500',
      marginBottom: 2,
    },
    location: {
      fontSize: 14,
      color: theme?.textSecondary || (isDark ? '#ccc' : '#666'),
      marginBottom: 2,
    },
    rating: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ratingText: {
      fontSize: 12,
      color: theme?.textSecondary || (isDark ? '#ccc' : '#666'),
      marginLeft: 4,
    },
    bookmarkButton: {
      padding: 4,
    },
    details: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginBottom: 8,
      gap: 8,
    },
    tag: {
      backgroundColor: theme?.primary || '#007AFF',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    tagText: {
      fontSize: 12,
      color: '#ffffff',
      fontWeight: '500',
    },
    remoteTag: {
      backgroundColor: '#34C759',
    },
    salaryText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme?.text || (isDark ? '#ffffff' : '#000000'),
    },
    description: {
      fontSize: 14,
      color: theme?.textSecondary || (isDark ? '#ccc' : '#666'),
      lineHeight: 20,
      marginBottom: 12,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: theme?.border || (isDark ? '#333' : '#f0f0f0'),
    },
    postedDate: {
      fontSize: 12,
      color: theme?.textSecondary || (isDark ? '#ccc' : '#666'),
    },
    applyButton: {
      backgroundColor: theme?.primary || '#007AFF',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
    },
    applyButtonText: {
      color: '#ffffff',
      fontSize: 14,
      fontWeight: '600',
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(job)} activeOpacity={0.7}>
      <View style={styles.header}>
        <Image 
          source={{ uri: job.companyLogo }} 
          style={styles.logo}
          defaultSource={{ uri: 'https://via.placeholder.com/48x48/cccccc/ffffff?text=?' }}
        />
        <View style={styles.headerText}>
          <Text style={styles.jobTitle} numberOfLines={2}>
            {job.title}
          </Text>
          <Text style={styles.companyName}>
            {job.company}
          </Text>
          <Text style={styles.location}>
            {job.location}
          </Text>
          <View style={styles.rating}>
            <Ionicons 
              name="star" 
              size={12} 
              color="#FFD700" 
            />
            <Text style={styles.ratingText}>
              {job.rating}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.bookmarkButton}>
          <Ionicons 
            name="bookmark-outline" 
            size={20} 
            color={theme?.textSecondary || (isDark ? '#ccc' : '#666')} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.details}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{job.type}</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{job.experience}</Text>
        </View>
        {job.remote && (
          <View style={[styles.tag, styles.remoteTag]}>
            <Text style={styles.tagText}>Remote</Text>
          </View>
        )}
        <Text style={styles.salaryText}>{job.salary}</Text>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {job.description}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.postedDate}>
          Posted {formatDate(job.postedDate)}
        </Text>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default JobCard;