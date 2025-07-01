import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Appearance,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const EditProfilePage = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    gender: '',
    jobTitle: '',
    employerName: '',
    location: '',
    industry: '',
    yearsOfExperience: '',
    salaryRange: '',
    employerReview: '',
    linkedinProfile: '',
  });

  const [originalData, setOriginalData] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    setDarkMode(colorScheme === 'dark');

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setDarkMode(colorScheme === 'dark');
    });

    loadUserData();

    return subscription?.remove;
  }, []);

  useEffect(() => {
    // Check if form data has changed
    const dataChanged = JSON.stringify(formData) !== JSON.stringify(originalData);
    setHasChanges(dataChanged);
  }, [formData, originalData]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        setFormData({
          fullName: parsedData.fullName || '',
          email: parsedData.email || '',
          password: '', // Don't pre-fill password for security
          gender: parsedData.gender || '',
          jobTitle: parsedData.jobTitle || '',
          employerName: parsedData.employerName || '',
          location: parsedData.location || '',
          industry: parsedData.industry || '',
          yearsOfExperience: parsedData.yearsOfExperience || '',
          salaryRange: parsedData.salaryRange || '',
          employerReview: parsedData.employerReview || '',
          linkedinProfile: parsedData.linkedinProfile || '',
        });
        setOriginalData({
          fullName: parsedData.fullName || '',
          email: parsedData.email || '',
          password: '',
          gender: parsedData.gender || '',
          jobTitle: parsedData.jobTitle || '',
          employerName: parsedData.employerName || '',
          location: parsedData.location || '',
          industry: parsedData.industry || '',
          yearsOfExperience: parsedData.yearsOfExperience || '',
          salaryRange: parsedData.salaryRange || '',
          employerReview: parsedData.employerReview || '',
          linkedinProfile: parsedData.linkedinProfile || '',
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      Alert.alert('Error', 'Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    // Validation
    if (!formData.fullName.trim()) {
      Alert.alert('Error', 'Full name is required');
      return;
    }

    if (!formData.email.trim()) {
      Alert.alert('Error', 'Email is required');
      return;
    }

    if (formData.password && formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    try {
      setSaving(true);
      
      // Get current user data
      const storedUserData = await AsyncStorage.getItem('userData');
      let currentData = {};
      
      if (storedUserData) {
        currentData = JSON.parse(storedUserData);
      }

      // Update with new data
      const updatedUserData = {
        ...currentData,
        ...formData,
        // Only update password if a new one was provided
        ...(formData.password ? { password: formData.password } : {}),
        updatedAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      
      Alert.alert('Success', 'Profile updated successfully!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      Alert.alert(
        'Discard Changes',
        'You have unsaved changes. Are you sure you want to go back?',
        [
          { text: 'Stay', style: 'cancel' },
          { text: 'Discard', onPress: () => router.back() }
        ]
      );
    } else {
      router.back();
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={handleCancel}>
            <Feather name="x" size={24} color={styles.text.color} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity 
            style={[styles.headerButton, !hasChanges && styles.headerButtonDisabled]} 
            onPress={handleSave}
            disabled={!hasChanges || saving}
          >
            <Text style={[styles.saveButtonText, !hasChanges && styles.saveButtonTextDisabled]}>
              {saving ? 'Saving...' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Personal Information Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.fullName}
                onChangeText={(text) => updateFormData('fullName', text)}
                placeholder="Enter your full name"
                placeholderTextColor={darkMode ? '#6b7280' : '#9ca3af'}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address *</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => updateFormData('email', text)}
                placeholder="Enter your email"
                placeholderTextColor={darkMode ? '#6b7280' : '#9ca3af'}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={formData.password}
                onChangeText={(text) => updateFormData('password', text)}
                placeholder="Enter new password (leave blank to keep current)"
                placeholderTextColor={darkMode ? '#6b7280' : '#9ca3af'}
                secureTextEntry
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.gender}
                  onValueChange={(value) => updateFormData('gender', value)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select gender (optional)" value="" />
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                </Picker>
              </View>
            </View>
          </View>

          {/* Professional Information Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Job Title</Text>
              <TextInput
                style={styles.input}
                value={formData.jobTitle}
                onChangeText={(text) => updateFormData('jobTitle', text)}
                placeholder="e.g. Software Engineer, Marketing Manager"
                placeholderTextColor={darkMode ? '#6b7280' : '#9ca3af'}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Employer Name</Text>
              <TextInput
                style={styles.input}
                value={formData.employerName}
                onChangeText={(text) => updateFormData('employerName', text)}
                placeholder="Enter your employer's name"
                placeholderTextColor={darkMode ? '#6b7280' : '#9ca3af'}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Location</Text>
              <TextInput
                style={styles.input}
                value={formData.location}
                onChangeText={(text) => updateFormData('location', text)}
                placeholder="e.g. New York, NY or Remote"
                placeholderTextColor={darkMode ? '#6b7280' : '#9ca3af'}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Industry</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.industry}
                  onValueChange={(value) => updateFormData('industry', value)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select industry" value="" />
                  <Picker.Item label="Technology" value="technology" />
                  <Picker.Item label="Healthcare" value="healthcare" />
                  <Picker.Item label="Finance" value="finance" />
                  <Picker.Item label="Education" value="education" />
                  <Picker.Item label="Manufacturing" value="manufacturing" />
                  <Picker.Item label="Retail" value="retail" />
                  <Picker.Item label="Consulting" value="consulting" />
                  <Picker.Item label="Marketing & Advertising" value="marketing" />
                  <Picker.Item label="Real Estate" value="real_estate" />
                  <Picker.Item label="Legal" value="legal" />
                  <Picker.Item label="Non-profit" value="non_profit" />
                  <Picker.Item label="Government" value="government" />
                  <Picker.Item label="Other" value="other" />
                </Picker>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Years of Experience</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.yearsOfExperience}
                  onValueChange={(value) => updateFormData('yearsOfExperience', value)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select experience level" value="" />
                  <Picker.Item label="Less than 1 year" value="0-1" />
                  <Picker.Item label="1-2 years" value="1-2" />
                  <Picker.Item label="3-5 years" value="3-5" />
                  <Picker.Item label="6-10 years" value="6-10" />
                  <Picker.Item label="11-15 years" value="11-15" />
                  <Picker.Item label="16-20 years" value="16-20" />
                  <Picker.Item label="20+ years" value="20+" />
                </Picker>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Salary Range</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.salaryRange}
                  onValueChange={(value) => updateFormData('salaryRange', value)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select salary range (optional)" value="" />
                  <Picker.Item label="Under $30,000" value="under_30k" />
                  <Picker.Item label="$30,000 - $50,000" value="30k_50k" />
                  <Picker.Item label="$50,000 - $75,000" value="50k_75k" />
                  <Picker.Item label="$75,000 - $100,000" value="75k_100k" />
                  <Picker.Item label="$100,000 - $150,000" value="100k_150k" />
                  <Picker.Item label="$150,000 - $200,000" value="150k_200k" />
                  <Picker.Item label="Over $200,000" value="over_200k" />
                  <Picker.Item label="Prefer not to say" value="prefer_not_to_say" />
                </Picker>
              </View>
            </View>
          </View>

          {/* Additional Information Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>LinkedIn Profile</Text>
              <TextInput
                style={styles.input}
                value={formData.linkedinProfile}
                onChangeText={(text) => updateFormData('linkedinProfile', text)}
                placeholder="https://linkedin.com/in/yourprofile"
                placeholderTextColor={darkMode ? '#6b7280' : '#9ca3af'}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Review of Employer</Text>
              <TextInput
                style={styles.textArea}
                value={formData.employerReview}
                onChangeText={(text) => updateFormData('employerReview', text)}
                placeholder="Share your experience working at this company"
                placeholderTextColor={darkMode ? '#6b7280' : '#9ca3af'}
                multiline
                numberOfLines={4}
              />
            </View>
          </View>

          {/* Bottom spacing */}
          <View style={{ height: 50 }} />
        </ScrollView>
      </KeyboardAvoidingView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: darkMode ? '#374151' : '#e5e7eb',
  },
  headerButton: {
    padding: 4,
    minWidth: 60,
    alignItems: 'center',
  },
  headerButtonDisabled: {
    opacity: 0.5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: darkMode ? '#ffffff' : '#000000',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0CAA41',
  },
  saveButtonTextDisabled: {
    color: darkMode ? '#6b7280' : '#9ca3af',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: darkMode ? '#ffffff' : '#000000',
    marginBottom: 20,
    fontFamily: 'Poppins',
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: darkMode ? '#ffffff' : '#171717',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: darkMode ? '#374151' : '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: darkMode ? '#1f2937' : '#f9fafb',
    color: darkMode ? '#ffffff' : '#171717',
    minHeight: 56,
    fontFamily: 'Inter',
  },
  textArea: {
    borderWidth: 2,
    borderColor: darkMode ? '#374151' : '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: darkMode ? '#1f2937' : '#f9fafb',
    color: darkMode ? '#ffffff' : '#171717',
    minHeight: 120,
    textAlignVertical: 'top',
    fontFamily: 'Inter',
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: darkMode ? '#374151' : '#e5e7eb',
    borderRadius: 12,
    backgroundColor: darkMode ? '#1f2937' : '#f9fafb',
    minHeight: 56,
    justifyContent: 'center',
  },
  picker: {
    color: darkMode ? '#ffffff' : '#171717',
    fontSize: 16,
  },
  text: {
    color: darkMode ? '#ffffff' : '#000000',
  },
});

export default EditProfilePage;