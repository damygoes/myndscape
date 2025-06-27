import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface FloatingButtonProps {
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  label?: string;
}

export const FloatingButton = ({ onPress, icon = 'add', label }: FloatingButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute flex-row items-center justify-center p-4 bg-blue-500 rounded-full shadow-lg bottom-6 right-6 shadow-black"
      activeOpacity={0.8}
    >
      <Ionicons name={icon} size={24} color="white" />
      {label && <Text className="ml-2 font-bold text-white">{label}</Text>}
    </TouchableOpacity>
  );
};
