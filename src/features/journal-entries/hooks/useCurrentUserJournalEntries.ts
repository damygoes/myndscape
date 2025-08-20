import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabase';
import { JournalEntry } from '../types';
import { journalEntriesKeys } from '@/lib/queryKeys';
import { useSupabaseSession } from '@/services/SupabaseAuthProvider';

export const useCurrentUserJournalEntries = () => {
  const { session } = useSupabaseSession();
  const userId = session?.user.id;

  return useQuery<JournalEntry[]>({
    queryKey: journalEntriesKeys.list(),
    queryFn: async () => {
      if (!userId) return [];

      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data ?? [];
    },
    enabled: !!userId, // only fetch if user is logged in
  });
};