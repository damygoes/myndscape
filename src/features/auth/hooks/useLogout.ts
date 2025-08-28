import { supabase } from '@/services/supabase/supabase';
import { useState } from 'react';
import { Alert } from 'react-native';

export function useLogout() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Logout Failed', 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { handleLogout, loading };
}
