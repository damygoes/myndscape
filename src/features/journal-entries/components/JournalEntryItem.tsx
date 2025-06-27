import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { JournalEntry } from '../types';
import { moodColors } from '../utils';
import EditJournalModal from './EditJournalModal';

interface Props {
  entry: JournalEntry;
}

export const JournalEntryItem = ({ entry }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const formattedDate = new Date(entry.created_at).toLocaleDateString();
  const badgeColor = moodColors[entry.mood.toLowerCase()] ?? 'bg-gray-300 text-gray-800';

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <>
      <TouchableOpacity onPress={openModal} activeOpacity={0.7}>
        <View className="p-5 bg-white shadow-md rounded-xl dark:bg-gray-800">
          <View className="flex-row items-center justify-between mb-3">
            <View className={`self-start px-3 py-1 rounded-full ${badgeColor}`}>
              <Text className="text-xs font-semibold uppercase">{entry.mood}</Text>
            </View>
            <Text className="text-xs text-gray-500 dark:text-gray-400">{formattedDate}</Text>
          </View>

          <Text className="text-base leading-relaxed text-gray-800 dark:text-gray-200">
            {entry.content.length > 150 ? entry.content.slice(0, 150) + '...' : entry.content}
          </Text>

          {entry.ai_summary && (
            <Text className="mt-4 text-sm italic text-gray-500 dark:text-gray-400">
              AI Summary: {entry.ai_summary}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      <EditJournalModal
        id={entry.id}
        visible={modalVisible}
        onCancel={closeModal}
      />
    </>
  );
};
