import { APP_COLORS } from '@/constants/colors';
import React from 'react';
import { Text, View } from 'react-native';

interface MoodBadgeProps {
  mood: string;
}

export const MoodBadge = ({ mood }: MoodBadgeProps) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 9999,
        backgroundColor: APP_COLORS['primary-subtle'],
      }}
    >
      <Text
        style={{
          fontFamily: 'Manrope',
          fontWeight: '300',
          color: APP_COLORS['body-text'],
          fontSize: 12,
        }}
      >
        Mood:
      </Text>
      <Text
        style={{
          fontFamily: 'Manrope',
          fontWeight: '400',
          color: APP_COLORS.primary,
          fontSize: 12,
        }}
      >
        {mood}
      </Text>
    </View>
  );
};
