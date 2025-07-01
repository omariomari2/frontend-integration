import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function ProfilePictureScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadUserData();
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Sorry, we need camera roll permissions to change your profile picture.'
      );
    }
  };

  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        const parsedData = JSON.parse(data);
        setUserData(parsedData);
        if (parsedData.profileImage) {
          setProfileImage(parsedData.profileImage);
        }
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  const pickImage = async (source) => {
    try {
      let result;
      
      if (source === 'camera') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Required', 'Camera permission is needed to take photos.');
          return;
        }
        
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      }

      if (!result.canceled && result.assets[0]) {
        setUploading(true);
        const imageUri = result.assets[0].uri;
        await saveProfileImage(imageUri);
        setProfileImage(imageUri);
        setUploading(false);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      setUploading(false);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };

  const saveProfileImage = async (imageUri) => {
    try {
      const updatedUserData = {
        ...userData,
        profileImage: imageUri,
      };
      
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      setUserData(updatedUserData);
    } catch (error) {
      console.error('Failed to save profile image:', error);
      Alert.alert('Error', 'Failed to save profile image.');
    }
  };

  const removeProfileImage = async () => {
    Alert.alert(
      'Remove Profile Picture',
      'Are you sure you want to remove your profile picture?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedUserData = {
                ...userData,
                profileImage: null,
              };
              
              await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
              setUserData(updatedUserData);
              setProfileImage(null);
            } catch (error) {
              console.error('Failed to remove profile image:', error);
              Alert.alert('Error', 'Failed to remove profile image.');
            }
          },
        },
      ]
    );
  };

  const showImageOptions = () => {
    Alert.alert(
      'Select Profile Picture',
      'Choose how you want to set your profile picture',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Camera', onPress: () => pickImage('camera') },
        { text: 'Photo Library', onPress: () => pickImage('library') },
      ]
    );
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
    content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 40,
    },
    avatarContainer: {
      alignItems: 'center',
      marginBottom: 40,
    },
    avatarWrapper: {
      position: 'relative',
      marginBottom: 20,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: '#5A67D8',
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    avatarText: {
      color: '#ffffff',
      fontSize: 48,
      fontFamily: 'Poppins',
      fontWeight: '600',
    },
    cameraIcon: {
      position: 'absolute',
      bottom: 8,
      right: 8,
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: '#5A67D8',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: isDark ? '#171717' : '#ffffff',
    },
    loadingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    userName: {
      fontSize: 24,
      fontFamily: 'Poppins',
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#1a1a1a',
      textAlign: 'center',
      marginBottom: 8,
    },
    userEmail: {
      fontSize: 16,
      fontFamily: 'Poppins',
      color: isDark ? '#a3a3a3' : '#666666',
      textAlign: 'center',
    },
    buttonContainer: {
      gap: 16,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#5A67D8',
      borderRadius: 12,
      padding: 16,
      gap: 12,
    },
    buttonSecondary: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#d1d5db',
    },
    buttonDanger: {
      backgroundColor: '#dc2626',
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontFamily: 'Poppins',
      fontWeight: '600',
    },
    buttonTextSecondary: {
      color: isDark ? '#ffffff' : '#374151',
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
    },
  });

  if (!userData) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Loading...</Text>
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
        <Text style={styles.headerTitle}>Profile Picture</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.content}>
        {/* Avatar Section */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarText}>
                  {getInitials(userData.fullName || userData.name)}
                </Text>
              )}
              {uploading && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color="#ffffff" />
                </View>
              )}
            </View>
            <TouchableOpacity 
              style={styles.cameraIcon} 
              onPress={showImageOptions}
              disabled={uploading}
              activeOpacity={0.7}
            >
              <Icon name="camera" size={18} color="#ffffff" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>
            {userData.fullName || userData.name || 'User'}
          </Text>
          <Text style={styles.userEmail}>
            {userData.email || 'No email provided'}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={showImageOptions}
            disabled={uploading}
            activeOpacity={0.7}
          >
            <Icon name="camera" size={20} color="#ffffff" />
            <Text style={styles.buttonText}>
              {profileImage ? 'Change Picture' : 'Add Picture'}
            </Text>
          </TouchableOpacity>

          {profileImage && (
            <TouchableOpacity 
              style={[styles.button, styles.buttonDanger]} 
              onPress={removeProfileImage}
              disabled={uploading}
              activeOpacity={0.7}
            >
              <Icon name="trash-2" size={20} color="#ffffff" />
              <Text style={styles.buttonText}>Remove Picture</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}