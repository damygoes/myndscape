import { journalEntriesKeys } from '@/lib/queryKeys';
import { supabase } from '@/services/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { JournalEntry } from '../types';

interface CreateEntryInput {
  userId: string;
  mood: string;
  content: string;
}

export const useCreateJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation<JournalEntry, Error, CreateEntryInput>({
    mutationFn: async ({
      userId,
      mood,
      content,
      localized,
    }: CreateEntryInput & { localized?: any }) => {
      const { data, error } = await supabase
        .from('journal_entries')
        .insert({
          user_id: userId,
          mood,
          content,
        })
        .select(
          'id, user_id, content, mood, summary, themes, tip, localized, created_at'
        )
        .single();

      if (error) throw error;
      return data as JournalEntry;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: journalEntriesKeys.list() });
    },
  });
};
