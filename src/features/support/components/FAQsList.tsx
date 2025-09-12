import { APP_COLORS } from '@/constants/colors';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  FlatList,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export function FAQsList() {
  const insets = useSafeAreaInsets();
  const { t } = useAppLocale();

  const faqs = [
    { id: 'score', q: t('FAQs.questions.score.q'), a: t('FAQs.questions.score.a') },
    { id: 'privacy', q: t('FAQs.questions.privacy.q'), a: t('FAQs.questions.privacy.a') },
    { id: 'missDay', q: t('FAQs.questions.missDay.q'), a: t('FAQs.questions.missDay.a') },
    { id: 'export', q: t('FAQs.questions.export.q'), a: t('FAQs.questions.export.a') },
    { id: 'therapy', q: t('FAQs.questions.therapy.q'), a: t('FAQs.questions.therapy.a') },
    // { id: 'offline', q: t('FAQs.questions.offline.q'), a: t('FAQs.questions.offline.a') }, //TODO???
    {
      id: 'subscription',
      q: t('FAQs.questions.subscription.q'),
      a: t('FAQs.questions.subscription.a'),
    },
    // { id: 'resetPassword', q: t('FAQs.questions.resetPassword.q'), a: t('FAQs.questions.resetPassword.a') }, //TODO???
    { id: 'security', q: t('FAQs.questions.security.q'), a: t('FAQs.questions.security.a') },
  ];

  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(expanded === id ? null : id);
  };

  const renderItem = ({ item }: { item: (typeof faqs)[0] }) => (
    <View style={styles.faqItem}>
      <Pressable style={styles.header} onPress={() => toggleExpand(item.id)}>
        <Text style={styles.question}>{item.q}</Text>
        <Ionicons
          name={expanded === item.id ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={APP_COLORS['body-text-disabled']}
        />
      </Pressable>
      {expanded === item.id && <Text style={styles.answer}>{item.a}</Text>}
    </View>
  );

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={faqs}
      keyExtractor={(item) => item.id}
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
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: APP_COLORS['body-text-disabled'] + '30',
  },
  question: {
    fontSize: 16,
    fontWeight: '400',
    color: APP_COLORS['body-text'],
    fontFamily: 'Manrope',
    flex: 1,
    marginRight: 8,
  },
  answer: {
    fontSize: 14,
    fontWeight: '400',
    color: APP_COLORS['body-text-disabled'],
    fontFamily: 'Manrope',
    lineHeight: 20,
    marginTop: 8,
  },
});
