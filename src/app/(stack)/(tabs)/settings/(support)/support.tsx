import { APP_COLORS } from '@/constants/colors';
import { SettingsRow } from '@/features/settings/components/SettingsRow';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { useRouter } from 'expo-router';
import { Linking, ScrollView } from 'react-native';

export default function SupportSettings() {
  const { t } = useAppLocale();
  const router = useRouter();

  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@yourapp.com');
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: APP_COLORS['primary-background'] }}>
      <SettingsRow
        title={t('Support.FAQs.title')}
        subtitle={t('Support.FAQs.subtitle')}
        icon="help-circle-outline"
        showChevron
        onPress={() => router.push('/(stack)/(tabs)/settings/(support)/faqs')}
      />

      <SettingsRow
        title={t('Support.Legal.title')}
        subtitle={t('Support.Legal.subtitle')}
        icon="lock-closed-outline"
        showChevron
        onPress={() => router.push('/(stack)/(tabs)/settings/(support)/legal')}
      />

      <SettingsRow
        title={t('Support.Contact.title')}
        subtitle={t('Support.Contact.subtitle')}
        icon="mail-outline"
        onPress={handleEmailSupport}
      />

      <SettingsRow
        title={t('Support.AppInfo.title')}
        subtitle={`${t('Support.AppInfo.version')}: 2.0.0`}
        icon="information-circle-outline"
      />
    </ScrollView>
  );
}
