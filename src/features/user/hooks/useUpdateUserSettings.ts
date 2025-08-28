import { userSettingsKeys } from '@/lib/queryKeys';
import { supabase } from '@/services/supabase/supabase';
import { useSupabaseSession } from '@/services/supabase/SupabaseAuthProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UserSettings } from '../types';

type UpdateUserSettingsInput = Partial<
  Pick<UserSettings, 'allow_notifications' | 'theme' | 'language'>
>;

export const useUpdateUserSettings = () => {
  const { session } = useSupabaseSession();
  const userId = session?.user.id;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: UpdateUserSettingsInput) => {
      if (!userId) throw new Error('No user session');

      const { data, error } = await supabase
        .from('user_settings')
        .update(updates)
        .eq('user_id', userId)
        .select('*');

      if (error) throw error;
      if (!data) throw new Error('No user settings returned');
      return data[0] as UserSettings;
    },
    onMutate: async (updates) => {
      if (!userId) return;

      await queryClient.cancelQueries({
        queryKey: userSettingsKeys.detail(userId),
      });

      const previousData = queryClient.getQueryData<UserSettings>(
        userSettingsKeys.detail(userId)
      );

      queryClient.setQueryData<UserSettings>(
        userSettingsKeys.detail(userId),
        (oldData) => ({ ...(oldData ?? {}), ...updates }) as UserSettings
      );

      return { previousData };
    },
    onError: (_err, _variables, context) => {
      if (!userId) return;
      if (context?.previousData) {
        queryClient.setQueryData(
          userSettingsKeys.detail(userId),
          context.previousData
        );
      }
    },
    onSuccess: (data) => {
      if (!userId) return;
      queryClient.setQueryData(userSettingsKeys.detail(userId), data);
    },
  });
};
