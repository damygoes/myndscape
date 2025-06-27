import { FloatingButton } from '@/components/floating-button/FloatingButton';
import { useAuth } from '@/features/auth/components/AuthContext';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useCreateJournalEntry } from '../hooks/useCreateJournalEntry';
import { JournalEntryInput } from './JournalEntryInput';

export const JournalCreationDialog = () => {
  const [showInput, setShowInput] = useState(false);
  const { session } = useAuth();
  const userId = session?.user.id;

  const createEntryMutation = useCreateJournalEntry();

  const handleAddEntry = async (content: string) => {
    if (!userId) {
      console.error('No user id found.');
      return;
    }

    try {
      await createEntryMutation.mutateAsync({
        userId,
        mood: 'neutral', // change to dynamic mood later
        content,
      });
      setShowInput(false);
      Alert.alert('Entry successfully created')
    } catch (error) {
      console.error('Error creating journal entry:', error);
    }
  };

  if (!showInput) {
    return <FloatingButton onPress={() => setShowInput(true)} />;
  }

  return (
    <JournalEntryInput
      onSubmit={handleAddEntry}
      onCancel={() => setShowInput(false)}
      saving={createEntryMutation.isPending}
    />
  );
};
