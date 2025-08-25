import { View, Text } from 'react-native';
import { WellnessScoreRing } from '@/features/wellness-score/components/WellnessScoreRing';
import { useWellnessScore } from '@/features/wellness-score/hooks/useWellnessScore';
import { APP_COLORS } from '@/constants/colors';

export function WellnessScoreCard() {
  const { data: wellnessData, isLoading: isLoadingWellness } =
    useWellnessScore();

  if (isLoadingWellness) return null;

  const score = wellnessData?.score ?? 0;
  const currentStreak = wellnessData?.currentStreak ?? 0;

  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 24,
        borderRadius: 24,
        marginBottom: 16,
        alignItems: 'center',
        minHeight: 200,
        gap: 24,
        backgroundColor: APP_COLORS.grey,
      }}
    >
      {/* Left Column: Wellness Ring */}
      <View
        style={{
          width: 150,
          height: 150,
        }}
      >
        <WellnessScoreRing score={score} />
      </View>

      {/* Right Column: Text */}
      <View
        style={{
          flex: 1,
          marginLeft: 16,
          justifyContent: 'center',
          flexShrink: 1,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            marginBottom: 12,
            flexShrink: 1,
            textAlign: 'left',
            fontFamily: 'Manrope',
          }}
          numberOfLines={3}
        >
          Your wellness score today is{' '}
          <Text style={{ fontWeight: '700' }}>{score}%</Text>.
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: APP_COLORS['body-text-disabled'],
            flexShrink: 1,
            fontFamily: 'Manrope',
          }}
        >
          Your score is based on your journaling consistency, mood, tone, and streaks.
          {score >= 70
            ? " You're doing great this week 🎉"
            : ' Keep writing daily entries to boost your score.'}
        </Text>
      </View>
    </View>
  );
}
