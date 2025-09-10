import { LanguageSelect } from '@/components/language-select/LanguageSelect';
import { APP_COLORS } from '@/constants/colors';
import { NotificationsToggle } from '@/features/notifications/components/NotificationsToggle';
import { SettingsRow } from '@/features/settings/components/SettingsRow';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { ScrollView } from 'react-native';

export default function GeneralSettings() {
  const { t } = useAppLocale();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: APP_COLORS['primary-background'] }}>
      <SettingsRow
        title={t('Notifications.title')}
        subtitle={t('Notifications.description')}
        icon="notifications-outline"
        rightElement={<NotificationsToggle />}
      />

      {/* <SettingsRow
        title={t('Theme.title')}
        subtitle={t('Theme.description')}
        icon="color-palette-outline"
        rightElement={<ThemeSelect />}
      /> */}

      <SettingsRow
        title={t('Language.title')}
        subtitle={t('Language.description')}
        icon="globe-outline"
        rightElement={<LanguageSelect />}
      />
    </ScrollView>
  );
}
