import EditJournalModal from '@/features/journal-entries/components/EditJournalModal';
import { useJournalEntryAnalysisStore } from '@/features/journal-entries/store/useJournalEntryAnalysisStore';
import { JournalEntry } from '@/features/journal-entries/types';
import React, { useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { SUMMARY_TRUNCATION_LENGTH } from '../constants';
import { formatRelativeDate, truncateSummary } from '../utils';
import { JournalEntryActions } from './JournalEntryActions';
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
  const { analyzingIds } = useJournalEntryAnalysisStore();
  const isAnalyzing = analyzingIds.includes(entry.id);

  const [modalVisible, setModalVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  const showAnalysisSection = entry.summary || entry.themes || entry.tip;
  const shouldShowMoreToggle = entry.summary && entry.summary.length > SUMMARY_TRUNCATION_LENGTH;

  const formattedDate = formatRelativeDate(entry.created_at);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <>
      <TouchableOpacity
        onPress={toggleExpand}
        activeOpacity={0.8}
        className="gap-4 p-6 mb-4 bg-white shadow-xs rounded-3xl dark:bg-gray-800"
      >
        <View className="flex-row items-center justify-between">
          <MoodBadge mood={entry.mood ?? 'neutral'} />
          <Text className="text-xs text-gray-500 dark:text-gray-400">{formattedDate}</Text>
        </View>
        <Text
          numberOfLines={1}
          className="text-sm text-gray-700 dark:text-gray-300 opacity-70"
        >
          {entry.content}
        </Text>

        {isAnalyzing && (
          <Text className="text-sm italic text-gray-500">Summarizing your mood...</Text>
        )}
        {showAnalysisSection && (
          <View className="my-1 border-t border-gray-200 dark:border-gray-700" />
        )}
        {showAnalysisSection&& (
          <JournalEntryAnalysisSection
            summary={expanded ? entry.summary : truncateSummary(entry.summary)}
            themes={entry.themes}
            tip={entry.tip}
          />
        )}
        {shouldShowMoreToggle && (
          <TouchableOpacity onPress={toggleExpand} activeOpacity={0.7}>
            <Text className="text-sm text-blue-600 dark:text-blue-300">
              {expanded ? 'See less' : 'See more'}
            </Text>
          </TouchableOpacity>
        )}
        <JournalEntryActions entryId={entry.id} />
      </TouchableOpacity>

      {/* Edit Modal */}
      <EditJournalModal id={entry.id} visible={modalVisible} onCancel={closeModal} />
    </>
  );
};

