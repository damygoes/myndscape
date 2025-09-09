import { IconSymbol } from '@/components/ui/IconSymbol.ios';
import { APP_COLORS } from '@/constants/colors';
import { useJournalEntryAnalysisStore } from '@/features/journal-entries/store/useJournalEntryAnalysisStore';
import type { JournalEntry } from '@/features/journal-entries/types';
import { useUserSettingsContext } from '@/features/user/contexts/UserSettingsContext';
import { useAppLocale } from '@/services/i18n/useAppLocale';
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
import { useEntrySelectionStore } from '../../store/useEntrySelectionStore';
import { formatRelativeDate } from '../utils';
import { JournalEntryAnalysisSection } from './JournalEntryAnalysisSection';
import { MoodBadge } from './MoodBadge';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  entry: JournalEntry;
}

export const JournalEntryItem = ({ entry }: Props) => {
  const i18n = useAppLocale();
  const { data } = useUserSettingsContext();
  const { selectionMode, toggleEntry, isSelected } = useEntrySelectionStore();

  const userLanguage = data?.language || 'en';

  const displayMood = entry.localized?.[userLanguage]?.mood || entry.mood;
  const displayThemes = entry.localized?.[userLanguage]?.themes || entry.themes;
  const displaySummary = entry.localized?.[userLanguage]?.summary || entry.summary;
  const displayTip = entry.localized?.[userLanguage]?.tip || entry.tip;

  const { analyzingIds } = useJournalEntryAnalysisStore();
  const isAnalyzing = analyzingIds.includes(entry.id);

  const formattedDate = formatRelativeDate(entry.created_at);

  const goToDetails = () => {
    router.push(`/history/entry-details/${entry.id}`);
  };

  const handlePress = () => {
    if (selectionMode) {
      toggleEntry(entry); // select/unselect
    } else {
      goToDetails(); // normal navigation
    }
  };

  const selected = isSelected(entry);

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.touchableContainer}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`Journal entry from ${formattedDate}, mood: ${displayMood}${selected ? ', selected' : ''}`}
      accessibilityHint={
        selectionMode ? 'Tap to select or unselect this entry' : 'Tap to view full entry details'
      }
    >
      <View style={[styles.cardContainer, selected && styles.selectedCard]}>
        {selected && (
          <View style={styles.checkContainer}>
            <IconSymbol name="checkmark" size={16} color={APP_COLORS.white} />
          </View>
        )}
        <View style={styles.header}>
          <MoodBadge mood={displayMood ?? 'neutral'} />
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>

        {isAnalyzing && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={APP_COLORS.primary} />
            <Text style={styles.loadingText}>{i18n.t('AddJournalEntry.submitting')}</Text>
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: APP_COLORS.primary + '0A',
    shadowColor: APP_COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    transform: [{ scale: 1.01 }],
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
  checkContainer: {
    position: 'absolute',
    top: -12,
    left: -8,
    zIndex: 1,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: APP_COLORS.offwhite,
    backgroundColor: APP_COLORS.success + 'E6',
  },
});
