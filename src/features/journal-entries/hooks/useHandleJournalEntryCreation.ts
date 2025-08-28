import { useUpdateJournalEntry } from '@/features/journal-entries/hooks/useUpdateJournalEntry';
import { useJournalEntryAnalysisStore } from '@/features/journal-entries/store/useJournalEntryAnalysisStore';
import { wellnessScoreKeys } from '@/lib/queryKeys';
import { useSupabaseSession } from '@/services/supabase/SupabaseAuthProvider';
import { useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { callAnalyzeEntryFunction } from '../api/callAnalyzeEntryFunction';
import { useCreateJournalEntry } from './useCreateJournalEntry';

export const useHandleJournalEntryCreation = () => {
  const { session } = useSupabaseSession();
  const userId = session?.user.id;

  // TODO: fetch language from user settings context when implemented
  const userLanguage = 'de';

  const queryClient = useQueryClient();

  const createEntryMutation = useCreateJournalEntry();
  const updateEntryMutation = useUpdateJournalEntry({ language: userLanguage });
  const { startAnalyzing, stopAnalyzing } = useJournalEntryAnalysisStore();

  const handleCreateEntry = async (content: string) => {
    if (!userId) return;

    try {
      // Step 1: Create entry (temporary default values)
      const createdEntry = await createEntryMutation.mutateAsync({
        userId,
        mood: 'neutral',
        content,
      });

      startAnalyzing(createdEntry.id);

      try {
        // Step 2: AI analysis with language
        const aiData = await callAnalyzeEntryFunction(content, userLanguage);

        await updateEntryMutation.mutateAsync({
          id: createdEntry.id,
          mood: aiData.mood,
          mood_score: aiData.mood_score,
          summary: aiData.summary,
          themes: aiData.themes,
          tip: aiData.tip,
          localized: aiData.localized,
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

      queryClient.invalidateQueries({
        queryKey: wellnessScoreKeys.detail(userId),
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
