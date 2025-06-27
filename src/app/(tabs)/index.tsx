import { JournalCreationDialog } from '@/features/journal-entries/components/JournalCreationDialog';
import { JournalEntries } from '@/features/journal-entries/components/JournalEntries';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Home() {

  return (
    <SafeAreaView className="flex-1 h-screen">
      <JournalEntries />
      <JournalCreationDialog />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
