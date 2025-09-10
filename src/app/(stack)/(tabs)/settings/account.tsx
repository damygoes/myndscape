import { APP_COLORS } from '@/constants/colors';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { SettingsRow } from '@/features/settings/components/SettingsRow';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';

export default function AccountSettings() {
  const i18n = useAppLocale();
  const router = useRouter();
  const { handleLogout } = useLogout();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: APP_COLORS['primary-background'],
        paddingBottom: 20,
      }}
    >
      <SettingsRow
        title={i18n.t('ProfileDetails.title')}
        subtitle={i18n.t('ProfileDetails.description')}
        icon="person-outline"
        onPress={() => router.push('/settings/edit-profile')}
      />
      {/* <SettingsRow
        title={i18n.t('Subscription.title')}
        subtitle={i18n.t('Subscription.description')}
        icon="card-outline"
        // onPress={() => router.push("/settings/account/subscription")}
      /> */}
      <SettingsRow
        title={i18n.t('Logout.title')}
        icon="log-out-outline"
        danger
        onPress={handleLogout}
      />
      <SettingsRow
        title={i18n.t('DeleteAccount.title')}
        subtitle={i18n.t('DeleteAccount.description')}
        icon="trash-outline"
        danger
        onPress={() => router.push('/settings/delete-account')}
      />
    </ScrollView>
  );
}
