import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/Card';
import { useJournalEntriesStore } from '@/features/journal-entries/store/useJournalEntriesStore';
import { Text } from 'react-native';

export const QuickStats = () => {
  const entries = useJournalEntriesStore((state) => state.entries);
  const totalEntries = entries?.length ?? 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <Text className="text-2xl font-semibold">{totalEntries} total entries</Text>
      </CardContent>
    </Card>
  );
};
