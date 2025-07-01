import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const router = useRouter();

const RegisterPage = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleRegister = () => {
    console.log('Register pressed', { 
      firstName, 
      lastName, 
      email, 
      password, 
      confirmPassword, 
      agreeToTerms 
    });
  };

  // const handleGoogleRegister = () => {
  //   console.log('Google register pressed');
  // };

  // const handleFacebookRegister = () => {
  //   console.log('Facebook register pressed');
  // };

  // const handleAppleRegister = () => {
  //   console.log('Apple register pressed');
  // };

  return (
    <SafeAreaView 
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#171717' : '#ffffff' }
      ]}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <View style={styles.logoWrapper}>
              <Image
                source={require('@/assets/images/jobseek-logo.svg')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Welcome Section */}
          <View style={styles.welcomeContainer}>
            <Text style={[
              styles.welcomeTitle,
              { 
                color: isDarkMode ? '#ffffff' : '#171717',
                textShadowColor: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)'
              }
            ]}>
              Create Account
            </Text>
            <Text style={[
              styles.welcomeSubtitle,
              { color: isDarkMode ? '#a3a3a3' : '#6b7280' }
            ]}>
              Join us today and get started
            </Text>
            <View style={styles.accentLine} />
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            {/* Name Inputs Row */}
            <View style={styles.nameRow}>
              <View style={styles.nameInputContainer}>
                <Text style={[
                  styles.inputLabel,
                  { color: isDarkMode ? '#e5e5e5' : '#374151' }
                ]}>
                  First Name
                </Text>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                      color: isDarkMode ? '#ffffff' : '#171717'
                    }
                  ]}
                  placeholder="John"
                  placeholderTextColor={isDarkMode ? '#737373' : '#9ca3af'}
                  value={firstName}
                  onChangeText={setFirstName}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.nameInputContainer}>
                <Text style={[
                  styles.inputLabel,
                  { color: isDarkMode ? '#e5e5e5' : '#374151' }
                ]}>
                  Last Name
                </Text>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                      color: isDarkMode ? '#ffffff' : '#171717'
                    }
                  ]}
                  placeholder="Doe"
                  placeholderTextColor={isDarkMode ? '#737373' : '#9ca3af'}
                  value={lastName}
                  onChangeText={setLastName}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={[
                styles.inputLabel,
                { color: isDarkMode ? '#e5e5e5' : '#374151' }
              ]}>
                Email Address
              </Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    color: isDarkMode ? '#ffffff' : '#171717'
                  }
                ]}
                placeholder="john.doe@example.com"
                placeholderTextColor={isDarkMode ? '#737373' : '#9ca3af'}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={[
                styles.inputLabel,
                { color: isDarkMode ? '#e5e5e5' : '#374151' }
              ]}>
                Password
              </Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.textInput,
                    styles.passwordInput,
                    {
                      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                      color: isDarkMode ? '#ffffff' : '#171717'
                    }
                  ]}
                  placeholder="Create a strong password"
                  placeholderTextColor={isDarkMode ? '#737373' : '#9ca3af'}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={[
                    styles.eyeIcon,
                    { color: isDarkMode ? '#737373' : '#9ca3af' }
                  ]}>
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
              <Text style={[
                styles.inputLabel,
                { color: isDarkMode ? '#e5e5e5' : '#374151' }
              ]}>
                Confirm Password
              </Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.textInput,
                    styles.passwordInput,
                    {
                      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                      color: isDarkMode ? '#ffffff' : '#171717'
                    }
                  ]}
                  placeholder="Confirm your password"
                  placeholderTextColor={isDarkMode ? '#737373' : '#9ca3af'}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Text style={[
                    styles.eyeIcon,
                    { color: isDarkMode ? '#737373' : '#9ca3af' }
                  ]}>
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms Agreement */}
            <View style={styles.termsContainer}>
              <TouchableOpacity
                style={styles.termsCheckContainer}
                onPress={() => setAgreeToTerms(!agreeToTerms)}
              >
                <View style={[
                  styles.checkbox,
                  {
                    backgroundColor: agreeToTerms 
                      ? '#3b82f6' 
                      : isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    borderColor: agreeToTerms 
                      ? '#3b82f6' 
                      : isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
                  }
                ]}>
                  {agreeToTerms && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={[
                  styles.termsText,
                  { color: isDarkMode ? '#e5e5e5' : '#374151' }
                ]}>
                  I agree to the{' '}
                  <Text style={styles.linkText}>Terms of Service</Text> and{' '}
                  <Text style={styles.linkText}>Privacy Policy</Text>
                </Text>
              </TouchableOpacity>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              style={[
                styles.registerButton,
                {
                  opacity: agreeToTerms ? 1 : 0.6
                }
              ]}
              onPress={handleRegister}
              activeOpacity={0.8}
              disabled={!agreeToTerms}
            >
              <Text style={styles.registerButtonText}>Create Account</Text>
              <View style={styles.buttonGlow} />
            </TouchableOpacity>

            {/* Divider */}
            {/* <View style={styles.dividerContainer}>
              <View style={[
                styles.dividerLine,
                { backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
              ]} />
              <Text style={[
                styles.dividerText,
                { color: isDarkMode ? '#737373' : '#9ca3af' }
              ]}>
                or sign up with
              </Text>
              <View style={[
                styles.dividerLine,
                { backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
              ]} />
            </View> */}

            {/* Social Register Buttons */}
            {/* <View style={styles.socialContainer}>
              <TouchableOpacity 
                style={[
                  styles.socialButton,
                  {
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                  }
                ]}
                onPress={handleGoogleRegister}
              >
                <Image
                  source={require('@/assets/images/google-icon.png')}
                  style={styles.socialIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.socialButton,
                  {
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                  }
                ]}
                onPress={handleFacebookRegister}
              >
                <Image
                  source={require('@/assets/images/facebook.png')}
                  style={styles.socialIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.socialButton,
                  {
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                  }
                ]}
                onPress={handleAppleRegister}
              >
                <Image
                  source={require('@/assets/images/apple.png')}
                  style={styles.socialIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View> */}
          </View>

          {/* Sign In Link */}
          <View style={styles.signinContainer}>
            <Text style={[
              styles.signinText,
              { color: isDarkMode ? '#a3a3a3' : '#6b7280' }
            ]}>
              Already have an account?{' '}
              <Text style={[styles.linkText, styles.signinLink]} onPress={() => router.push("/auth/login")}>
                Sign In
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingVertical: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  logoWrapper: {
    width: 100,
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 35,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 8,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  welcomeSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
  },
  accentLine: {
    width: 60,
    height: 3,
    backgroundColor: '#3b82f6',
    borderRadius: 2,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  formContainer: {
    width: '100%',
    marginBottom: 25,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  nameInputContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    height: 52,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
  eyeIcon: {
    fontSize: 16,
  },
  termsContainer: {
    marginBottom: 28,
  },
  termsCheckContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    flex: 1,
  },
  linkText: {
    color: '#3b82f6',
    textDecorationLine: 'underline',
  },
  registerButton: {
    backgroundColor: '#3b82f6',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  buttonGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    opacity: 0,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontWeight: '500',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 20,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  signinContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  signinText: {
    fontSize: 15,
    fontWeight: '500',
  },
  signinLink: {
    fontWeight: '700',
  },
});

export default RegisterPage;