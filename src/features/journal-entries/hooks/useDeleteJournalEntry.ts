import { journalEntriesKeys } from '@/lib/queryKeys';
import { supabase } from '@/services/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteEntryInput {
  id: string;
}

export const useDeleteJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteEntryInput>({
    mutationFn: async ({ id }) => {
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: journalEntriesKeys.list() });
    },
  });
};
