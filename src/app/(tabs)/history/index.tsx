import { FloatingButton } from '@/components/floating-button/FloatingButton';
import { ThemedSafeAreaView } from '@/components/layouts/ThemedSafeAreaView';
import { JournalEntries } from '@/features/journal-entries/components/JournalEntries';
import { router } from 'expo-router';
import React from 'react';

export default function History() {
  const handleNavigateToAddEntry = () => {
    router.push('/(tabs)/history/add-entry');
  };

  return (
    <ThemedSafeAreaView>
      <FloatingButton
        onPress={handleNavigateToAddEntry}
        icon="add"
        className="right-0 z-10 m-4 top-28"
      />
      <JournalEntries />
    </ThemedSafeAreaView>
  );
}
