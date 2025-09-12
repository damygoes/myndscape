import { APP_COLORS } from '@/constants/colors';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import {
  Animated,
  LayoutAnimation,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SupportHeader } from '../components/SupportHeader';

export function LegalScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { t } = useAppLocale();
  const insets = useSafeAreaInsets();

  const sections = [
    {
      id: 'privacy',
      title: t('Legal.privacy.title'),
      text: t('Legal.privacy.text'),
    },
    {
      id: 'disclaimer',
      title: t('Legal.disclaimer.title'),
      text: t('Legal.disclaimer.text'),
    },
    {
      id: 'terms',
      title: t('Legal.terms.title'),
      text: t('Legal.terms.text'),
    },
  ];

  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(expanded === id ? null : id);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: APP_COLORS['primary-background'],
      }}
    >
      {/* Fixed header that animates with scroll */}
      <SupportHeader scrollY={scrollY} title={t('Support.Legal.title')} />

      <ScrollView
        contentContainerStyle={[
          styles.container,
          {
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 24,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {sections.map((section) => (
          <View key={section.id} style={styles.section}>
            <Pressable onPress={() => toggleExpand(section.id)} style={styles.header}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Ionicons
                name={expanded === section.id ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={APP_COLORS['body-text-disabled']}
              />
            </Pressable>

            {expanded === section.id && <Text style={styles.sectionText}>{section.text}</Text>}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    backgroundColor: APP_COLORS['primary-background'],
  },
  section: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: APP_COLORS['body-text-disabled'] + '30',
    paddingBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: APP_COLORS['body-text'],
    fontFamily: 'Manrope',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    fontWeight: '400',
    color: APP_COLORS['body-text-disabled'],
    fontFamily: 'Manrope',
    lineHeight: 20,
    marginTop: 4,
  },
});
