import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/card/Card';
import { MoodBadge } from '@/features/journal-entries/jornal-entry-item/components/MoodBadge';
import { formatRelativeDate } from '@/features/journal-entries/jornal-entry-item/utils';
import { useJournalEntriesStore } from '@/features/journal-entries/store/useJournalEntriesStore';
import { Text } from 'react-native';

export const LastEntrySummary = () => {
  const entries = useJournalEntriesStore((state) => state.entries);
  const lastEntry = entries?.[0];

  if (!lastEntry) return null;

  return (
    <Card>
      <CardHeader className='gap-6'>
        <CardTitle>Your Last Entry</CardTitle>
        <MoodBadge mood={lastEntry.mood} displayPrefix={false} />
      </CardHeader>
      <CardContent>
        <Text numberOfLines={2}>{lastEntry.summary || lastEntry.content}</Text>
      </CardContent>
      <CardFooter>
        <Text className="text-xs text-gray-400">
          {formatRelativeDate(lastEntry.created_at)}
        </Text>
      </CardFooter>
    </Card>
  );
};
