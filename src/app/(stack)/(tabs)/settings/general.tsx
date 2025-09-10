import { LanguageSelect } from '@/components/language-select/LanguageSelect';
import { APP_COLORS } from '@/constants/colors';
import { NotificationsToggle } from '@/features/notifications/components/NotificationsToggle';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

function SettingsRow({
  title,
  subtitle,
  icon,
  rightElement,
  onPress,
}: {
  title: string;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  rightElement?: ReactNode;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
        backgroundColor: APP_COLORS.offwhite,
        borderBottomWidth: 1,
        borderBottomColor: APP_COLORS['body-text-disabled'] + '20',
      }}
    >
      <Ionicons name={icon} size={20} color={APP_COLORS['body-text']} style={{ marginRight: 16 }} />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            color: APP_COLORS['body-text'],
          }}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={{
              fontSize: 13,
              color: APP_COLORS['body-text-disabled'],
              marginTop: 2,
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>
      {rightElement}
    </Pressable>
  );
}

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
