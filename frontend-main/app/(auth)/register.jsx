import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View
} from 'react-native';

export default function RegisterScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [currentStep, setCurrentStep] = useState(1);
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

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.jobTitle || !formData.employerName) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const userData = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      await AsyncStorage.setItem('userToken', 'authenticated');

      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => router.replace('/(tabs)') }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedFromStep1 = () => {
    return formData.fullName.trim() !== '' && formData.email.trim() !== '' && formData.password.length >= 6;
  };

  const canProceedFromStep2 = () => {
    return formData.jobTitle.trim() !== '' && formData.employerName.trim() !== '';
  };

  const canProceedFromStep3 = () => {
    return formData.location.trim() !== '' && formData.industry.trim() !== '';
  };

  const canProceedFromStep4 = () => {
    return formData.yearsOfExperience.trim() !== '';
  };

  const styles = {
    container: {
      flex: 1,
      backgroundColor: isDark ? '#171717' : '#ffffff',
    },
    content: {
      flex: 1,
      padding: 32,
    },
    header: {
      marginTop: 60,
      marginBottom: 40,
      alignItems: 'center',
    },
    imagePlaceholder: {
      marginBottom: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      fontFamily: 'Poppins',
      color: isDark ? '#ffffff' : '#171717',
      marginBottom: 12,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? '#a3a3a3' : '#666666',
      textAlign: 'center',
      lineHeight: 24,
      fontFamily: 'Inter',
    },
    stepIndicator: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 40,
    },
    stepDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginHorizontal: 4,
    },
    stepDotActive: {
      backgroundColor: '#0CAA41',
    },
    stepDotInactive: {
      backgroundColor: isDark ? '#374151' : '#d1d5db',
    },
    stepLine: {
      width: 30,
      height: 2,
      backgroundColor: isDark ? '#374151' : '#d1d5db',
    },
    stepLineActive: {
      backgroundColor: '#0CAA41',
    },
    form: {
      flex: 1,
    },
    inputGroup: {
      marginBottom: 28,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      fontFamily: 'Poppins',
      color: isDark ? '#ffffff' : '#171717',
      marginBottom: 12,
    },
    input: {
      borderWidth: 2,
      borderColor: isDark ? '#374151' : '#e5e7eb',
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      backgroundColor: isDark ? '#1f2937' : '#f9fafb',
      color: isDark ? '#ffffff' : '#171717',
      minHeight: 56,
      fontFamily: 'Inter'
    },
    textArea: {
      borderWidth: 2,
      borderColor: isDark ? '#374151' : '#e5e7eb',
      borderRadius: 16,
      padding: 20,
      fontSize: 16,
      backgroundColor: isDark ? '#1f2937' : '#f9fafb',
      color: isDark ? '#ffffff' : '#171717',
      minHeight: 120,
      textAlignVertical: 'top',
    },
    inputFocused: {
      borderColor: '#0CAA41',
    },
    pickerContainer: {
      borderWidth: 2,
      borderColor: isDark ? '#374151' : '#e5e7eb',
      borderRadius: 16,
      backgroundColor: isDark ? '#1f2937' : '#f9fafb',
      mainHeight: 50,
      justifyContent: 'center',
    },
    picker: {
      color: isDark ? '#ffffff' : '#171717',
    },
    buttonContainer: {
      marginTop: 20,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 16,
    },
    button: {
      backgroundColor: '#0CAA41',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      flex: 1,
      minHeight: 56,
      justifyContent: 'center',
    },
    buttonSecondary: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: isDark ? '#374151' : '#e5e7eb',
    },
    buttonDisabled: {
      backgroundColor: '#6b7280',
    },
    buttonText: {
      color: '#ffffff',
      fontFamily: 'Poppins',
      fontSize: 16,
      fontWeight: '600',
    },
    buttonTextSecondary: {
      color: isDark ? '#ffffff' : '#171717',
    },
    loginLink: {
      marginTop: 32,
      marginBottom: 50,
      alignItems: 'center',
    },
    loginText: {
      color: isDark ? '#a3a3a3' : '#666666',
      fontSize: 16,
      textAlign: 'center',
    },
    loginButton: {
      color: '#0CAA41',
      fontWeight: '600',
    },
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      <View style={[styles.stepDot, currentStep >= 1 ? styles.stepDotActive : styles.stepDotInactive]} />
      <View style={[styles.stepLine, currentStep >= 2 ? styles.stepLineActive : styles.stepLine]} />
      <View style={[styles.stepDot, currentStep >= 2 ? styles.stepDotActive : styles.stepDotInactive]} />
      <View style={[styles.stepLine, currentStep >= 3 ? styles.stepLineActive : styles.stepLine]} />
      <View style={[styles.stepDot, currentStep >= 3 ? styles.stepDotActive : styles.stepDotInactive]} />
      <View style={[styles.stepLine, currentStep >= 4 ? styles.stepLineActive : styles.stepLine]} />
      <View style={[styles.stepDot, currentStep >= 4 ? styles.stepDotActive : styles.stepDotInactive]} />
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.form}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={styles.input}
          value={formData.fullName}
          onChangeText={(text) => setFormData({...formData, fullName: text})}
          placeholder="Enter your full name"
          placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email Address *</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
          placeholder="Enter your email"
          placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password *</Text>
        <TextInput
          style={styles.input}
          value={formData.password}
          onChangeText={(text) => setFormData({...formData, password: text})}
          placeholder="Enter your password (min 6 characters)"
          placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
          secureTextEntry
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Select Gender</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.gender}
            onValueChange={(value) => setFormData({...formData, gender: value})}
            style={styles.picker}
          >
            {/* <Picker.Item label="Select gender (optional)" value="" /> */}
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.form}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Job Title *</Text>
        <TextInput
          style={styles.input}
          value={formData.jobTitle}
          onChangeText={(text) => setFormData({...formData, jobTitle: text})}
          placeholder="e.g. Software Engineer, Marketing Manager"
          placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Employer Name *</Text>
        <TextInput
          style={styles.input}
          value={formData.employerName}
          onChangeText={(text) => setFormData({...formData, employerName: text})}
          placeholder="Enter your employer's name"
          placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
        />
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.form}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Location *</Text>
        <TextInput
          style={styles.input}
          value={formData.location}
          onChangeText={(text) => setFormData({...formData, location: text})}
          placeholder="e.g. New York, NY or Remote"
          placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Industry *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.industry}
            onValueChange={(value) => setFormData({...formData, industry: value})}
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
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.form}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Years of Experience *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.yearsOfExperience}
            onValueChange={(value) => setFormData({...formData, yearsOfExperience: value})}
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
            onValueChange={(value) => setFormData({...formData, salaryRange: value})}
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

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Review of Employer</Text>
        <TextInput
          style={styles.textArea}
          value={formData.employerReview}
          onChangeText={(text) => setFormData({...formData, employerReview: text})}
          placeholder="Share your experience working at this company (optional)"
          placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>LinkedIn Profile</Text>
        <TextInput
          style={styles.input}
          value={formData.linkedinProfile}
          onChangeText={(text) => setFormData({...formData, linkedinProfile: text})}
          placeholder="https://linkedin.com/in/yourprofile (optional)"
          placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
          autoCapitalize="none"
        />
      </View>
    </View>
  );

  const renderButtons = () => {
    if (currentStep === 1) {
      return (
        <TouchableOpacity
          style={[styles.button, !canProceedFromStep1() && styles.buttonDisabled]}
          onPress={nextStep}
          disabled={!canProceedFromStep1()}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      );
    }

    if (currentStep === 2) {
      return (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={prevStep}
          >
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, !canProceedFromStep2() && styles.buttonDisabled]}
            onPress={nextStep}
            disabled={!canProceedFromStep2()}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (currentStep === 3) {
      return (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={prevStep}
          >
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, !canProceedFromStep3() && styles.buttonDisabled]}
            onPress={nextStep}
            disabled={!canProceedFromStep3()}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={prevStep}
        >
          <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, (!canProceedFromStep4() || loading) && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={!canProceedFromStep4() || loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Account Setup';
      case 2:
        return 'Professional Details';
      case 3:
        return 'Work Information';
      case 4:
        return 'Experience & Review';
      default:
        return 'Create Account';
    }
  };

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1:
        return 'Set up your basic account information';
      case 2:
        return 'Tell us about your current role';
      case 3:
        return 'Share your work location and industry';
      case 4:
        return 'Experience level and employer feedback';
      default:
        return 'Join our community today';
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.imagePlaceholder}>
            <Image 
              source={require('@/assets/images/JOBSEEK.png')} 
              style={{ width: 120, height: 120, borderRadius: 20 }} 
            />
          </View>
          <Text style={styles.title}>{getStepTitle()}</Text>
          <Text style={styles.subtitle}>{getStepSubtitle()}</Text>
        </View>

        {renderStepIndicator()}

        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}

        <View style={styles.buttonContainer}>
          {renderButtons()}
        </View>

        {currentStep === 1 && (
          <View style={styles.loginLink}>
            <Text style={styles.loginText}>
              Already have an account?{' '}
              <Text 
                style={styles.loginButton}
                onPress={() => router.push('/(auth)/login')}
              >
                Sign In
              </Text>
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}