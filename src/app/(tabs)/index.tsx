'use client';

import AiInsights from '@/features/dashboard/components/AiInsights';
import LastEntrySummary from '@/features/dashboard/components/LastEntrySummary';
import MoodPrompt from '@/features/dashboard/components/MoodPrompt';
import QuickStats from '@/features/dashboard/components/QuickStats';
import TipCard from '@/features/dashboard/components/TipCard';
import { SafeAreaView, ScrollView } from 'react-native';

export default function HomeDashboardScreen() {
  return (
    <SafeAreaView className="flex-1 h-screen">
      <ScrollView className="gap-2 p-4">
          <MoodPrompt />
          <QuickStats />
          <LastEntrySummary />
          <AiInsights />
          <TipCard />
      </ScrollView>
    </SafeAreaView>
  );
}
