import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { LoadingState } from '@/components/LoadingState';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { useJournalEntryById } from '@/features/journal-entries/hooks/useJournalEntryById';
import {
  parseThemes,
  prepareJournalEntry,
} from '@/features/journal-entries/journal-entry-item/utils';
import { MoodBadge } from '@/features/journal-entries/journal-entry-item/components/MoodBadge';
import ThemeBadge from '@/features/journal-entries/journal-entry-item/components/ThemeBadge';
import { APP_COLORS } from '@/constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function EntryDetailsContent({ entryId }: { entryId: string }) {
  const i18n = useAppLocale();
  const insets = useSafeAreaInsets();

  const { data, isLoading, error } = useJournalEntryById(entryId);

  if (isLoading)
    return (
      <LoadingState message={i18n.t('JournalEntryDetails.loadingEntries')} />
    );
  if (error)
    return (
      <ErrorState message={i18n.t('JournalEntryDetails.errorLoadingEntries')} />
    );
  if (!data)
    return <EmptyState message={i18n.t('JournalEntryDetails.noEntryFound')} />;

  const journalEntry = prepareJournalEntry(data);
  const themeList = parseThemes(journalEntry.themes);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          backgroundColor: APP_COLORS['primary-background'],
          paddingTop: insets.top + 32,
        },
      ]}
    >
      {/* Mood + Date */}
      <View style={styles.header}>
        <MoodBadge mood={journalEntry.mood ?? 'neutral'} />
        <Text
          style={[styles.dateText, { color: APP_COLORS['body-text-disabled'] }]}
        >
          {journalEntry.formattedDate}
        </Text>
      </View>
      {/* Content */}
      <View>
        <Text
          style={[styles.label, { color: APP_COLORS['body-text-disabled'] }]}
        >
          {i18n.t('JournalEntryDetails.userInput')}
        </Text>
        <Text style={[styles.content, { color: APP_COLORS['body-text'] }]}>
          {journalEntry.content}
        </Text>
      </View>
      <View style={styles.divider} />

      {/* Summary */}
      {journalEntry.summary && (
        <View>
          <Text style={[styles.subTitle, { color: APP_COLORS['body-text'] }]}>
            {i18n.t('JournalEntryDetails.summary')}
          </Text>
          <Text style={[styles.subText, { color: APP_COLORS['body-text'] }]}>
            {journalEntry.summary}
          </Text>
        </View>
      )}
      <View style={styles.divider} />
      {/* Themes */}
      {journalEntry.hasThemes && (
        <View>
          <Text style={[styles.subTitle, { color: APP_COLORS['body-text'] }]}>
            {i18n.t('JournalEntryDetails.themes')}
          </Text>
          <View style={styles.themeBadgeContainer}>
            {themeList.map((theme, index) => (
              <ThemeBadge key={index} theme={theme} />
            ))}
          </View>
        </View>
      )}
      <View style={styles.divider} />
      {/* Tip */}
      {journalEntry.hasTip && (
        <View>
          <Text style={[styles.subTitle, { color: APP_COLORS['body-text'] }]}>
            {i18n.t('JournalEntryDetails.tip')}
          </Text>
          <View style={styles.tipContainer}>
            <Text style={[styles.subText, { color: APP_COLORS['body-text'] }]}>
              {journalEntry.tip}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    gap: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Manrope',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    fontFamily: 'Manrope',
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Manrope',
  },
  subTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    fontFamily: 'Manrope',
  },
  subText: {
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'Manrope',
  },
  themeBadgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  tipContainer: {
    marginTop: 4,
  },
  divider: { height: 1, backgroundColor: APP_COLORS.grey, marginVertical: 2 },
});
