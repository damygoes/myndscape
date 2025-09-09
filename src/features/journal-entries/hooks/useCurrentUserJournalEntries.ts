import { journalEntriesKeys } from '@/lib/queryKeys';
import { supabase } from '@/services/supabase/supabase';
import { useSupabaseSession } from '@/services/supabase/SupabaseAuthProvider';
import { SortOrder } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { JournalEntry } from '../types';

type Params = {
  search?: string;
  sortOrder?: SortOrder;
};

export const useCurrentUserJournalEntries = (params: Params = {}) => {
  const { session } = useSupabaseSession();
  const userId = session?.user.id;

  const search = params.search?.trim() ?? '';
  const sortOrder = params.sortOrder ?? 'latest';
  const ascending = sortOrder === 'oldest';

  return useQuery<JournalEntry[]>({
    queryKey: journalEntriesKeys.list({ userId, search, sortOrder }),
    queryFn: async () => {
      if (!userId) return [];

      // Base query
      let query = supabase.from('journal_entries').select('*').eq('user_id', userId);

      // Server-side search (simple). You can extend to OR across columns.
      if (search.length > 0) {
        // NOTE: If you want to search multiple columns, use `.or()`:
        // .or(`content.ilike.%${q}%,summary.ilike.%${q}%,themes.ilike.%${q}%`)
        // Beware commas in `q` because `.or()` uses commas as separators.
        query = query.ilike('content', `%${search}%`);
      }

      // Sort
      query = query.order('created_at', { ascending });

      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!userId,
    staleTime: 30_000,
  });
};
