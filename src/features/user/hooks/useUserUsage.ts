import { supabase } from '@/services/supabase/supabase';
import { useQuery } from '@tanstack/react-query';
import { UserUsage } from '../types';

export function useUserUsage() {
  return useQuery({
    queryKey: ['userUsage'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_my_usage');
      if (error) throw error;
      return data[0] as UserUsage; // extracted the first item because Supabase rpc calls always return an array of rows, even if the function returns a single row.
    },
  });
}
