import { supabase } from '@/services/supabase';

type UserProfileUpdate = {
  username?: string;
  emotion_check?: string;
  bio?: string;
  isonboarded?: boolean;
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
