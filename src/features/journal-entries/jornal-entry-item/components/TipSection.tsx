import { colors } from '@/utils/colors';
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
      <View className="flex flex-row items-center justify-center">
        <Ionicons name="bulb-outline" size={18} color={colors.textPrimary} />
      </View>
      <Text className="text-base" style={{color: colors.success}}>
        {tip}
      </Text>
    </View>
  );
};
