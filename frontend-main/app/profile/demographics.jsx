import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';

const DemographicsPage = () => {
  // State for demographic data
  const [demographics, setDemographics] = useState({
    race: '',
    gender: 'Man',
    lgbtq: '',
    birthYear: '',
    disability: '',
    parentCaregiver: '',
    veteranStatus: '',
  });

  // Modal and editing states
  const [isEditing, setIsEditing] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tempValue, setTempValue] = useState('');

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const theme = {
    background: isDark ? '#171717' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    textSecondary: isDark ? '#9ca3af' : '#6b7280',
    accent: '#0CAA41',
    privacyLink: '#0CAA41',
    deleteButton: '#ef4444',
    cardBackground: isDark ? '#2a2a2a' : '#f9fafb',
    cardBorder: isDark ? '#374151' : '#e5e7eb',
    modalBackground: isDark ? '#2a2a2a' : '#ffffff',
    modalOverlay: 'rgba(0, 0, 0, 0.5)',
    inputBackground: isDark ? '#374151' : '#f3f4f6',
  };

  // Field configurations with options
  const fieldConfigs = {
    race: {
      label: 'Race/ethnicity',
      key: 'race',
      type: 'select',
      options: [
        'American Indian or Alaska Native',
        'Asian',
        'Black or African American',
        'Hispanic or Latino',
        'Native Hawaiian or Other Pacific Islander',
        'White',
        'Two or more races',
        'Prefer not to say',
      ],
    },
    gender: {
      label: 'Gender',
      key: 'gender',
      type: 'select',
      options: ['Man', 'Woman', 'Non-binary', 'Prefer not to say', 'Prefer to self-describe'],
    },
    lgbtq: {
      label: 'Member of the LGBTQ+ community',
      key: 'lgbtq',
      type: 'select',
      options: ['Yes', 'No', 'Prefer not to say'],
    },
    birthYear: {
      label: 'Age (Birth year)',
      key: 'birthYear',
      type: 'input',
      placeholder: 'Enter birth year (e.g., 1990)',
    },
    disability: {
      label: 'Disability',
      key: 'disability',
      type: 'select',
      options: ['Yes', 'No', 'Prefer not to say'],
      hasInfo: true,
    },
    parentCaregiver: {
      label: 'Parent or family caregiver',
      key: 'parentCaregiver',
      type: 'select',
      options: ['Yes', 'No', 'Prefer not to say'],
    },
    veteranStatus: {
      label: 'Veteran status',
      key: 'veteranStatus',
      type: 'select',
      options: ['Yes', 'No', 'Prefer not to say'],
    },
  };

  const EditIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Path 
        d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" 
        stroke={theme.text} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" 
        stroke={theme.text} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );

  const InfoIcon = () => (
    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={theme.textSecondary} strokeWidth="2"/>
      <Path d="M12 16v-4" stroke={theme.textSecondary} strokeWidth="2" strokeLinecap="round"/>
      <Path d="M12 8h.01" stroke={theme.textSecondary} strokeWidth="2" strokeLinecap="round"/>
    </Svg>
  );

  const handleEditField = (fieldKey) => {
    const field = fieldConfigs[fieldKey];
    setActiveField(field);
    setTempValue(demographics[fieldKey]);
    setModalVisible(true);
  };

  const handleSaveField = () => {
    if (activeField) {
      setDemographics(prev => ({
        ...prev,
        [activeField.key]: tempValue
      }));
    }
    setModalVisible(false);
    setActiveField(null);
    setTempValue('');
  };

  const handleDeleteAllInfo = () => {
    Alert.alert(
      'Delete Demographic Information',
      'Are you sure you want to delete all your demographic information? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setDemographics({
              race: '',
              gender: '',
              lgbtq: '',
              birthYear: '',
              disability: '',
              parentCaregiver: '',
              veteranStatus: '',
            });
            Alert.alert('Success', 'Your demographic information has been deleted.');
          },
        },
      ]
    );
  };

  const handleDisabilityInfo = () => {
    Alert.alert(
      'Disability Information',
      'This includes physical, mental, intellectual, or sensory impairments that substantially limit one or more major life activities.',
      [{ text: 'OK' }]
    );
  };

  const getDisplayValue = (key) => {
    const value = demographics[key];
    return value || '--';
  };

  const renderModal = () => {
    if (!activeField) return null;

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.modalBackground }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {activeField.label}
            </Text>

            {activeField.type === 'select' ? (
              <ScrollView style={styles.optionsContainer} showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                  style={[styles.option, tempValue === '' && styles.selectedOption]}
                  onPress={() => setTempValue('')}
                >
                  <Text style={[styles.optionText, { color: theme.text }]}>
                    Prefer not to answer
                  </Text>
                </TouchableOpacity>
                {activeField.options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.option, tempValue === option && styles.selectedOption]}
                    onPress={() => setTempValue(option)}
                  >
                    <Text style={[styles.optionText, { color: theme.text }]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <TextInput
                style={[styles.textInput, { 
                  backgroundColor: theme.inputBackground,
                  color: theme.text 
                }]}
                value={tempValue}
                onChangeText={setTempValue}
                placeholder={activeField.placeholder}
                placeholderTextColor={theme.textSecondary}
                keyboardType={activeField.key === 'birthYear' ? 'numeric' : 'default'}
              />
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.buttonText, { color: theme.text }]}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton, { backgroundColor: theme.accent }]}
                onPress={handleSaveField}
              >
                <Text style={[styles.buttonText, { color: '#ffffff' }]}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
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
        <Text style={[styles.headerTitle, { color: theme.text }]}>Demographics</Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => setIsEditing(!isEditing)}
        >
          <EditIcon />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={[styles.description, { color: theme.text }]}>
            Shine a light on inequities in the workplace. Anonymously share your demographics to help pinpoint pay and diversity disparities.
          </Text>
          
          <Text style={[styles.privacyText, { color: theme.text }]}>
            Sharing your{' '}
            <Text style={[styles.privacyLink, { color: theme.privacyLink }]}>
              demographic information
            </Text>
            {' '}is optional. If provided, this information won't be shared with employers but will be collected and used in accordance with our{' '}
            <Text style={[styles.privacyLink, { color: theme.privacyLink }]}>
              Privacy Policy
            </Text>
            .
          </Text>
        </View>

        {/* Demographic Fields */}
        <View style={styles.fieldsContainer}>
          {Object.entries(fieldConfigs).map(([key, field]) => (
            <TouchableOpacity
              key={key}
              style={styles.fieldItem}
              onPress={() => handleEditField(key)}
              disabled={!isEditing && key !== 'disability'}
            >
              <View style={styles.fieldHeader}>
                <Text style={[styles.fieldLabel, { color: theme.text }]}>
                  {field.label}
                </Text>
                {field.hasInfo && (
                  <TouchableOpacity 
                    style={styles.infoIcon}
                    onPress={handleDisabilityInfo}
                  >
                    <InfoIcon />
                  </TouchableOpacity>
                )}
              </View>
              <Text style={[styles.fieldValue, { color: theme.textSecondary }]}>
                {getDisplayValue(key)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Remove Information Card */}
        <View style={[styles.removeCard, { 
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorder 
        }]}>
          <Text style={[styles.removeTitle, { color: theme.text }]}>
            Remove my demographic information
          </Text>
          
          <TouchableOpacity 
            style={[styles.deleteButton, { backgroundColor: theme.deleteButton }]}
            onPress={handleDeleteAllInfo}
          >
            <Text style={styles.deleteButtonText}>Delete this info</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {renderModal()}
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 56,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 24,
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  editButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  descriptionContainer: {
    paddingVertical: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  privacyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  privacyLink: {
    textDecorationLine: 'underline',
  },
  fieldsContainer: {
    paddingVertical: 20,
  },
  fieldItem: {
    marginBottom: 32,
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  infoIcon: {
    marginLeft: 8,
    padding: 4,
  },
  fieldValue: {
    fontSize: 16,
    fontWeight: '400',
  },
  removeCard: {
    marginTop: 20,
    marginBottom: 40,
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
  removeTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    lineHeight: 24,
  },
  deleteButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 12,
    padding: 24,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    maxHeight: 300,
    marginBottom: 20,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: 'rgba(12, 170, 65, 0.1)',
  },
  optionText: {
    fontSize: 16,
  },
  textInput: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6b7280',
  },
  saveButton: {
    backgroundColor: '#0CAA41',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DemographicsPage;