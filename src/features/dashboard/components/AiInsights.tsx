import { APP_COLORS } from '@/constants/colors';
import { useWellnessScore } from '@/features/wellness-score/hooks/useWellnessScore';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

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
    moodMessage = 'Your recent reflections show a very positive tone 🎉';
  else if (score >= 50)
    moodMessage =
      "You're doing well — keep journaling to strengthen your streak!";
  else
    moodMessage =
      'Try writing today to boost your wellness score and build consistency.';

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
