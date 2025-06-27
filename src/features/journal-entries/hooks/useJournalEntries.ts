import { journalEntriesKeys } from '@/lib/queryKeys';
import { supabase } from '@/services/supabase';
import { useQuery } from '@tanstack/react-query';
import { JournalEntry } from '../types';

export const useJournalEntries = (userId: string) => {
  return useQuery<JournalEntry[]>({
    queryKey: journalEntriesKeys.list(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data ?? [];
    },
  });
};
