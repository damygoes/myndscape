import { COLORS } from '@/constants/colors';
import { useDeleteJournalEntry } from '@/features/journal-entries/hooks/useDeleteJournalEntry';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
interface Props {
  entryId: string;
}

export const JournalEntryActions = ({ entryId }: Props) => {
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

  const deleteMutation = useDeleteJournalEntry();

  const handleNavigateToEditEntry = () => {
    router.push(`/history/edit-entry/${entryId}`);
  };

  const handleDelete = () => {
    Alert.alert('Delete Entry', 'Are you sure you want to delete this journal entry?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteMutation.mutate({ id: entryId }),
      },
    ]);
  };

  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', gap: 32, marginTop: 16 }}>
        {/* Edit */}
        <TouchableOpacity
          onPress={handleNavigateToEditEntry}
          activeOpacity={0.7}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Ionicons name="create-outline" size={16} color={colors.textSecondary} />
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 16,
              marginLeft: 4,
            }}
          >
            Edit
          </Text>
        </TouchableOpacity>

        {/* Delete */}
        <TouchableOpacity
          onPress={handleDelete}
          activeOpacity={0.7}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Ionicons name="trash-outline" size={16} color={colors.textError} />
          <Text style={{ color: colors.textError, fontSize: 16, marginLeft: 4 }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
