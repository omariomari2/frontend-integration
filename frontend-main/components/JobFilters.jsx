import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

const JobFilters = ({ visible, onClose, onApplyFilters, theme }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [selectedFilters, setSelectedFilters] = useState({
    jobType: [],
    experience: [],
    department: [],
    remote: null,
    salaryRange: null,
  });

  const filterOptions = {
    jobType: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    experience: ['Entry-level', 'Mid-level', 'Senior', 'Executive'],
    department: ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Data Science', 'Security', 'Operations'],
    remote: ['Remote', 'On-site', 'Hybrid'],
    salaryRange: ['$0-$50k', '$50k-$100k', '$100k-$150k', '$150k+'],
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    container: {
      backgroundColor: theme?.surface || (isDark ? '#1f1f1f' : '#ffffff'),
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: '80%',
      paddingTop: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme?.border || (isDark ? '#333' : '#eee'),
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: theme?.text || (isDark ? '#ffffff' : '#000000'),
    },
    closeButton: {
      padding: 8,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },
    section: {
      marginVertical: 15,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme?.text || (isDark ? '#ffffff' : '#000000'),
      marginBottom: 10,
    },
    optionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    optionButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme?.border || (isDark ? '#555' : '#ddd'),
      backgroundColor: theme?.surface || (isDark ? '#2a2a2a' : '#f8f8f8'),
    },
    optionButtonSelected: {
      backgroundColor: theme?.primary || '#007AFF',
      borderColor: theme?.primary || '#007AFF',
    },
    optionText: {
      fontSize: 14,
      color: theme?.textSecondary || (isDark ? '#ccc' : '#666'),
    },
    optionTextSelected: {
      color: '#ffffff',
      fontWeight: '500',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderTopWidth: 1,
      borderTopColor: theme?.border || (isDark ? '#333' : '#eee'),
      gap: 12,
    },
    footerButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    clearButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme?.border || (isDark ? '#555' : '#ddd'),
    },
    applyButton: {
      backgroundColor: theme?.primary || '#007AFF',
    },
    footerButtonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    clearButtonText: {
      color: theme?.text || (isDark ? '#ffffff' : '#000000'),
    },
    applyButtonText: {
      color: '#ffffff',
    },
  });

  const toggleFilter = (category, value) => {
    setSelectedFilters(prev => {
      if (category === 'remote' || category === 'salaryRange') {
        return {
          ...prev,
          [category]: prev[category] === value ? null : value,
        };
      } else {
        const currentValues = prev[category] || [];
        const newValues = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value];
        return {
          ...prev,
          [category]: newValues,
        };
      }
    });
  };

  const isSelected = (category, value) => {
    if (category === 'remote' || category === 'salaryRange') {
      return selectedFilters[category] === value;
    }
    return selectedFilters[category]?.includes(value) || false;
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      jobType: [],
      experience: [],
      department: [],
      remote: null,
      salaryRange: null,
    });
  };

  const applyFilters = () => {
    onApplyFilters(selectedFilters);
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Filter Jobs</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons 
                name="close" 
                size={24} 
                color={theme?.text || (isDark ? '#ffffff' : '#000000')} 
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {Object.entries(filterOptions).map(([category, options]) => (
              <View key={category} style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {category === 'jobType' ? 'Job Type' :
                   category === 'salaryRange' ? 'Salary Range' :
                   category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
                <View style={styles.optionsContainer}>
                  {options.map(option => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.optionButton,
                        isSelected(category, option) && styles.optionButtonSelected,
                      ]}
                      onPress={() => toggleFilter(category, option)}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          isSelected(category, option) && styles.optionTextSelected,
                        ]}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.footerButton, styles.clearButton]}
              onPress={clearAllFilters}
            >
              <Text style={[styles.footerButtonText, styles.clearButtonText]}>
                Clear All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.footerButton, styles.applyButton]}
              onPress={applyFilters}
            >
              <Text style={[styles.footerButtonText, styles.applyButtonText]}>
                Apply Filters
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default JobFilters;