import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/Card';
import { useJournalEntriesStore } from '@/features/journal-entries/store/useJournalEntriesStore';
import { colors } from '@/utils/colors';
import { Text } from 'react-native';

export const QuickStats = () => {
  const entries = useJournalEntriesStore((state) => state.entries);
  const totalEntries = entries?.length ?? 0;

  return (
    <Card style={{
      backgroundColor: colors.cardBackground,
      borderColor: colors.border,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 2,
    }}>
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