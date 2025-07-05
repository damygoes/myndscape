import { useAuth } from '@/features/auth/components/AuthContext';
import { View } from 'react-native';
import { useJournalEntries } from '../hooks/useJournalEntries';
import { JournalEntryList } from './JournalEntryList';

export const JournalEntries = () => {
  const { session } = useAuth();
  const userId = session?.user.id;
  const { data: entries = [], isLoading, error, refetch } = useJournalEntries(userId!);

  return (
    <View className="flex-1 mb-6">
      <JournalEntryList entries={entries} isLoading={isLoading} error={error} />
    </View>
  );
};
