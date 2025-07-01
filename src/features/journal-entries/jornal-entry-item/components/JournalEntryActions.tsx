import EditJournalModal from '@/features/journal-entries/components/EditJournalModal';
import { useDeleteJournalEntry } from '@/features/journal-entries/hooks/useDeleteJournalEntry';
import { colors } from '@/utils/colors';
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
          <Ionicons name="create-outline" size={16} color={colors.textSecondary} />
          <Text className="ml-1 text-xs" style={{
            color: colors.textSecondary
          }}>Edit</Text>
        </TouchableOpacity>

        {/* Delete */}
        <TouchableOpacity
          onPress={handleDelete}
          activeOpacity={0.7}
          className="flex-row items-center"
        >
          <Ionicons name="trash-outline" size={16} color={colors.textError}/>
          <Text className="ml-1 text-xs" style={{color: colors.textError}}>Delete</Text>
        </TouchableOpacity>
      </View>

      <EditJournalModal id={entryId} visible={modalVisible} onCancel={closeModal} />
    </>
  );
};
