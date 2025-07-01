import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const JobseekLogin = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const handleGoogleLogin = () => {
    console.log('Continue with Google pressed');
  };

  const handleEmailLogin = () => {
    console.log('Continue with email pressed');
  };

  return (
    <SafeAreaView 
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#171717' : '#ffffff' }
      ]}
    >
      <View style={styles.content}>
        {/* Illustration with modern styling */}
        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={require('@/assets/images/auth-index-picture.png')}
              style={styles.illustration}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Modern Title and Subtitle */}
        <View style={styles.textContainer}>
          <Text style={[
            styles.title, 
            { 
              color: isDarkMode ? '#ffffff' : '#171717',
              textShadowColor: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)'
            }
          ]}>
            JOBSEEK
          </Text>
          <Text style={[
            styles.subtitle,
            { color: isDarkMode ? '#a3a3a3' : '#6b7280' }
          ]}>
            Find jobs and talk careers
          </Text>
          <View style={styles.accentLine} />
        </View>

        {/* Terms and Privacy with modern styling */}
        <View style={styles.termsContainer}>
          <Text style={[
            styles.termsText,
            { color: isDarkMode ? '#737373' : '#6b7280' }
          ]}>
            By continuing, you agree to our{' '}
            <Text style={styles.linkText}>Terms of Use</Text> and{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </View>

        {/* Modern Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[
              styles.button, 
              styles.primaryButton,
              { backgroundColor: isDarkMode ? '#ffffff' : '#ffffff' }
            ]} 
            onPress={handleGoogleLogin}
            activeOpacity={0.8}
          >
            <View style={styles.buttonContent}>
              <Image
                source={require('@/assets/images/google-icon.png')}
                style={styles.icon}
              />
              <Text style={[
                styles.primaryButtonText,
                { color: isDarkMode ? '#1f2937' : '#1f2937' }
              ]}>
                Continue with Google
              </Text>
            </View>
            <View style={styles.buttonGlow} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.button, 
              styles.secondaryButton,
              { 
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              }
            ]} 
            onPress={handleEmailLogin}
            activeOpacity={0.8}
          >
            <View style={styles.buttonContent}>
              <View style={[
                styles.emailIconContainer,
                { backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }
              ]}>
                <Text style={[
                  styles.emailIcon,
                  { color: isDarkMode ? '#ffffff' : '#374151' }
                ]}>@</Text>
              </View>
              <Text style={[
                styles.secondaryButtonText,
                { color: isDarkMode ? '#ffffff' : '#374151' }
              ]}>
                Continue with Email
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Modern decorative elements */}
        <View style={styles.decorativeElements}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotDelayed]} />
          <View style={[styles.dot, styles.dotDelayed2]} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  imageContainer: {
    width: width * 0.75,
    height: height * 0.32,
    marginBottom: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 15,
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 64,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 12,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  subtitle: {
    fontSize: 18,
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
  termsContainer: {
    marginBottom: 40,
    paddingHorizontal: 24,
  },
  termsText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  linkText: {
    color: '#60a5fa',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 28,
    borderRadius: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  primaryButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  secondaryButton: {
    borderWidth: 1,
    backdropFilter: 'blur(10px)',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 16,
    opacity: 0,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  emailIconContainer: {
    width: 24,
    height: 24,
    marginRight: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailIcon: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: '600',
  },
  secondaryButtonText: {
    fontSize: 17,
    fontWeight: '600',
  },
  decorativeElements: {
    position: 'absolute',
    top: 80,
    right: 40,
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(59, 130, 246, 0.6)',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  dotDelayed: {
    backgroundColor: 'rgba(59, 130, 246, 0.4)',
  },
  dotDelayed2: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
  },
});

export default JobseekLogin;