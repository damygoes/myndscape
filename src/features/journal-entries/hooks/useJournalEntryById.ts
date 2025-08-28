import { journalEntriesKeys } from '@/lib/queryKeys';
import { supabase } from '@/services/supabase/supabase';
import { useQuery } from '@tanstack/react-query';
import { JournalEntry } from '../types';

export const useJournalEntryById = (id: string) => {
  return useQuery<JournalEntry, Error>({
    queryKey: journalEntriesKeys.detail(id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
