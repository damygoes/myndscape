import { APP_COLORS } from '@/constants/colors';
import { WellnessScoreRing } from '@/features/wellness-score/components/WellnessScoreRing';
import { useWellnessScore } from '@/features/wellness-score/hooks/useWellnessScore';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { Text, View } from 'react-native';

export function WellnessScoreCard() {
  const i18n = useAppLocale();
  const { data: wellnessData, isLoading: isLoadingWellness } =
    useWellnessScore();

  if (isLoadingWellness) return null;

  const score = wellnessData?.score ?? 0;

  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        alignItems: 'center',
        gap: 8,
        backgroundColor: APP_COLORS['primary-subtle'],
      }}
    >
      <View style={{ flex: 1, justifyContent: 'center', flexShrink: 1 }}>
        <Text
          style={{
            fontSize: 16,
            marginBottom: 12,
            flexShrink: 1,
            textAlign: 'left',
            fontFamily: 'Manrope',
            fontWeight: '600',
            color: APP_COLORS.primary,
          }}
          numberOfLines={3}
        >
          {i18n.t('WellnessScoreCard.title')}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '400',
            color: APP_COLORS['body-text-disabled'],
            flexShrink: 1,
            fontFamily: 'Manrope',
            maxWidth: '90%',
          }}
        >
          {i18n.t('WellnessScoreCard.description')}
        </Text>
      </View>
      <View style={{ width: 80, height: 80 }}>
        <WellnessScoreRing score={score} />
      </View>
    </View>
  );
}
