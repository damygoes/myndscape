import ParallaxScrollView from '@/components/ParallaxScrollView';
import { COLORS } from '@/constants/colors';
import { AiInsights } from '@/features/dashboard/components/AiInsights';
import { GreetingCard } from '@/features/dashboard/components/GreetingCard';
import { AddJournalEntryButton } from '@/features/dashboard/components/AddJournalEntryButton';
import { QuickStatsGrid } from '@/features/dashboard/components/QuickStatsGrid';
import { TipCard } from '@/features/dashboard/components/TipCard';
import { WellnessScoreCard } from '@/features/wellness-score/components/WellnessScoreCard';
import { APP_COLORS } from '@/constants/colors';

export default function HomeDashboardScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: COLORS.light.background,
        dark: COLORS.dark.background,
      }}
      headerImage={
        <GreetingCard />
      }
      headerHeight={350}
      contentStyle={{
        paddingHorizontal: 16,
        paddingBottom: 120,
        paddingTop: 16,
        backgroundColor: APP_COLORS['primary-background'],
      }}
    >
      <WellnessScoreCard />
      <QuickStatsGrid />
      <AiInsights />
      <TipCard />
      <AddJournalEntryButton />
    </ParallaxScrollView>
  );
}
