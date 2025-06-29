import EditJournalModal from '@/features/journal-entries/components/EditJournalModal';
import { useDeleteJournalEntry } from '@/features/journal-entries/hooks/useDeleteJournalEntry';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  entryId: string;
}

export const JournalEntryActions = ({ entryId }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const deleteMutation = useDeleteJournalEntry();

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleDelete = () => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this journal entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteMutation.mutate({ id: entryId }),
        },
      ]
    );
  };

  return (
    <>
      <View className="flex-row justify-end gap-4 mt-2">
        {/* Edit */}
        <TouchableOpacity
          onPress={openModal}
          activeOpacity={0.7}
          className="flex-row items-center"
        >
          <Ionicons name="create-outline" size={16} color="#2563EB" />
          <Text className="ml-1 text-xs text-blue-600 dark:text-blue-300">Edit</Text>
        </TouchableOpacity>

        {/* Delete */}
        <TouchableOpacity
          onPress={handleDelete}
          activeOpacity={0.7}
          className="flex-row items-center"
        >
          <Ionicons name="trash-outline" size={16} color="#EF4444" />
          <Text className="ml-1 text-xs text-red-600 dark:text-red-400">Delete</Text>
        </TouchableOpacity>
      </View>

      <EditJournalModal id={entryId} visible={modalVisible} onCancel={closeModal} />
    </>
  );
};
