import { userProfileKeys } from '@/lib/queryKeys';
import { supabase } from '@/services/supabase/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type UserProfileUpdate = {
  username?: string;
  emotion_check?: string;
  bio?: string;
  isonboarded?: boolean;
};

export function useUpdateUserProfile(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: UserProfileUpdate) => {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select('*')
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      if (!data) return;
      queryClient.setQueryData(userProfileKeys.detail(userId), data);
    },
  });
}
