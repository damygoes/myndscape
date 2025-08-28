import { journalEntriesKeys } from '@/lib/queryKeys';
import { supabase } from '@/services/supabase/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { callAnalyzeEntryFunction } from '../api/callAnalyzeEntryFunction';
import { useJournalEntryAnalysisStore } from '../store/useJournalEntryAnalysisStore';
import { JournalEntry } from '../types';

interface UpdateEntryInput {
  id: string;
  mood?: string;
  mood_score?: number;
  content?: string;
  summary?: string;
  themes?: string;
  tip?: string;
  localized?: Record<string, any>;
}

export const useUpdateJournalEntry = ({ language }: { language: string }) => {
  const queryClient = useQueryClient();
  const { startAnalyzing, stopAnalyzing } = useJournalEntryAnalysisStore();

  return useMutation({
    mutationFn: async (fields: UpdateEntryInput) => {
      const { data: updatedEntry, error } = await supabase
        .from('journal_entries')
        .update(fields)
        .eq('id', fields.id)
        .single<JournalEntry>();

      if (error) throw error;

      const needsAiUpdate = fields.content !== undefined;

      if (needsAiUpdate) {
        startAnalyzing(fields.id);

        try {
          const aiData = await callAnalyzeEntryFunction(
            fields.content ?? updatedEntry.content,
            language
          );

          const { error: aiUpdateError } = await supabase
            .from('journal_entries')
            .update({
              mood: aiData.mood,
              mood_score: aiData.mood_score,
              summary: aiData.summary,
              themes: aiData.themes,
              tip: aiData.tip,
              localized: aiData.localized, // ✅ store translations
            })
            .eq('id', fields.id);

          if (aiUpdateError) throw aiUpdateError;
        } catch (aiError) {
          console.error('AI analysis failed during update:', aiError);
          Alert.alert(
            'AI Summary Error',
            'We couldn’t generate an updated AI summary for this entry.'
          );
        } finally {
          stopAnalyzing(fields.id);
        }
      }

      return updatedEntry;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: journalEntriesKeys.list() });
    },
  });
};
