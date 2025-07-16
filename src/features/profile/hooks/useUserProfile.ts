import { supabase } from '@/services/supabase';
import { useEffect, useState } from 'react';

export type UserProfile = {
  email: string;
  display_name: string;
  avatar_url: string | null;
  fullname: string | null;
  bio?: string | null;
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
      .select('email, display_name, avatar_url, fullname, bio')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      setError('Could not load user');
    } else {
      setUser(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const refreshUser = fetchUser;

  return { user, loading, error, refreshUser };
}
