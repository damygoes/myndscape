import { UserProfile } from '@/features/user/types';
import { userProfileKeys } from '@/lib/queryKeys';
import { supabase } from '@/services/supabase/supabase';
import { useSupabaseSession } from '@/services/supabase/SupabaseAuthProvider';
import { useQuery } from '@tanstack/react-query';

export const useCurrentUserProfile = () => {
  const { session } = useSupabaseSession();
  const userId = session?.user.id;

  const isEnabled = !!userId && userId.trim() !== '';

  const { data, isLoading, error, refetch, isFetching } = useQuery<UserProfile>(
    {
      queryKey: userProfileKeys.detail(userId ?? 'unknown'),
      enabled: isEnabled,
      queryFn: async () => {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) throw error;
        return data;
      },
    }
  );

  return {
    userId,
    data,
    isLoading,
    error,
    refetch,
    isFetching,
  };
};
