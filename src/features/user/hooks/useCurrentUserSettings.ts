import { userSettingsKeys } from '@/lib/queryKeys';
import { supabase } from '@/services/supabase';
import { useSupabaseSession } from '@/services/SupabaseAuthProvider';
import { useQuery } from '@tanstack/react-query';
import type { UserSettings } from '../types';

export const useCurrentUserSettings = () => {
  const { session } = useSupabaseSession();
  const userId = session?.user.id;

  return useQuery<UserSettings | null>({
    queryKey: userSettingsKeys.detail(userId ?? ''),
    queryFn: async () => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows found
      return (data as UserSettings) ?? null;
    },
    enabled: !!userId,
  });
};
