import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  tip: string | null;
}

export const TipSection = ({ tip }: Props) => {
  if (!tip) return null;

  return (
    <View className="flex-row items-start gap-2 pr-4">
      <Ionicons name="bulb-outline" size={18} color="#facc15" />
      <Text className="text-sm text-yellow-700 dark:text-yellow-400">
        {tip}
      </Text>
    </View>
  );
};
