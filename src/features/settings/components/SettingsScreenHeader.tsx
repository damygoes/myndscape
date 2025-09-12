import { AnimatedScreenHeader } from '@/components/screen-header/AnimatedScreenHeader';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import React from 'react';
import { Animated } from 'react-native';

type Props = {
  scrollY?: Animated.Value;
};

export function SettingsScreenHeader({ scrollY }: Props) {
  const { t } = useAppLocale();

  return (
    <AnimatedScreenHeader
      title={t('SettingsScreenHeader.title')}
      subtitle={t('SettingsScreenHeader.description')}
      scrollY={scrollY}
    />
  );
}
