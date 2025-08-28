import { FloatingButton } from '@/components/floating-button/FloatingButton';
import { JournalEntries } from '@/features/journal-entries/components/JournalEntries';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function History() {
  const handleNavigateToAddEntry = () => {
    router.push('/add-entry');
  };

  return (
    <SafeAreaView
      style={{ marginBottom: 24, height: '100%' }}
      edges={['bottom', 'left', 'right']}
    >
      <FloatingButton
        onPress={handleNavigateToAddEntry}
        icon="add"
        style={{ right: 0, zIndex: 10, margin: 4, top: 150 }}
      />
      <JournalEntries />
    </SafeAreaView>
  );
}
