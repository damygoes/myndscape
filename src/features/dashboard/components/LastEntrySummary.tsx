import { IconSymbol } from '@/components/ui/IconSymbol.ios';
import { APP_COLORS } from '@/constants/colors';
import { DashboardSection } from '@/features/dashboard/components/DashboardSection';
import { useCurrentUserJournalEntries } from '@/features/journal-entries/hooks/useCurrentUserJournalEntries';
import { MoodBadge } from '@/features/journal-entries/journal-entry-item/components/MoodBadge';
import { prepareJournalEntry } from '@/features/journal-entries/journal-entry-item/utils';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const LastEntrySummary = () => {
  const { data: entries = [], isLoading } = useCurrentUserJournalEntries();

  if (isLoading || entries.length === 0) return null;

  const latestEntry = prepareJournalEntry(entries[0]);

  return (
    <DashboardSection>
      <View style={styles.wrapper}>
        <Text style={[styles.title, { color: APP_COLORS['body-text'] }]}>
          Your Last Reflection
        </Text>

        {latestEntry.hasSummary && (
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionLabel,
                { color: APP_COLORS['body-text-disabled'] },
              ]}
            >
              Summary
            </Text>
            <Text
              style={[styles.sectionText, { color: APP_COLORS['body-text'] }]}
            >
              {latestEntry.summary}
            </Text>
          </View>
        )}

        {latestEntry.hasTip && (
          <View style={styles.section}>
            <View style={styles.tipHeader}>
              <IconSymbol name="tip-bulb" color={APP_COLORS.success} />
              <Text
                style={[
                  styles.sectionLabel,
                  { color: APP_COLORS['body-text-disabled'] },
                ]}
              >
                Tip
              </Text>
            </View>
            <Text style={[styles.tipText, { color: APP_COLORS['body-text'] }]}>
              {latestEntry.tip}
            </Text>
          </View>
        )}

        <View style={styles.moodDateRow}>
          <MoodBadge mood={latestEntry.mood ?? 'neutral'} />
          <Text
            style={[
              styles.dateText,
              { color: APP_COLORS['body-text-disabled'] },
            ]}
          >
            {latestEntry.formattedDate}
          </Text>
        </View>
      </View>
    </DashboardSection>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Manrope',
  },
  section: {
    gap: 8,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Manrope',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Manrope',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    fontFamily: 'Manrope',
  },
  tipText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Manrope',
  },
  moodDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Manrope',
  },
});
