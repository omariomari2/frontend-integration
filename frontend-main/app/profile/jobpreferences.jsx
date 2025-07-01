import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function JobPreferencesScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [jobPreferences, setJobPreferences] = useState({
    desiredJobTitle: '',
    minimumSalary: '',
    workLocation: '',
    remotePreference: '',
    resume: null,
  });
  const [loading, setLoading] = useState(true);
  const [uploadingResume, setUploadingResume] = useState(false);

  useEffect(() => {
    loadJobPreferences();
  }, []);

  const loadJobPreferences = async () => {
    try {
      const data = await AsyncStorage.getItem('jobPreferences');
      if (data) {
        setJobPreferences(JSON.parse(data));
      }
    } catch (error) {
      console.error('Failed to load job preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveJobPreferences = async (updatedPreferences) => {
    try {
      await AsyncStorage.setItem('jobPreferences', JSON.stringify(updatedPreferences));
      setJobPreferences(updatedPreferences);
    } catch (error) {
      console.error('Failed to save job preferences:', error);
      Alert.alert('Error', 'Failed to save preferences. Please try again.');
    }
  };

  const handleJobTitlePress = () => {
    router.push({
      pathname: './preferences/job-title',
      params: { currentValue: jobPreferences.desiredJobTitle }
    });
  };

  const handleMinimumSalaryPress = () => {
    router.push({
      pathname: './preferences/minimum-salary',
      params: { currentValue: jobPreferences.minimumSalary }
    });
  };

  const handleWorkLocationPress = () => {
    router.push({
      pathname: './preferences/work-location',
      params: { currentValue: jobPreferences.workLocation }
    });
  };

  const handleRemotePreferencesPress = () => {
    router.push({
      pathname: './preferences/remote-preferences',
      params: { currentValue: jobPreferences.remotePreference }
    });
  };

  const handleResumeUpload = async () => {
    try {
      setUploadingResume(true);
      
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/rtf',
          'text/plain'
        ],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const file = result.assets[0];
        const updatedPreferences = {
          ...jobPreferences,
          resume: {
            name: file.name,
            uri: file.uri,
            type: file.mimeType,
            size: file.size,
            uploadDate: new Date().toISOString(),
          }
        };
        
        await saveJobPreferences(updatedPreferences);
        Alert.alert('Success', 'Resume uploaded successfully!');
      }
    } catch (error) {
      console.error('Error uploading resume:', error);
      Alert.alert('Error', 'Failed to upload resume. Please try again.');
    } finally {
      setUploadingResume(false);
    }
  };

  const handleRemoveResume = () => {
    Alert.alert(
      'Remove Resume',
      'Are you sure you want to remove your resume?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            const updatedPreferences = {
              ...jobPreferences,
              resume: null,
            };
            await saveJobPreferences(updatedPreferences);
          },
        },
      ]
    );
  };

  const handlePrivacyPolicyPress = () => {
    // You can replace this with your actual privacy policy URL
    Linking.openURL('https://your-app.com/privacy-policy');
  };

  const handleRecentJobsPress = () => {
    router.push('./preferences/recent-jobs-activity');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getDisplayValue = (value, placeholder) => {
    return value || placeholder;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#171717' : '#ffffff',
    },
    safeArea: {
      flex: 1,
      backgroundColor: isDark ? '#171717' : '#ffffff',
    },
    headerText: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    backButton: {
      padding: 4,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      fontFamily: 'Poppins',
      textAlign: 'center',
      color: isDark ? '#ffffff' : '#000000',
    },
    headerRight: {
      width: 32,
    },
    scrollContainer: {
      flex: 1,
    },
    content: {
      paddingHorizontal: 24,
      paddingVertical: 20,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: isDark ? '#ffffff' : '#1a1a1a',
      marginBottom: 8,
    },
    sectionDescription: {
      fontSize: 16,
   
      color: isDark ? '#a3a3a3' : '#666666',
      marginBottom: 32,
      lineHeight: 24,
    },
    preferenceItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#2a2a2a' : '#f0f0f0',
    },
    preferenceLeft: {
      flex: 1,
    },
    preferenceTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: isDark ? '#ffffff' : '#1a1a1a',
      marginBottom: 4,
    },
    preferenceValue: {
      fontSize: 14,
      color: isDark ? '#9ca3af' : '#6b7280',
    },
    preferenceValueSet: {
      color: isDark ? '#60a5fa' : '#3b82f6',
    },
    preferenceRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    infoIcon: {
      padding: 4,
    },
    resumeSection: {
      marginTop: 40,
    },
    resumeSectionTitle: {
      fontSize: 22,
      fontWeight: '700',
      fontFamily: 'Poppins',
      color: isDark ? '#ffffff' : '#1a1a1a',
      marginBottom: 12,
    },
    resumeDescription: {
      fontSize: 14,
      fontFamily: 'Poppins',
      color: isDark ? '#a3a3a3' : '#666666',
      lineHeight: 22,
      marginBottom: 8,
    },
    privacyLink: {
      fontSize: 14,
      fontFamily: 'Poppins',
      color: '#10b981',
      textDecorationLine: 'underline',
    },
    uploadButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
      borderRadius: 12,
      padding: 20,
      marginTop: 20,
      borderWidth: 2,
      borderColor: isDark ? '#374151' : '#e5e7eb',
      borderStyle: 'dashed',
    },
    uploadButtonActive: {
      backgroundColor: isDark ? '#1e3a8a' : '#eff6ff',
      borderColor: '#3b82f6',
    },
    uploadIcon: {
      marginRight: 12,
    },
    uploadText: {
      flex: 1,
    },
    uploadTitle: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: 'Poppins',
      color: isDark ? '#ffffff' : '#1a1a1a',
      marginBottom: 4,
    },
    uploadSubtitle: {
      fontSize: 14,
      fontFamily: 'Poppins',
      color: isDark ? '#9ca3af' : '#6b7280',
    },
    resumeInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#065f46' : '#ecfdf5',
      borderRadius: 12,
      padding: 16,
      marginTop: 20,
    },
    resumeInfoText: {
      flex: 1,
      marginLeft: 12,
    },
    resumeFileName: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: 'Poppins',
      color: isDark ? '#10b981' : '#047857',
      marginBottom: 4,
    },
    resumeFileDetails: {
      fontSize: 14,
      fontFamily: 'Poppins',
      color: isDark ? '#6ee7b7' : '#059669',
    },
    removeButton: {
      padding: 8,
    },
    activityCard: {
      backgroundColor: isDark ? '#1f2937' : '#f9fafb',
      borderRadius: 16,
      padding: 24,
      marginTop: 32,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#e5e7eb',
    },
    activityTitle: {
      fontSize: 20,
      fontWeight: '700',
      fontFamily: 'Poppins',
      color: isDark ? '#ffffff' : '#1a1a1a',
      marginBottom: 12,
    },
    activityDescription: {
      fontSize: 14,
      fontFamily: 'Poppins',
      color: isDark ? '#9ca3af' : '#6b7280',
      lineHeight: 22,
      marginBottom: 20,
    },
    activityButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    activityButtonText: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: 'Poppins',
      color: '#10b981',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 18,
      fontFamily: 'Poppins',
      color: isDark ? '#ffffff' : '#1a1a1a',
      marginTop: 12,
    },
  });

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Loading preferences...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerText}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()} 
          activeOpacity={0.7}
        >
          <Icon name="chevron-left" size={24} color={isDark ? '#ffffff' : '#000000'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Job Preferences</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Job Preferences Section */}
          <Text style={styles.sectionTitle}>Job preferences</Text>
          <Text style={styles.sectionDescription}>
            Get the jobs that best match your goals and dreams
          </Text>

          {/* Desired Job Title */}
          <TouchableOpacity style={styles.preferenceItem} onPress={handleJobTitlePress} activeOpacity={0.7}>
            <View style={styles.preferenceLeft}>
              <Text style={styles.preferenceTitle}>Desired job title</Text>
              <Text style={[
                styles.preferenceValue,
                jobPreferences.desiredJobTitle && styles.preferenceValueSet
              ]}>
                {getDisplayValue(jobPreferences.desiredJobTitle, 'Internship')}
              </Text>
            </View>
            <View style={styles.preferenceRight}>
              <Icon name="chevron-right" size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
            </View>
          </TouchableOpacity>

          {/* Desired Minimum Salary */}
          <TouchableOpacity style={styles.preferenceItem} onPress={handleMinimumSalaryPress} activeOpacity={0.7}>
            <View style={styles.preferenceLeft}>
              <Text style={styles.preferenceTitle}>Desired minimum salary</Text>
              <Text style={[
                styles.preferenceValue,
                jobPreferences.minimumSalary && styles.preferenceValueSet
              ]}>
                {getDisplayValue(jobPreferences.minimumSalary, 'Not specified')}
              </Text>
            </View>
            <View style={styles.preferenceRight}>
              <TouchableOpacity style={styles.infoIcon} activeOpacity={0.7}>
                <Icon name="info" size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
              </TouchableOpacity>
              <Icon name="chevron-right" size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
            </View>
          </TouchableOpacity>

          {/* Desired Work Location */}
          <TouchableOpacity style={styles.preferenceItem} onPress={handleWorkLocationPress} activeOpacity={0.7}>
            <View style={styles.preferenceLeft}>
              <Text style={styles.preferenceTitle}>Desired work location</Text>
              <Text style={[
                styles.preferenceValue,
                jobPreferences.workLocation && styles.preferenceValueSet
              ]}>
                {getDisplayValue(jobPreferences.workLocation, 'Not specified')}
              </Text>
            </View>
            <View style={styles.preferenceRight}>
              <Icon name="chevron-right" size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
            </View>
          </TouchableOpacity>

          {/* Remote Work Preferences */}
          <TouchableOpacity style={styles.preferenceItem} onPress={handleRemotePreferencesPress} activeOpacity={0.7}>
            <View style={styles.preferenceLeft}>
              <Text style={styles.preferenceTitle}>Remote work preferences</Text>
              <Text style={[
                styles.preferenceValue,
                jobPreferences.remotePreference && styles.preferenceValueSet
              ]}>
                {getDisplayValue(jobPreferences.remotePreference, 'Not specified')}
              </Text>
            </View>
            <View style={styles.preferenceRight}>
              <Icon name="chevron-right" size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
            </View>
          </TouchableOpacity>

          {/* Resume Section */}
          <View style={styles.resumeSection}>
            <Text style={styles.resumeSectionTitle}>Resume</Text>
            <Text style={styles.resumeDescription}>
              After you upload a resume, it will be used to pre-fill job applications that you submit via Easy Apply. You can also make your resume visible or not visible to employers that are currently hiring. See our{' '}
              <Text style={styles.privacyLink} onPress={handlePrivacyPolicyPress}>
                Privacy Policy
              </Text>
              {' '}for more info.
            </Text>

            {!jobPreferences.resume ? (
              <TouchableOpacity 
                style={[styles.uploadButton, uploadingResume && styles.uploadButtonActive]} 
                onPress={handleResumeUpload}
                disabled={uploadingResume}
                activeOpacity={0.7}
              >
                <View style={styles.uploadIcon}>
                  {uploadingResume ? (
                    <ActivityIndicator size="small" color="#3b82f6" />
                  ) : (
                    <Icon name="upload" size={24} color={isDark ? '#ffffff' : '#374151'} />
                  )}
                </View>
                <View style={styles.uploadText}>
                  <Text style={styles.uploadTitle}>
                    {uploadingResume ? 'Uploading Resume...' : 'Upload Resume'}
                  </Text>
                  <Text style={styles.uploadSubtitle}>
                    Use a pdf, docx, doc, rtf and txt
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.resumeInfo}>
                <Icon name="file-text" size={24} color="#10b981" />
                <View style={styles.resumeInfoText}>
                  <Text style={styles.resumeFileName}>{jobPreferences.resume.name}</Text>
                  <Text style={styles.resumeFileDetails}>
                    {formatFileSize(jobPreferences.resume.size)} • Uploaded {new Date(jobPreferences.resume.uploadDate).toLocaleDateString()}
                  </Text>
                </View>
                <TouchableOpacity style={styles.removeButton} onPress={handleRemoveResume} activeOpacity={0.7}>
                  <Icon name="trash-2" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Activity Card */}
          <View style={styles.activityCard}>
            <Text style={styles.activityTitle}>Stay up to date with your job search</Text>
            <Text style={styles.activityDescription}>
              Revisit your saved jobs, recent searches, and view recommended jobs.
            </Text>
            <TouchableOpacity style={styles.activityButton} onPress={handleRecentJobsPress} activeOpacity={0.7}>
              <Text style={styles.activityButtonText}>See your Recent Jobs Activity</Text>
              <Icon name="chevron-right" size={20} color="#10b981" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}