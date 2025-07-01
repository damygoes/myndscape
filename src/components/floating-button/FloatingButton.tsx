import { colors } from '@/utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface FloatingButtonProps {
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  label?: string;
}

export const FloatingButton = ({ onPress, icon = 'add', label }: FloatingButtonProps) => {
  return (
    <View 
      className="absolute overflow-hidden rounded-full shadow-md bottom-6 right-6"
      style={{ 
        shadowColor: colors.shadow,
        shadowOpacity: 0.3,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 }
      }}
    >
      <BlurView intensity={50} tint="light" className="rounded-full">
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.8}
          className="flex-row items-center p-4 rounded-full"
          style={{ backgroundColor: `${colors.primary}CC` }} // 80% opacity
        >
          <Ionicons name={icon} size={24} color="#FFFFFF" />
          {label && (
            <Text 
              className="ml-2 font-semibold"
              style={{ color: '#FFFFFF' }}
            >
              {label}
            </Text>
          )}
        </TouchableOpacity>
      </BlurView>
    </View>
  );
};