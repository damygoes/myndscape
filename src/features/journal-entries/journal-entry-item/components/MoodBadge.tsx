import { COLORS } from '@/constants/colors';
import { moodIcons } from '@/utils/moodUtils';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { getMoodBadgeColor } from '../utils';

interface MoodBadgeProps {
  mood: string;
  displayPrefix?: boolean;
}

export const MoodBadge = ({ mood, displayPrefix = true }: MoodBadgeProps) => {
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

  const badgeColor = getMoodBadgeColor(mood);
  const moodKey = (
    mood as keyof typeof moodIcons
  ).toLowerCase() as keyof typeof moodIcons;
  const iconName = moodIcons[moodKey] ?? 'help-circle-outline';

  return (
    <View
      className="flex-row items-center gap-1 px-2 py-1 rounded-full"
      style={{
        backgroundColor: badgeColor,
      }}
    >
      {displayPrefix && (
        <View className="flex-row items-center justify-start">
          <Ionicons
            name={iconName}
            size={14}
            color={colors.white}
            style={{ marginRight: 4 }}
          />
          <Text className="text-sm" style={styles.text}>
            Mood:
          </Text>
        </View>
      )}
      <Text className="text-sm" style={styles.text}>
        {mood}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: { color: COLORS.dark.white, fontWeight: '500', fontSize: 14 },
});
