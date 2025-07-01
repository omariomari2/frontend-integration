import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  useColorScheme
} from 'react-native';

const SearchBar = ({ placeholder = "Search jobs, companies...", onPress }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#1f1f1f' : '#f2f2f2',
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 11,
      marginHorizontal: 20,
      elevation: 2,
    },
    input: {
      flex: 1,
      marginLeft: 8,
      color: isDark ? '#ffffff' : '#000000',
      fontSize: 16,
    },
  });

  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Ionicons name="search-outline" size={20} color={isDark ? '#aaa' : '#555'} />
        <TextInput
          pointerEvents="none" // disables input focus
          editable={false}     // disables keyboard
          className="font-inter"
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={isDark ? '#888' : '#999'}
          underlineColorAndroid="transparent"
        />
      </View>
    </Pressable>
  );
};

export default SearchBar;
