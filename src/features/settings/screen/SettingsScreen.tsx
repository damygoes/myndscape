import ParallaxScrollView from '@/components/ParallaxScrollView';
import { APP_COLORS } from '@/constants/colors';
import UserProfileCard from '@/features/profile/components/UserProfileCard';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import SettingsCard from '../components/SettingsCard';
import { useAppLocale } from '@/services/i18n/useAppLocale';

export default function SettingsScreen() {
  const i18n = useAppLocale();

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
      }}
    >
      <UserProfileCard />
      <SettingsCard
        title={i18n.t('Settings.General.title')}
        subtitle={i18n.t('Settings.General.description')}
        onPress={() => router.push('/settings/general')}
      />
      {/* <SettingsCard
        title={i18n.t('Settings.Wellness.title')}
        subtitle={i18n.t('Settings.Wellness.description')}
        onPress={() => router.push('/settings/wellness')}
      /> */}
      <SettingsCard
        title={i18n.t('Settings.Account.title')}
        subtitle={i18n.t('Settings.Account.description')}
        onPress={() => router.push('/settings/account')}
      />
      {/* <SettingsCard
        title={i18n.t('Settings.Support.title')}
        subtitle={i18n.t('Settings.Support.description')}
        onPress={() => router.push('/settings/support')}
      /> */}
    </ParallaxScrollView>
  );
}
