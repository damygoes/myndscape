import { FloatingButton } from '@/components/floating-button/FloatingButton';
import { router } from 'expo-router';

export function AddJournalEntryButton({ style }: { style?: object }) {
  return (
    <FloatingButton
      icon="add"
      style={{ right: 0, zIndex: 10, top: 220, margin: 4, ...style }}
      onPress={() => router.push('/add-entry')}
    />
  );
}
