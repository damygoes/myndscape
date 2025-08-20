import { COLORS } from '@/constants/colors';
import { DashboardSection } from '@/features/dashboard/components/DashboardSection';
import { useCurrentUserJournalEntries } from '@/features/journal-entries/hooks/useCurrentUserJournalEntries';
import { MoodBadge } from '@/features/journal-entries/journal-entry-item/components/MoodBadge';
import { prepareJournalEntry } from '@/features/journal-entries/journal-entry-item/utils';
import { Plan } from '@/features/paywall/types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';

export const LastEntrySummary = () => {
  const { data: entries = [], isLoading } = useCurrentUserJournalEntries();
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

  if (isLoading || entries.length === 0) return null;

  const latestEntry = prepareJournalEntry(entries[0]);

  return (
    <DashboardSection>
      <View style={styles.wrapper}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Your Last Reflection
        </Text>

        {latestEntry.hasSummary && (
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
              Summary
            </Text>
            <Text style={[styles.sectionText, { color: colors.textPrimary }]}>
              {latestEntry.summary}
            </Text>
          </View>
        )}

        {latestEntry.hasTip && (
          <View style={styles.section}>
            <View style={styles.tipHeader}>
              <Ionicons
                name="bulb-outline"
                size={18}
                color={colors.textMuted}
              />
              <Text
                style={[styles.sectionLabel, { color: colors.textMuted }]}
              >
                Tip
              </Text>
            </View>
            <Text style={[styles.tipText, { color: colors.textPrimary }]}>
              {latestEntry.tip}
            </Text>
          </View>
        )}

        <View style={styles.moodDateRow}>
          <MoodBadge mood={latestEntry.mood ?? 'neutral'} />
          <Text style={[styles.dateText, { color: colors.textMuted }]}>
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
  },
  section: {
    gap: 8,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 22,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tipText: {
    fontSize: 16,
    lineHeight: 22,
  },
  moodDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
  },
});
