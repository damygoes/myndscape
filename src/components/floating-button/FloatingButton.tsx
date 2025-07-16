import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';

interface FloatingButtonProps {
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  label?: string;
  className?: string;
}

export const FloatingButton = ({
  onPress,
  icon = 'add',
  label,
  className,
}: FloatingButtonProps) => {
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

  return (
    <View className={`absolute overflow-hidden rounded-full ${className}`}>
      <BlurView intensity={50} tint={theme} className="rounded-full">
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.8}
          className="flex-row items-center p-4 rounded-full"
          style={{ backgroundColor: colors.primary }}
        >
          <Ionicons name={icon} size={24} color={colors.white} />
          {label && (
            <Text
              className="ml-2 font-semibold"
              style={{ color: colors.textPrimary }}
            >
              {label}
            </Text>
          )}
        </TouchableOpacity>
      </BlurView>
    </View>
  );
};
