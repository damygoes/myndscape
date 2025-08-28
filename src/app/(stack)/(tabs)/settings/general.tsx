import { ThemeSelect } from '@/components/theme-select/ThemeSelect';
import { APP_COLORS } from '@/constants/colors';
import { LanguageSelect } from '@/features/language-selection/components/LanguageSelect';
import { NotificationsToggle } from '@/features/notifications/components/NotificationsToggle';
import { Ionicons } from '@expo/vector-icons';
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
  rightElement?: React.ReactNode;
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
      <Ionicons
        name={icon}
        size={20}
        color={APP_COLORS['body-text']}
        style={{ marginRight: 16 }}
      />
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
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: APP_COLORS['primary-background'] }}
    >
      <SettingsRow
        title="Notifications"
        subtitle="Reminders and journaling check-ins"
        icon="notifications-outline"
        rightElement={<NotificationsToggle />}
      />

      <SettingsRow
        title="Theme"
        subtitle="Light, dark, or system default"
        icon="color-palette-outline"
        rightElement={<ThemeSelect />}
      />

      <SettingsRow
        title="Language"
        subtitle="Select your preferred language"
        icon="globe-outline"
        rightElement={<LanguageSelect />}
      />
    </ScrollView>
  );
}
