import ParallaxScrollView from '@/components/ParallaxScrollView';
import { APP_COLORS } from '@/constants/colors';
import UserProfileCard from '@/features/profile/components/UserProfileCard';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import SettingsCard from '../components/SettingsCard';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { useRef } from 'react';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import { SettingsScreenHeader } from '../components/SettingsScreenHeader';

export default function SettingsScreen() {
  const i18n = useAppLocale();
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  // Calculate header height (safe area top + header content)
  const headerHeight = insets.top + 96;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: APP_COLORS['primary-background'],
      }}
    >
      <SettingsScreenHeader scrollY={scrollY} />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {
            backgroundColor: APP_COLORS['primary-background'],
            paddingTop: insets.top + 32,
          },
        ]}
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
      </ScrollView>
    </SafeAreaView>

    // </ParallaxScrollView>
  );
}

{
  /* <SettingsCard
        title={i18n.t('Settings.Support.title')}
        subtitle={i18n.t('Settings.Support.description')}
        onPress={() => router.push('/settings/support')}
      /> */
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    gap: 24,
  },
});
