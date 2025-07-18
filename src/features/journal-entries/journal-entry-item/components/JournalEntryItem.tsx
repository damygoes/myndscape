import { GlassCard } from '@/components/card/GlassCard';
import { COLORS } from '@/constants/colors';
import { useJournalEntryAnalysisStore } from '@/features/journal-entries/store/useJournalEntryAnalysisStore';
import { JournalEntry } from '@/features/journal-entries/types';
import { router } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  useColorScheme,
  View,
} from 'react-native';
import { formatRelativeDate } from '../utils';
import { JournalEntryAnalysisSection } from './JournalEntryAnalysisSection';
import { MoodBadge } from './MoodBadge';

// Enable LayoutAnimation for Android (can remove if not using toggle anymore)
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  entry: JournalEntry;
}

export const JournalEntryItem = ({ entry }: Props) => {
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

  const { analyzingIds } = useJournalEntryAnalysisStore();
  const isAnalyzing = analyzingIds.includes(entry.id);

  const formattedDate = formatRelativeDate(entry.created_at);

  const goToDetails = () => {
    router.push(`/history/entry-details/${entry.id}`);
  };

  return (
    <TouchableOpacity
      onPress={goToDetails}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={`View details for journal entry from ${formattedDate}`}
      style={{
        backgroundColor: 'transparent',
        borderRadius: 32,
        overflow: 'hidden',
      }}
    >
      <GlassCard style={styles.card}>
        <View style={styles.header}>
          <MoodBadge mood={entry.mood ?? 'neutral'} />
          <Text style={[styles.dateText, { color: colors.textMuted }]}>
            {formattedDate}
          </Text>
        </View>

        {isAnalyzing && (
          <View style={styles.analysisContainer}>
            <ActivityIndicator size="small" color={colors.textMuted} />
            <Text
              style={[styles.analyzingText, { color: colors.textMuted }]}
              accessibilityLiveRegion="polite"
            >
              Analyzing your mood...
            </Text>
          </View>
        )}

        <View style={styles.analysisContainer}>
          <JournalEntryAnalysisSection
            summary={entry.summary}
            themes={entry.themes}
            tip={entry.tip}
          />
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
  },
  contentText: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  analyzingText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  analysisContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
