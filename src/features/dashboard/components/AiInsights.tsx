import { View, Text } from 'react-native';
import { APP_COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useWellnessScore } from '@/features/wellness-score/hooks/useWellnessScore';

export function AiInsights() {
  const { data } = useWellnessScore();

  if (!data) return null;

  const { currentStreak, longestStreak, score } = data;
  const streakDifference = longestStreak - currentStreak;

  const streakMessage =
    currentStreak >= longestStreak
      ? "You're on your longest streak yet! 🔥"
      : `You're ${streakDifference} day${streakDifference > 1 ? 's' : ''} away from your longest streak. Keep going!`;

  let moodMessage = '';
  if (score >= 80)
    moodMessage = "You've been journaling with a positive tone this week 🎉";
  else if (score >= 50)
    moodMessage = "You're doing well, try to add a few more reflections!";
  else
    moodMessage =
      'Try journaling your feelings today to keep track of your mood.';

  return (
    <View
      style={{
        padding: 16,
        backgroundColor: APP_COLORS.offwhite,
        borderRadius: 16,
        marginHorizontal: 16,
        marginBottom: 12,
      }}
    >
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}
      >
        <Ionicons
          name="sparkles-outline"
          size={20}
          color={APP_COLORS.primary}
          style={{ marginRight: 8 }}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: APP_COLORS['body-text'],
            fontFamily: 'Manrope',
          }}
        >
          AI Insights
        </Text>
      </View>
      <Text
        style={{
          color: APP_COLORS['body-text-disabled'],
          fontSize: 14,
          marginBottom: 8,
          fontFamily: 'Manrope',
        }}
      >
        {moodMessage}
      </Text>
      <Text
        style={{
          color: APP_COLORS['body-text-disabled'],
          fontSize: 14,
          fontFamily: 'Manrope',
        }}
      >
        {streakMessage}
      </Text>
    </View>
  );
}
