import { GlassCard } from '@/components/card/GlassCard';
import { COLORS } from '@/constants/colors';
import { useJournalEntryAnalysisStore } from '@/features/journal-entries/store/useJournalEntryAnalysisStore';
import { JournalEntry } from '@/features/journal-entries/types';
import { useUserSettingsContext } from '@/features/user/contexts/UserSettingsContext';
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
  const { data } = useUserSettingsContext();
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

  const userLanguage = data?.language || 'en';

  const displayMood = entry.localized?.[userLanguage]?.mood || entry.mood;
  const displayThemes = entry.localized?.[userLanguage]?.themes || entry.themes;
  const displaySummary =
    entry.localized?.[userLanguage]?.summary || entry.summary;
  const displayTip = entry.localized?.[userLanguage]?.tip || entry.tip;

  const { analyzingIds } = useJournalEntryAnalysisStore();
  const isAnalyzing = analyzingIds.includes(entry.id);

  const formattedDate = formatRelativeDate(entry.created_at);

  const goToDetails = () => {
    router.push(`/history/entry-details/${entry.id}`);
  };

  return (
    <TouchableOpacity onPress={goToDetails}>
      <GlassCard>
        <View style={styles.header}>
          <MoodBadge mood={displayMood ?? 'neutral'} />
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
            summary={displaySummary}
            themes={displayThemes}
            tip={displayTip}
          />
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    alignItems: 'center',
    fontFamily: 'Manrope',
  },
  dateText: {
    fontSize: 12,
    fontFamily: 'Manrope',
    fontWeight: '400',
  },
  contentText: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
    fontFamily: 'Manrope',
  },
  analyzingText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 8,
    fontFamily: 'Manrope',
  },
  analysisContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    fontFamily: 'Manrope',
  },
});
