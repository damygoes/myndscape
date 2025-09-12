import { APP_COLORS } from '@/constants/colors';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { useRef } from 'react';
import { Animated, View } from 'react-native';
import { FAQsList } from '../components/FAQsList';
import { SupportHeader } from '../components/SupportHeader';

export function FAQsScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { t } = useAppLocale();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: APP_COLORS['primary-background'],
      }}
    >
      {/* Fixed header that animates with scroll */}
      <SupportHeader scrollY={scrollY} title={t('Support.FAQs.modalTitle')} />

      {/* Scrollable content */}
      <FAQsList />
    </View>
  );
}
