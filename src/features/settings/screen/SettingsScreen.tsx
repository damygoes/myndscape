import ParallaxScrollView from '@/components/ParallaxScrollView';
import { APP_COLORS } from '@/constants/colors';
import UserProfileCard from '@/features/profile/components/UserProfileCard';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import SettingsCard from '../components/SettingsCard';

export default function SettingsScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: APP_COLORS['primary-background'],
        dark: APP_COLORS['primary-background'],
      }}
      headerImage={
        <Image
          source={require('../../../../assets/images/hero-3.jpg')}
          style={{ width: '100%', height: 200 }}
          contentFit="cover"
          cachePolicy="memory-disk"
          transition={300}
          priority="high"
        />
      }
      contentStyle={{
        paddingHorizontal: 20,
        paddingBottom: 100,
        // height: '100%',
      }}
    >
      <UserProfileCard />
      <SettingsCard
        title="General"
        subtitle="Setup notifications, theme, and preferences"
        onPress={() => router.push('/settings/general')}
      />
      <SettingsCard
        title="Wellness"
        subtitle="Customize reminders, AI features, and privacy options"
        onPress={() => router.push('/settings/wellness')}
      />
      <SettingsCard
        title="Account"
        subtitle="Manage your subscription, payment method, and account details"
        onPress={() => router.push('/settings/account')}
      />
      <SettingsCard
        title="Support"
        subtitle="Get help, send feedback, and learn more about Myndscape"
        onPress={() => router.push('/settings/support')}
      />
    </ParallaxScrollView>
  );
}
