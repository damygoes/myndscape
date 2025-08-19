import { supabase } from '@/services/supabase';
import { useEffect, useState } from 'react';

export type UserProfile = {
  email: string;
  username: string | null;
  isonboarded: boolean | null;
  created_at: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  emotion_check: boolean | null;
};

export function useUserProfile(userId: string) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('users')
      .select('email, avatar_url, bio, created_at, username, emotion_check, isonboarded')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      setError('Could not load user');
      setUser(null);
    } else {
      setUser(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return { user, loading, error, refreshUser: fetchUser };
}
