import { COLORS } from '@/constants/colors';
import { useDeleteJournalEntry } from '@/features/journal-entries/hooks/useDeleteJournalEntry';
import { useJournalEntryById } from '@/features/journal-entries/hooks/useJournalEntryById';
import { MoodBadge } from '@/features/journal-entries/journal-entry-item/components/MoodBadge';
import ThemeBadge from '@/features/journal-entries/journal-entry-item/components/ThemeBadge';
import {
  parseThemes,
  prepareJournalEntry,
} from '@/features/journal-entries/journal-entry-item/utils';
import { PaywallGate } from '@/features/paywall/components/PawallGate';
import { Plan } from '@/features/paywall/types';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

export default function EntryDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, error } = useJournalEntryById(id);
  const deleteJournalEntry = useDeleteJournalEntry();
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 16, color: colors.textPrimary }}>
          Loading entry...
        </Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: colors.textPrimary }}>
          Could not load entry. Please try again later.
        </Text>
      </View>
    );
  }

  const journalEntry = prepareJournalEntry(data);
  const themeList = parseThemes(journalEntry.themes);

  const handleDelete = async () => {
    Alert.alert('Delete Entry', 'Are you sure you want to delete this entry?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteJournalEntry.mutateAsync({ id: journalEntry.id });
            router.replace('/history');
          } catch (err) {
            Alert.alert('Error', 'Failed to delete entry.');
          }
        },
      },
    ]);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      {/* Mood + Date */}
      <View>
        <View style={styles.header}>
          <MoodBadge mood={journalEntry.mood ?? 'neutral'} />
          <Text style={[styles.dateText, { color: colors.textMuted }]}>
            {journalEntry.formattedDate}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View>
        <Text style={[styles.label, { color: colors.textMuted }]}>
          What you wrote:
        </Text>
        <Text style={[styles.content, { color: colors.textPrimary }]}>
          {journalEntry.content}
        </Text>
      </View>

      {/* Reflections */}
      <View>
        <Text style={[styles.label, { color: colors.textMuted }]}>
          Reflections
        </Text>

        {/* Summary */}
        {journalEntry.summary && (
          <View style={styles.subSection}>
            <Text style={[styles.subTitle, { color: colors.textPrimary }]}>
              Summary
            </Text>
            <Text style={[styles.subText, { color: colors.textPrimary }]}>
              {journalEntry.summary}
            </Text>
          </View>
        )}
        <PaywallGate require={Plan.PREMIUM}>
          {/* Themes */}
          {journalEntry.hasThemes && (
            <View style={styles.subSection}>
              <Text style={[styles.subTitle, { color: colors.textPrimary }]}>
                Themes
              </Text>
              <View style={styles.themeBadgeContainer}>
                {themeList.map((theme, index) => (
                  <ThemeBadge key={index} theme={theme} />
                ))}
              </View>
            </View>
          )}

          {/* Tip */}
          {journalEntry.hasTip && (
            <View style={styles.subSection}>
              <Text style={[styles.subTitle, { color: colors.textPrimary }]}>
                Tip
              </Text>
              <View style={styles.tipContainer}>
                <Text style={[styles.subText, { color: colors.textPrimary }]}>
                  {journalEntry.tip}
                </Text>
              </View>
            </View>
          )}
        </PaywallGate>
      </View>

      {/* Actions */}
      <View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleDelete} style={styles.delete}>
            <Text style={{ color: colors.white }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    gap: 24,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
  },
  subSection: {
    marginVertical: 12,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  subText: {
    fontSize: 15,
    lineHeight: 21,
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
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  delete: {
    backgroundColor: COLORS.dark.danger,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});
