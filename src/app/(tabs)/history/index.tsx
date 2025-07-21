import { FloatingButton } from '@/components/floating-button/FloatingButton';
import { JournalEntries } from '@/features/journal-entries/components/JournalEntries';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function History() {
  const handleNavigateToAddEntry = () => {
    router.push('/(tabs)/history/add-entry');
  };

  return (
    <SafeAreaView
      style={{ marginBottom: 24, height: '100%' }}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <FloatingButton
        onPress={handleNavigateToAddEntry}
        icon="add"
        className="right-0 z-10 m-4 top-28"
      />
      <JournalEntries />
    </SafeAreaView>
  );
}
