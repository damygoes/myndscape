import { Button } from '@/components/button/Button';
import { router } from 'expo-router';

export function AddJournalEntryButton() {
  return (
    <Button
      title="Add Journal Entry"
      icon="add"
      onPress={() => router.push('/add-entry')}
      variant="outline"
    />
  );
}
