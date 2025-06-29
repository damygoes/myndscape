import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { getMoodBadgeColor, moodIcons } from '../utils';

interface Props {
  mood: string;
}

export const MoodBadge = ({ mood }: Props) => {
  const badgeColor = getMoodBadgeColor(mood);
  const iconName = moodIcons[mood.toLowerCase()] ?? 'help-circle-outline';

  return (
    <View
      className={`flex-row items-center px-3 py-1 rounded-full ${badgeColor}`}
    >
      <Ionicons name={iconName} size={14} color="black" style={{ marginRight: 6 }} />
      <Text className="text-xs font-semibold">
        Mood: {mood}
      </Text>
    </View>
  );
};
