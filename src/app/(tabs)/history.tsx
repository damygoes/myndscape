import { ThemedSafeAreaView } from '@/components/layouts/ThemedSafeAreaView';
import { JournalCreationDialog } from '@/features/journal-entries/components/JournalCreationDialog';
import { JournalEntries } from '@/features/journal-entries/components/JournalEntries';
import { StatusBar } from 'expo-status-bar';
import React from 'react';


export default function History() {

  return (
    <ThemedSafeAreaView>
      <JournalEntries />
      <JournalCreationDialog />
      <StatusBar style="auto" />
    </ThemedSafeAreaView>
  );
}
