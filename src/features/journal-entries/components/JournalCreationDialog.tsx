import { FloatingButton } from '@/components/floating-button/FloatingButton';
import { useAuth } from '@/features/auth/components/AuthContext';
import { useUpdateJournalEntry } from '@/features/journal-entries/hooks/useUpdateJournalEntry';
import { useJournalEntryAnalysisStore } from '@/features/journal-entries/store/useJournalEntryAnalysisStore';
import { useState } from 'react';
import { Alert } from 'react-native';
import { callAnalyzeEntryFunction } from '../api/callAnalyzeEntryFunction';
import { useCreateJournalEntry } from '../hooks/useCreateJournalEntry';
import { JournalEntryInput } from './JournalEntryInput';

export const JournalCreationDialog = () => {
  const [showInput, setShowInput] = useState(false);
  const { session } = useAuth();
  const userId = session?.user.id;

  const createEntryMutation = useCreateJournalEntry();
  const updateEntryMutation = useUpdateJournalEntry();
  const { startAnalyzing, stopAnalyzing } = useJournalEntryAnalysisStore();

  const handleAddEntry = async (content: string) => {
    if (!userId) {
      console.error('No user id found.');
      return;
    }

    try {
      const createdEntry = await createEntryMutation.mutateAsync({
        userId,
        mood: 'neutral',
        content,
      });

      setShowInput(false);

      // Show "analyzing" status in UI
      startAnalyzing(createdEntry.id);

      try {
        const aiData = await callAnalyzeEntryFunction(content);

        // 4. Update entry with AI data (mood, summary, themes, tip)
        await updateEntryMutation.mutateAsync({
          id: createdEntry.id,
          mood: aiData.mood,
          summary: aiData.summary,
          themes: aiData.themes,
          tip: aiData.tip,
        });

      } catch (aiError) {
        console.error('AI analysis failed:', aiError);
        Alert.alert('AI Summary Error', 'We couldn’t generate an AI summary for this entry.');
      } finally {
        // 5. Stop analyzing UI state regardless of AI success/failure
        stopAnalyzing(createdEntry.id);
      }
     

    } catch (error) {
      console.error('Error creating journal entry:', error);
      Alert.alert('Creation Error', 'Failed to create journal entry. Please try again.');
    }
  };

  if (!showInput) {
    return <FloatingButton onPress={() => setShowInput(true)} />;
  }

  return (
    <JournalEntryInput
      onSubmit={handleAddEntry}
      onCancel={() => setShowInput(false)}
      saving={createEntryMutation.isPending || updateEntryMutation.isPending}
    />
  );
};
