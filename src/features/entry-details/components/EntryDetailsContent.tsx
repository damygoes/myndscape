import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { LoadingState } from '@/components/LoadingState';
import { APP_COLORS } from '@/constants/colors';
import { useJournalEntryById } from '@/features/journal-entries/hooks/useJournalEntryById';
import { MoodBadge } from '@/features/journal-entries/journal-entry-item/components/MoodBadge';
import ThemeBadge from '@/features/journal-entries/journal-entry-item/components/ThemeBadge';
import {
  parseThemes,
  prepareJournalEntry,
} from '@/features/journal-entries/journal-entry-item/utils';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function EntryDetailsContent({ entryId }: { entryId: string }) {
  const i18n = useAppLocale();
  const insets = useSafeAreaInsets();

  const { data, isLoading, error } = useJournalEntryById(entryId);

  if (isLoading) return <LoadingState message={i18n.t('JournalEntryDetails.loadingEntries')} />;
  if (error) return <ErrorState message={i18n.t('JournalEntryDetails.errorLoadingEntries')} />;
  if (!data) return <EmptyState message={i18n.t('JournalEntryDetails.noEntryFound')} />;

  const journalEntry = prepareJournalEntry(data);
  const themeList = parseThemes(journalEntry.themes);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          backgroundColor: APP_COLORS['primary-background'],
          paddingTop: insets.top + 24,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <MoodBadge mood={journalEntry.mood ?? 'neutral'} />
        <Text style={[styles.dateText, { color: APP_COLORS['body-text-disabled'] }]}>
          {journalEntry.formattedDate}
        </Text>
      </View>

      <View style={styles.contentSection}>
        <Text style={[styles.sectionLabel, { color: APP_COLORS['body-text-disabled'] }]}>
          {i18n.t('JournalEntryDetails.userInput')}
        </Text>
        <Text style={[styles.mainContent, { color: APP_COLORS['body-text'] }]}>
          {journalEntry.content}
        </Text>
      </View>

      {journalEntry.summary && (
        <>
          <View style={styles.sectionDivider} />
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: APP_COLORS['body-text'] }]}>
              {i18n.t('JournalEntryDetails.summary')}
            </Text>
            <Text style={[styles.sectionText, { color: APP_COLORS['body-text'] }]}>
              {journalEntry.summary}
            </Text>
          </View>
        </>
      )}

      {journalEntry.hasThemes && (
        <>
          <View style={styles.sectionDivider} />
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: APP_COLORS['body-text'] }]}>
              {i18n.t('JournalEntryDetails.themes')}
            </Text>
            <View style={styles.themeBadgeContainer}>
              {themeList.map((theme, index) => (
                <ThemeBadge key={index} theme={theme} />
              ))}
            </View>
          </View>
        </>
      )}

      {journalEntry.hasTip && (
        <>
          <View style={styles.sectionDivider} />
          <View style={[styles.tipSection, { backgroundColor: APP_COLORS['primary-subtle'] }]}>
            <Text style={[styles.tipTitle, { color: APP_COLORS.primary }]}>
              💡 {i18n.t('JournalEntryDetails.tip')}
            </Text>
            <Text style={[styles.tipText, { color: APP_COLORS['body-text'] }]}>
              {journalEntry.tip}
            </Text>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Manrope',
  },
  contentSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
    fontFamily: 'Manrope',
  },
  mainContent: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 28,
    fontFamily: 'Manrope',
  },
  sectionDivider: {
    height: 1,
    backgroundColor: APP_COLORS['background-stroke'],
    marginVertical: 24,
    opacity: 0.3,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    fontFamily: 'Manrope',
    letterSpacing: 0.2,
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: 'Manrope',
  },
  tipSection: {
    borderRadius: 12,
    padding: 20,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: APP_COLORS.primary,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Manrope',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  tipText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: 'Manrope',
  },
  themeBadgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
});
