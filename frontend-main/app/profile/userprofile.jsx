import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Appearance,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const ProfilePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    setDarkMode(colorScheme === 'dark');

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setDarkMode(colorScheme === 'dark');
    });

    // Load user data when component mounts
    loadUserData();

    return subscription?.remove;
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        setUserData(parsedData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      Alert.alert('Error', 'Failed to load user profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'text/plain',
        ],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result?.assets && result.assets.length > 0) {
        setUploadedFile(result.assets[0]);
        // Optionally save the resume info to user data
        await saveResumeToUserData(result.assets[0]);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const saveResumeToUserData = async (fileInfo) => {
    try {
      if (userData) {
        const updatedUserData = {
          ...userData,
          resume: {
            name: fileInfo.name,
            size: fileInfo.size,
            uri: fileInfo.uri,
            type: fileInfo.mimeType,
            uploadedAt: new Date().toISOString(),
          }
        };
        await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
        setUserData(updatedUserData);
      }
    } catch (error) {
      console.error('Error saving resume info:', error);
    }
  };

  const handlePrivacyPolicyPress = () => {
    Linking.openURL('https://example.com/privacy-policy');
  };

  const getEmploymentStatus = () => {
    if (!userData) return '';
    
    // Determine employment status based on available data
    if (userData.jobTitle && userData.employerName) {
      return 'Employed';
    }
    return 'Looking for opportunities';
  };

  const getIndustryDisplay = () => {
    if (!userData?.industry) return '';
    
    // Convert industry codes to readable names
    const industryMap = {
      'technology': 'Technology',
      'healthcare': 'Healthcare',
      'finance': 'Finance',
      'education': 'Education',
      'manufacturing': 'Manufacturing',
      'retail': 'Retail',
      'consulting': 'Consulting',
      'marketing': 'Marketing & Advertising',
      'real_estate': 'Real Estate',
      'legal': 'Legal',
      'non_profit': 'Non-profit',
      'government': 'Government',
      'other': 'Other'
    };
    
    return industryMap[userData.industry] || userData.industry;
  };

  const getExperienceDisplay = () => {
    if (!userData?.yearsOfExperience) return '';
    
    const experienceMap = {
      '0-1': 'Less than 1 year',
      '1-2': '1-2 years',
      '3-5': '3-5 years',
      '6-10': '6-10 years',
      '11-15': '11-15 years',
      '16-20': '16-20 years',
      '20+': '20+ years'
    };
    
    return experienceMap[userData.yearsOfExperience] || userData.yearsOfExperience;
  };

  const styles = createStyles(darkMode);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={styles.text}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Feather name="chevron-left" size={24} onPress={()=> router.back()} color={styles.text.color} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.section}>
        <TouchableOpacity onPress={() => router.push('/profile/editUser/editDetails')} style={styles.infoSection}>
          <View style={styles.infoContent}>
            <Text style={styles.sectionTitle}>My information</Text>
            <Text style={styles.sectionSubtitle}>
              Get the best job matches and a more relevant community experience.
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color={styles.secondaryText.color} />
        </TouchableOpacity>
      </View>

      <View style={styles.fieldsContainer}>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Full name</Text>
          <Text style={styles.fieldValue}>{userData?.fullName || 'Not provided'}</Text>
        </View>
        
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Email</Text>
          <Text style={styles.fieldValue}>{userData?.email || 'Not provided'}</Text>
        </View>

        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Employment status</Text>
          <Text style={styles.fieldValue}>{getEmploymentStatus()}</Text>
        </View>

        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Current position</Text>
          <Text style={styles.fieldValue}>{userData?.jobTitle || 'Not specified'}</Text>
        </View>

        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Current employer</Text>
          <Text style={styles.fieldValue}>
            {userData?.employerName ? 
              (userData.employerName.length > 30 ? 
                userData.employerName.substring(0, 30) + '...' : 
                userData.employerName
              ) : 'Not specified'
            }
          </Text>
        </View>

        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Current location</Text>
          <Text style={styles.fieldValue}>{userData?.location || 'Not specified'}</Text>
        </View>

        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Industry</Text>
          <Text style={styles.fieldValue}>{getIndustryDisplay()}</Text>
        </View>

        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Years of experience</Text>
          <Text style={styles.fieldValue}>{getExperienceDisplay()}</Text>
        </View>

        {userData?.gender && (
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Gender</Text>
            <Text style={styles.fieldValue}>
              {userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1)}
            </Text>
          </View>
        )}

        {userData?.linkedinProfile && (
          <View style={[styles.fieldRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.fieldLabel}>LinkedIn</Text>
            <TouchableOpacity onPress={() => Linking.openURL(userData.linkedinProfile)}>
              <Text style={[styles.fieldValue, { color: '#10b981', textDecorationLine: 'underline' }]}>
                View Profile
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.resumeSection}>
        <Text style={styles.resumeTitle}>Resume</Text>
        <Text style={styles.resumeDescription}>
          After you upload a resume, it will be used to pre-fill job applications that you submit via Easy Apply. You can also make your resume visible or not visible to employers that are currently hiring. See our{' '}
          <Text style={styles.privacyLink} onPress={handlePrivacyPolicyPress}>
            Privacy Policy
          </Text>{' '}
          for more info.
        </Text>

        <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
          <Feather name="upload" size={20} color={styles.text.color} />
          <View style={styles.uploadTextContainer}>
            <Text style={styles.uploadTitle}>
              {(uploadedFile || userData?.resume) ? 'Update Resume' : 'Upload Resume'}
            </Text>
            <Text style={styles.uploadSubtitle}>Use a pdf, docx, doc, rtf and txt</Text>
          </View>
        </TouchableOpacity>

        {(uploadedFile || userData?.resume) && (
          <View style={styles.fileContainer}>
            <View style={styles.fileIcon}>
              <Text style={styles.fileIconText}>📄</Text>
            </View>
            <View style={styles.fileInfo}>
              <Text style={styles.fileName}>
                {uploadedFile?.name || userData?.resume?.name || 'Resume'}
              </Text>
              <Text style={styles.fileSize}>
                {(() => {
                  const size = uploadedFile?.size || userData?.resume?.size;
                  return size ? `${(size / 1024 / 1024).toFixed(2)} MB` : 'Unknown size';
                })()}
              </Text>
            </View>
          </View>
        )}
      </View>

      {userData?.employerReview && (
        <View style={styles.reviewSection}>
          <Text style={styles.resumeTitle}>Employer Review</Text>
          <View style={styles.reviewContainer}>
            <Text style={styles.reviewText}>{userData.employerReview}</Text>
            <Text style={styles.reviewEmployer}>- {userData.employerName}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const createStyles = (darkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkMode ? '#171717' : '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: darkMode ? '#ffffff' : '#000000',
  },
  headerRight: {
    width: 32,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  infoContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: darkMode ? '#ffffff' : '#000000',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: darkMode ? '#a1a1aa' : '#6b7280',
    lineHeight: 20,
  },
  fieldsContainer: {
    paddingHorizontal: 16,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: darkMode ? '#404040' : '#e5e7eb',
  },
  fieldLabel: {
    fontSize: 16,
    color: darkMode ? '#ffffff' : '#000000',
    flex: 1,
  },
  fieldValue: {
    fontSize: 16,
    color: darkMode ? '#a1a1aa' : '#6b7280',
    flex: 1,
    textAlign: 'right',
  },
  resumeSection: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  resumeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: darkMode ? '#ffffff' : '#000000',
    marginBottom: 16,
  },
  resumeDescription: {
    fontSize: 14,
    color: darkMode ? '#a1a1aa' : '#6b7280',
    lineHeight: 20,
    marginBottom: 24,
  },
  privacyLink: {
    color: '#10b981',
    textDecorationLine: 'underline',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: darkMode ? '#404040' : '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 8,
    marginTop: 24,
  },
  uploadTextContainer: {
    marginLeft: 12,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: darkMode ? '#ffffff' : '#000000',
  },
  uploadSubtitle: {
    fontSize: 14,
    color: darkMode ? '#a1a1aa' : '#6b7280',
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: darkMode ? '#262626' : '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  fileIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#10b981',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  fileIconText: {
    fontSize: 16,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '500',
    color: darkMode ? '#ffffff' : '#000000',
  },
  fileSize: {
    fontSize: 14,
    color: darkMode ? '#a1a1aa' : '#6b7280',
  },
  reviewSection: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  reviewContainer: {
    backgroundColor: darkMode ? '#262626' : '#f3f4f6',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  reviewText: {
    fontSize: 16,
    color: darkMode ? '#ffffff' : '#000000',
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  reviewEmployer: {
    fontSize: 14,
    color: darkMode ? '#a1a1aa' : '#6b7280',
    textAlign: 'right',
    fontWeight: '500',
  },
  text: {
    color: darkMode ? '#ffffff' : '#000000',
  },
  secondaryText: {
    color: darkMode ? '#a1a1aa' : '#6b7280',
  },
});

export default ProfilePage;