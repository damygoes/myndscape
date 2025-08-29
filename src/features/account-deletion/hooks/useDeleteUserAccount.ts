import { journalEntriesKeys, userProfileKeys } from '@/lib/queryKeys';
import { supabase } from '@/services/supabase/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';

interface DeleteUserAccountInput {
  id: string;
}

export const useDeleteUserAccount = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteUserAccountInput>({
    mutationFn: async ({ id }) => {
      const { error } = await supabase.functions.invoke('delete-user', {
        body: { userId: id },
      });

      if (error) {
        console.error('Delete user failed:', error);
        throw error;
      }

      // Sign out immediately after delete
      await supabase.auth.signOut();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: journalEntriesKeys.list() });
      queryClient.invalidateQueries({ queryKey: userProfileKeys.detail(id) });

      // Redirect to onboarding
      router.replace('/onboarding');
    },
  });
};
