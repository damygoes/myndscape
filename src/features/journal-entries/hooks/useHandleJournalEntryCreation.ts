import { useUpdateJournalEntry } from '@/features/journal-entries/hooks/useUpdateJournalEntry';
import { useJournalEntryAnalysisStore } from '@/features/journal-entries/store/useJournalEntryAnalysisStore';
import { useSupabaseSession } from '@/services/SupabaseAuthProvider';
import { Alert } from 'react-native';
import { callAnalyzeEntryFunction } from '../api/callAnalyzeEntryFunction';
import { useCreateJournalEntry } from './useCreateJournalEntry';
import { useQueryClient } from '@tanstack/react-query';
import { wellnessScoreKeys } from '@/lib/queryKeys';

export const useHandleJournalEntryCreation = () => {
  const { session } = useSupabaseSession();
  const userId = session?.user.id;

  const queryClient = useQueryClient();

  const createEntryMutation = useCreateJournalEntry();
  const updateEntryMutation = useUpdateJournalEntry();
  const { startAnalyzing, stopAnalyzing } = useJournalEntryAnalysisStore();

  const handleCreateEntry = async (content: string) => {
    if (!userId) {
      console.error('No user id found.');
      return;
    }

    try {
      // Step 1: Create entry
      const createdEntry = await createEntryMutation.mutateAsync({
        userId,
        mood: 'neutral',
        content,
      });

      // Step 2: Start analyzing UI
      startAnalyzing(createdEntry.id);

      try {
        // Step 3: AI analysis
        const aiData = await callAnalyzeEntryFunction(content);

        await updateEntryMutation.mutateAsync({
          id: createdEntry.id,
          mood: aiData.mood,
          summary: aiData.summary,
          themes: aiData.themes,
          tip: aiData.tip,
        });
      } catch (aiError) {
        console.error('AI analysis failed:', aiError);
        Alert.alert(
          'AI Summary Error',
          'We couldn’t generate an AI summary for this entry.'
        );
      } finally {
        stopAnalyzing(createdEntry.id);
      }
      // Step 4: Invalidate wellness query so components refresh
      queryClient.invalidateQueries({
        queryKey: wellnessScoreKeys.detail(userId!),
      });
    } catch (error) {
      console.error('Error creating journal entry:', error);
      Alert.alert(
        'Creation Error',
        'Failed to create journal entry. Please try again.'
      );
    }
  };

  return {
    handleCreateEntry,
    createIsPending:
      createEntryMutation.isPending || updateEntryMutation.isPending,
  };
};
