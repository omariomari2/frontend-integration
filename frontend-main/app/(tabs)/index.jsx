import SearchBar from '../../components/SearchBar.jsx';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View, useColorScheme } from 'react-native';

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState('feed');
  const router = useRouter();
  
  // Get current color scheme
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className={`flex-1 ${isDark ? 'bg-neutral-900' : 'bg-white'}`}>
      
      <SearchBar onPress={() => router.push("/search")} placeholder="Search conversations" />
      
      {/* Tab buttons */}
      <View className="flex-row justify-center mb-4 mt-5">
        <Pressable 
          onPress={() => setActiveTab('feed')}
          className="mx-8"
        >
          <Text className={`text-lg text-center font-poppins ${activeTab === 'feed' ? `font-bold ${isDark ? 'text-white' : 'text-black'}` : `${isDark ? 'text-gray-400' : 'text-gray-500'}`}`}>
            Feed
          </Text>
          {/* Border under Feed */}
          <View className={`h-0.5 mt-1 ${activeTab === 'feed' ? 'bg-green-600' : 'bg-transparent'}`} />
        </Pressable>
        
        <Pressable 
          onPress={() => setActiveTab('bowls')}
          className="mx-8"
        >
          <Text className={`text-lg text-center font-poppins ${activeTab === 'bowls' ? `font-bold ${isDark ? 'text-white' : 'text-black'}` : `${isDark ? 'text-gray-400' : 'text-gray-500'}`}`}>
            Bowls
          </Text>
          {/* Border under Bowls */}
          <View className={`h-0.5 mt-1 ${activeTab === 'bowls' ? 'bg-green-600' : 'bg-transparent'}`} />
        </Pressable>
        
        {/* Full width border under both tabs */}
        <View className={`absolute bottom-0 left-0 right-0 h-px ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
      </View>

      {/* Content */}
      {activeTab === 'feed' ? (
        <View>
          <Text className={isDark ? 'text-white' : 'text-black'}>Feed content goes here</Text>
        </View>
      ) : (
        <View>
          <Text className={isDark ? 'text-white' : 'text-black'}>Bowls content goes here</Text>
        </View>
      )}
    </View>
  );
}