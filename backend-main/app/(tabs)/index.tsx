import Headers from '@/components/Headers';
import SearchBar from '@/components/SearchBar';
import { useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState<'feed' | 'bowls'>('feed');

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900">
      
      <Headers />
      <SearchBar placeholder="Search conversations" />
      

      {/* Tab buttons */}
      <View className="flex-row justify-around mb-4 mt-5">
        <Pressable onPress={() => setActiveTab('feed')}>
          <Text className={`text-lg ${activeTab === 'feed' ? 'text-green-600 font-bold' : 'text-gray-500 dark:text-gray-400'}`}>
            Feed
          </Text>
        </Pressable>
        <Pressable onPress={() => setActiveTab('bowls')}>
          <Text className={`text-lg ${activeTab === 'bowls' ? 'text-green-600 font-bold' : 'text-gray-500 dark:text-gray-400'}`}>
            Bowls
          </Text>
        </Pressable>
      </View>

      {/* Content */}
      {activeTab === 'feed' ? (
        <View>
          <Text className="text-black dark:text-white">Feed content goes here</Text>
        </View>
      ) : (
        <View>
          <Text className="text-black dark:text-white">Bowls content goes here</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
