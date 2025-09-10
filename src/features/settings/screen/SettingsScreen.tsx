import { APP_COLORS } from '@/constants/colors';
import UserProfileCard from '@/features/profile/components/UserProfileCard';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { router } from 'expo-router';
import { useRef } from 'react';
import { Animated, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import SettingsCard from '../components/SettingsCard';
import { SettingsScreenHeader } from '../components/SettingsScreenHeader';

export default function SettingsScreen() {
  const i18n = useAppLocale();
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

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
        <SettingsCard
          title={i18n.t('Settings.Support.title')}
          subtitle={i18n.t('Settings.Support.description')}
          onPress={() => router.push('/settings/support')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    gap: 24,
  },
});
