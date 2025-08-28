import ParallaxScrollView from '@/components/ParallaxScrollView';
import { APP_COLORS } from '@/constants/colors';
import { AddJournalEntryButton } from '@/features/dashboard/components/AddJournalEntryButton';
import { AiInsights } from '@/features/dashboard/components/AiInsights';
import { GreetingCard } from '@/features/dashboard/components/GreetingCard';
import { QuickStatsGrid } from '@/features/dashboard/components/QuickStatsGrid';
import { TipCard } from '@/features/dashboard/components/TipCard';
import { WellnessScoreCard } from '@/features/wellness-score/components/WellnessScoreCard';
import { Text, View } from 'react-native';

export default function HomeDashboardScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: APP_COLORS['primary-background'],
        dark: APP_COLORS['primary-background'],
      }}
      headerImage={<GreetingCard />}
      headerHeight={300}
      contentStyle={{
        paddingHorizontal: 16,
        paddingBottom: 120,
        backgroundColor: APP_COLORS['primary-background'],
      }}
    >
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: '400', color: APP_COLORS['body-text'], fontFamily: 'Manrope' }}>
          Welcome to <Text style={{ fontWeight: '600', fontFamily: 'Manrope', color: APP_COLORS.primary }}>Myndscape</Text> 😊
        </Text>
      </View>
      <WellnessScoreCard />
      <QuickStatsGrid />
      <AiInsights />
      <TipCard />
      <AddJournalEntryButton />
    </ParallaxScrollView>
  );
}
