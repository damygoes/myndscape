import { colors } from '@/utils/colors';
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
      className={`flex-row items-center gap-1 p-2 rounded-full`}
      style={{
        backgroundColor: badgeColor
      }}
    >
      {displayPrefix && <View className='flex-row items-center justify-start'>
        <Ionicons name={iconName} size={12} color={colors.background} style={{ marginRight: 4 }} />
        <Text className="text-sm">
          Mood:
        </Text>
      </View>}
      <Text className="text-sm">
        {mood}
      </Text>
    </View>
  );
};
