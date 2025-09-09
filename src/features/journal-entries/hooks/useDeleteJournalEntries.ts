import { journalEntriesKeys } from '@/lib/queryKeys';
import { supabase } from '@/services/supabase/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteEntriesInput {
  ids: string[];
}

export const useDeleteJournalEntries = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteEntriesInput>({
    mutationFn: async ({ ids }) => {
      if (ids.length === 0) return;

      const { error } = await supabase.from('journal_entries').delete().in('id', ids);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: journalEntriesKeys.list() });
    },
  });
};
