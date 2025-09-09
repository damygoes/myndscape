import { useJournalEntryAnalysisStore } from '@/features/journal-entries/store/useJournalEntryAnalysisStore';
import type { JournalEntry } from '@/features/journal-entries/types';
import { useUserSettingsContext } from '@/features/user/contexts/UserSettingsContext';
import { router } from 'expo-router';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { JournalEntryAnalysisSection } from './JournalEntryAnalysisSection';
import { MoodBadge } from './MoodBadge';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { formatRelativeDate } from '../utils';
import { APP_COLORS } from '@/constants/colors';

// Enable LayoutAnimation for Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  entry: JournalEntry;
  selected?: boolean;
  onSelect?: () => void;
}

export const JournalEntryItem = ({
  entry,
  selected = false,
  onSelect,
}: Props) => {
  const i18n = useAppLocale();
  const { data } = useUserSettingsContext();

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

  const handlePress = () => {
    if (onSelect) {
      onSelect();
    } else {
      goToDetails();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.touchableContainer}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`Journal entry from ${formattedDate}, mood: ${displayMood}${selected ? ', selected' : ''}`}
      accessibilityHint={
        onSelect ? 'Tap to select this entry' : 'Tap to view full entry details'
      }
    >
      <View style={[styles.cardContainer, selected && styles.selectedCard]}>
        <View style={styles.header}>
          <MoodBadge mood={displayMood ?? 'neutral'} />
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>

        {isAnalyzing && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={APP_COLORS.primary} />
            <Text style={styles.loadingText}>
              {i18n.t('AddJournalEntry.submitting')}
            </Text>
          </View>
        )}

        <View style={styles.contentSection}>
          <JournalEntryAnalysisSection
            summary={displaySummary}
            themes={displayThemes}
            tip={displayTip}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableContainer: {
    marginBottom: 12,
  },
  cardContainer: {
    backgroundColor: APP_COLORS.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: APP_COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: APP_COLORS.primary + '0A', // Slightly more visible tint
    shadowColor: APP_COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    transform: [{ scale: 1.01 }], // Subtle scale for selection feedback
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 13,
    fontFamily: 'Manrope',
    fontWeight: '400',
    color: APP_COLORS['body-text-disabled'],
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginBottom: 12,
    gap: 8,
  },
  loadingText: {
    fontSize: 13,
    fontFamily: 'Manrope',
    fontWeight: '400',
    color: APP_COLORS.primary,
  },
  contentSection: {
    minHeight: 40,
  },
});
