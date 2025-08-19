import { useJournalEntries } from '@/features/journal-entries/hooks/useJournalEntries';
import { useSupabaseSession } from '@/services/SupabaseAuthProvider';

export const useCurrentUserEntries = () => {
  const { session } = useSupabaseSession();
  const userId = session?.user.id;

  console.log("user id here:", userId);

  const result = useJournalEntries(userId ?? '');

  return {
    userId,
    session,
    ...result, // includes data, isLoading, error, etc.
  };
};
