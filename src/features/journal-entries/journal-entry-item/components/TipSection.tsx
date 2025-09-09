import { APP_COLORS } from '@/constants/colors';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import React from 'react';
import { Text, View } from 'react-native';
interface Props {
  tip: string | null;
}

export const TipSection = ({ tip }: Props) => {
  const { t } = useAppLocale();
  if (!tip) return null;

  return (
    <View className="flex-col items-start gap-1 pr-4">
      <Text
        className="text-base"
        style={{
          color: APP_COLORS['body-text'],
          fontWeight: '400',
          fontSize: 12,
          fontFamily: 'Manrope',
          textDecorationLine: 'underline',
          textDecorationColor: APP_COLORS['body-text'],
        }}
      >
        {t('Common.tip')}:
      </Text>
      <Text className="text-base" style={{ color: APP_COLORS['body-text'] }}>
        {tip}
      </Text>
    </View>
  );
};
