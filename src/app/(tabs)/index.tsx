import { useAuth } from '@/features/auth/components/AuthContext';
import { AiInsights } from '@/features/dashboard/components/AiInsights';
import { LastEntrySummary } from '@/features/dashboard/components/LastEntrySummary';
import { MoodPrompt } from '@/features/dashboard/components/MoodPrompt';
import { QuickStats } from '@/features/dashboard/components/QuickStats';
import { TipCard } from '@/features/dashboard/components/TipCard';
import { useJournalEntries } from '@/features/journal-entries/hooks/useJournalEntries';
import { useJournalEntriesStore } from '@/features/journal-entries/store/useJournalEntriesStore';
import { useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function HomeDashboardScreen() {
  const { session } = useAuth();
  const userId = session?.user.id;
  const { data: entries, isLoading, error } = useJournalEntries(userId!);
  const { setEntries, clearEntries } = useJournalEntriesStore();

  useEffect(() => {
    if (entries) {
      setEntries(entries);
    } else {
      clearEntries();
    }
  }, [entries]);

  if (isLoading) {
    return (
      <SafeAreaView className="items-center justify-center flex-1">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="items-center justify-center flex-1">
        <Text>Error loading entries.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 h-screen">
      <ScrollView className="p-6">
        <View className="flex flex-col gap-8 mb-6">
          <MoodPrompt />
          <QuickStats />
          <LastEntrySummary />
          <AiInsights />
          <TipCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
