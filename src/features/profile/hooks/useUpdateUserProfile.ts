import { supabase } from '@/services/supabase';

type UserProfileUpdate = {
  display_name?: string;
  fullname?: string;
  bio?: string;
};

export async function useUpdateUserProfile(
  userId: string,
  updates: UserProfileUpdate
) {
  const { error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId);

  if (error) {
    throw error;
  }
}
