import { LoadingState } from '@/components/LoadingState';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { COLORS } from '@/constants/colors';
import { AiInsights } from '@/features/dashboard/components/AiInsights';
import { LastEntrySummary } from '@/features/dashboard/components/LastEntrySummary';
import { MoodPrompt } from '@/features/dashboard/components/MoodPrompt';
import { QuickStats } from '@/features/dashboard/components/QuickStats';
import { TipCard } from '@/features/dashboard/components/TipCard';

export default function HomeDashboardScreen() {

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: COLORS.light.background,
        dark: COLORS.dark.background,
      }}
      headerImage={
        <Image
          source={require('../../../assets/images/hero-1.jpg')}
          style={styles.headerImage}
          contentFit="cover"
          cachePolicy="memory-disk"
          transition={300}
          priority="high"
        />
      }
    >
      <MoodPrompt />
      <LastEntrySummary />
      <QuickStats />
      <AiInsights />
      <TipCard />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: '100%',
  },
});
