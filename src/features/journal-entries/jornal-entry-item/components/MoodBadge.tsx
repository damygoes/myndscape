import { moodIcons } from '@/utils/moodUtils';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { getMoodBadgeColor } from '../utils';

interface MoodBadgeProps {
  mood: string;
  displayPrefix?: boolean
}

export const MoodBadge = ({ mood, displayPrefix = true }: MoodBadgeProps) => {
  const badgeColor = getMoodBadgeColor(mood);

  const moodKey = (mood as keyof typeof moodIcons).toLowerCase() as keyof typeof moodIcons;
  const iconName =
    moodIcons[moodKey] ??
    'help-circle-outline';

  return (
    <View
      className={`flex-row items-center gap-2 px-3 py-1 rounded-full ${badgeColor}`}
    >
      {displayPrefix && <View className='flex-row items-center justify-start'>
        <Ionicons name={iconName} size={12} color="black" style={{ marginRight: 4 }} />
        <Text className="text-xs font-semibold">
          Mood:
        </Text>
      </View>}
      <Text className="text-xs font-semibold">
        {mood}
      </Text>
    </View>
  );
};
