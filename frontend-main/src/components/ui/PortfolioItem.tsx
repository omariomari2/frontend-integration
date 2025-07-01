import React from 'react';
import { View, Text, Image } from 'react-native';
import { Card } from './Card';

interface PortfolioItemProps {
  title: string;
  description?: string;
  imageUrl?: string;
  icon?: React.ReactNode;
}

export const PortfolioItem: React.FC<PortfolioItemProps> = ({ title, description, imageUrl, icon }) => {
  return (
    <Card className="p-4 md:p-6">
      <View className="flex-row items-center">
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} className="w-12 h-12 rounded-lg mr-4" />
        ) : icon ? (
          <View className="w-12 h-12 justify-center items-center mr-4">{icon}</View>
        ) : null}
        <View className="flex-1">
          <Text className="text-base md:text-lg font-semibold mb-1">{title}</Text>
          {description && <Text className="text-sm md:text-base text-gray-500">{description}</Text>}
        </View>
      </View>
    </Card>
  );
}; 