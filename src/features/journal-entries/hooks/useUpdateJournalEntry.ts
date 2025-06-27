import { journalEntriesKeys } from '@/lib/queryKeys';
import { supabase } from '@/services/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UpdateEntryInput {
  id: string;
  mood: string;
  content: string;
}

export const useUpdateJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, mood, content }: UpdateEntryInput) => {
      const { data, error } = await supabase
        .from('journal_entries')
        .update({ mood, content })
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: journalEntriesKeys.list() });
    },
  });
};
