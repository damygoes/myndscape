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
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Journal entry from ${formattedDate}, mood: ${displayMood}${selected ? ', selected' : ''}`}
      accessibilityHint={
        selectionMode ? 'Tap to select or unselect this entry' : 'Tap to view full entry details'
      }
    >
      <View
        style={[
          styles.cardContainer,
          selected && styles.selectedCard,
          selectionMode && styles.selectionModeCard,
        ]}
      >
        {/* Selection circle on the left side */}
        {selectionMode && (
          <View style={styles.selectionContainer}>
            <View style={[styles.selectionCircle, selected && styles.selectedCircle]}>
              {selected && <IconSymbol name="checkmark" size={14} color={APP_COLORS.white} />}
            </View>
          </View>
        )}

        {/* Main content area */}
        <View style={[styles.contentContainer, selectionMode && styles.contentWithSelection]}>
          {/* Header with mood and date */}
          <View style={styles.header}>
            <MoodBadge mood={displayMood ?? 'neutral'} />
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>

          {/* Loading indicator */}
          {isAnalyzing && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={APP_COLORS.primary} />
              <Text style={styles.loadingText}>{i18n.t('AddJournalEntry.submitting')}</Text>
            </View>
          )}

          {/* Analysis content */}
          <View style={styles.analysisSection}>
            <JournalEntryAnalysisSection
              summary={displaySummary}
              themes={displayThemes}
              tip={displayTip}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableContainer: {
    marginBottom: 16,
    marginHorizontal: 4,
  },
  cardContainer: {
    backgroundColor: APP_COLORS.white,
    borderRadius: 20,
    shadowColor: APP_COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
    minHeight: 120,
  },
  selectedCard: {
    backgroundColor: APP_COLORS.primary + '08',
    borderWidth: 2,
    borderColor: APP_COLORS.primary + '40',
    shadowColor: APP_COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  selectionModeCard: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  selectionContainer: {
    width: 40,
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    backgroundColor: APP_COLORS.offwhite + '40',
  },
  selectionCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: APP_COLORS['body-text-disabled'],
    backgroundColor: APP_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCircle: {
    backgroundColor: APP_COLORS.primary,
    borderColor: APP_COLORS.primary,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  contentWithSelection: {
    paddingLeft: 16,
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
    fontWeight: '500',
    color: APP_COLORS['body-text-disabled'],
    letterSpacing: 0.2,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginBottom: 16,
    gap: 10,
    backgroundColor: APP_COLORS.primary + '08',
    borderRadius: 12,
    marginHorizontal: -4,
  },
  loadingText: {
    fontSize: 14,
    fontFamily: 'Manrope',
    fontWeight: '500',
    color: APP_COLORS.primary,
  },
  analysisSection: {
    flex: 1,
    minHeight: 60,
  },
});
