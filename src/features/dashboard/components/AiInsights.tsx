import { APP_COLORS } from '@/constants/colors';
import { useWellnessScore } from '@/features/wellness-score/hooks/useWellnessScore';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export function AiInsights() {
  const i18n = useAppLocale();
  const { data } = useWellnessScore();

  if (!data) return null;

  const { currentStreak, longestStreak, score } = data;
  const streakDifference = longestStreak - currentStreak;

  const streakMessage =
    currentStreak >= longestStreak
      ? i18n.t('AiInsights.streak.longest')
      : i18n.t('AiInsights.streak.short', { count: streakDifference });

  let moodMessage = '';
  if (score >= 80) moodMessage = i18n.t('AiInsights.mood.positive');
  else if (score >= 50) moodMessage = i18n.t('AiInsights.mood.neutral');
  else moodMessage = i18n.t('AiInsights.mood.negative');

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
          {i18n.t('AiInsights.title')}
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
