import { journalEntriesKeys } from '@/lib/queryKeys';
import { supabase } from '@/services/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      mood,
      content,
    }: {
      userId: string;
      mood: string;
      content: string;
    }) => {
      const { data, error } = await supabase
        .from('journal_entries')
        .insert({
          user_id: userId,
          mood,
          content,
        })
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: journalEntriesKeys.list(),
      });
    },
  });
};
