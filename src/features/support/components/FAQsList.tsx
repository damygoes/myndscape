import { APP_COLORS } from '@/constants/colors';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function FAQsList() {
  const insets = useSafeAreaInsets();
  const { t } = useAppLocale();

  const faqs = [
    { q: t('FAQs.questions.score.q'), a: t('FAQs.questions.score.a') },
    { q: t('FAQs.questions.privacy.q'), a: t('FAQs.questions.privacy.a') },
    { q: t('FAQs.questions.missDay.q'), a: t('FAQs.questions.missDay.a') },
    { q: t('FAQs.questions.export.q'), a: t('FAQs.questions.export.a') },
    { q: t('FAQs.questions.therapy.q'), a: t('FAQs.questions.therapy.a') },
    { q: t('FAQs.questions.offline.q'), a: t('FAQs.questions.offline.a') },
    { q: t('FAQs.questions.subscription.q'), a: t('FAQs.questions.subscription.a') },
    { q: t('FAQs.questions.resetPassword.q'), a: t('FAQs.questions.resetPassword.a') },
    { q: t('FAQs.questions.security.q'), a: t('FAQs.questions.security.a') },
  ];

  const renderItem = ({ item }: { item: (typeof faqs)[0] }) => (
    <View style={styles.faqItem}>
      <Text style={styles.question}>{item.q}</Text>
      <Text style={styles.answer}>{item.a}</Text>
    </View>
  );

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={faqs}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={[
        styles.container,
        {
          backgroundColor: APP_COLORS['primary-background'],
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 24,
        },
      ]}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  faqItem: {
    paddingVertical: 16,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: APP_COLORS['body-text-disabled'] + '30',
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: APP_COLORS['body-text'],
    fontFamily: 'Manrope',
    marginBottom: 8,
  },
  answer: {
    fontSize: 14,
    fontWeight: '400',
    color: APP_COLORS['body-text-disabled'],
    fontFamily: 'Manrope',
    lineHeight: 20,
  },
});
