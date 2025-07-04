import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/Card';
import { useJournalEntriesStore } from '@/features/journal-entries/store/useJournalEntriesStore';
import { colors } from '@/utils/colors';
import { Text } from 'react-native';

export const QuickStats = () => {
  const entries = useJournalEntriesStore((state) => state.entries);
  const totalEntries = entries?.length ?? 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle style={{
          color: colors.textPrimary,
          fontSize: 18,
          fontWeight: '600',
        }}>
          Quick Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Text style={{
          color: colors.primary,
          fontSize: 24,
          fontWeight: '600',
          marginTop: 8,
        }}>
          {totalEntries} total entries
        </Text>
      </CardContent>
    </Card>
  );
};