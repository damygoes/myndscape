import { supabase } from '@/services/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { journalEntriesKeys } from '@/lib/queryKeys';
import { userProfileKeys } from '@/lib/queryKeys';
import { router } from 'expo-router';

interface DeleteUserAccountInput {
  id: string;
}

export const useDeleteUserAccount = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteUserAccountInput>({
    mutationFn: async ({ id }) => {
      const { data, error } = await supabase.functions.invoke('delete-user', {
        body: { userId: id },
      });

      if (error) {
        console.error('Delete user failed:', error);
        throw error;
      }

      // Optional: Sign out immediately after delete
      await supabase.auth.signOut();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: journalEntriesKeys.list() });
      queryClient.invalidateQueries({ queryKey: userProfileKeys.detail(id) });

      // Redirect to login
      router.replace('/login');
    },
  });
};
