import { useJournalEntryAnalysisStore } from "@/features/journal-entries/store/useJournalEntryAnalysisStore"
import type { JournalEntry } from "@/features/journal-entries/types"
import { useUserSettingsContext } from "@/features/user/contexts/UserSettingsContext"
import { router } from "expo-router"
import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from "react-native"
import { JournalEntryAnalysisSection } from "./JournalEntryAnalysisSection"
import { MoodBadge } from "./MoodBadge"
import { useAppLocale } from "@/services/i18n/useAppLocale"
import { formatRelativeDate } from "../utils"
import { APP_COLORS } from "@/constants/colors"
import { IconSymbol } from "@/components/ui/IconSymbol.ios"

// Enable LayoutAnimation for Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

interface Props {
  entry: JournalEntry
}

export const JournalEntryItem = ({ entry }: Props) => {
  const i18n = useAppLocale()
  const { data } = useUserSettingsContext()

  const userLanguage = data?.language || "en"

  const displayMood = entry.localized?.[userLanguage]?.mood || entry.mood
  const displayThemes = entry.localized?.[userLanguage]?.themes || entry.themes
  const displaySummary = entry.localized?.[userLanguage]?.summary || entry.summary
  const displayTip = entry.localized?.[userLanguage]?.tip || entry.tip

  const { analyzingIds } = useJournalEntryAnalysisStore()
  const isAnalyzing = analyzingIds.includes(entry.id)

  const formattedDate = formatRelativeDate(entry.created_at)

  const goToDetails = () => {
    router.push(`/history/entry-details/${entry.id}`)
  }

  return (
    <TouchableOpacity
      onPress={goToDetails}
      style={styles.touchableContainer}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Journal entry from ${formattedDate}, mood: ${displayMood}`}
      accessibilityHint="Tap to view full entry details"
    >
      <View style={styles.cardContainer}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MoodBadge mood={displayMood ?? "neutral"} />
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{formattedDate}</Text>
            <IconSymbol name="chevron-right" size={10} color={APP_COLORS.secondary} />
          </View>
        </View>

        {isAnalyzing && (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingContent}>
              <ActivityIndicator size="small" color={APP_COLORS.primary} />
              <Text
                style={styles.loadingText}
                accessibilityLiveRegion="polite"
                accessibilityLabel="Analyzing journal entry"
              >
                {i18n.t("AddJournalEntry.submitting")}
              </Text>
            </View>
            <View style={styles.loadingDivider} />
          </View>
        )}

        <View style={styles.contentSection}>
          <JournalEntryAnalysisSection summary={displaySummary} themes={displayThemes} tip={displayTip} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  touchableContainer: {
    marginBottom: 8,
  },
  cardContainer: {
    backgroundColor: APP_COLORS.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: APP_COLORS["background-stroke"],
    shadowColor: APP_COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateText: {
    fontSize: 14,
    fontFamily: "Manrope",
    fontWeight: "400",
    color: APP_COLORS["body-text-disabled"],
    lineHeight: 20,
  },
  chevron: {
    fontSize: 16,
    fontFamily: "Manrope",
    fontWeight: "600",
    color: APP_COLORS.secondary,
  },
  loadingContainer: {
    marginBottom: 20,
  },
  loadingContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: APP_COLORS["primary-background"],
    borderRadius: 12,
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    fontFamily: "Manrope",
    fontWeight: "500",
    color: APP_COLORS.primary,
    fontStyle: "italic",
  },
  loadingDivider: {
    height: 1,
    backgroundColor: APP_COLORS.grey,
    marginTop: 16,
    opacity: 0.3,
  },
  contentSection: {
    minHeight: 60,
  },
})
