import { View, Text, ScrollView, Pressable } from 'react-native';
import { APP_COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLogout } from '@/features/auth/hooks/useLogout';

function SettingsRow({
  title,
  subtitle,
  icon,
  onPress,
  danger = false,
}: {
  title: string;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  danger?: boolean;
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
        color={danger ? APP_COLORS.error : APP_COLORS['body-text']}
        style={{ marginRight: 16 }}
      />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            color: danger ? APP_COLORS.error : APP_COLORS['body-text'],
          }}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={{
              fontSize: 13,
              color: APP_COLORS['body-text-disabled'],
              marginTop: 2,
            }}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
      <Ionicons
        name="chevron-forward"
        size={18}
        color={danger ? APP_COLORS.error : APP_COLORS['body-text-disabled']}
      />
    </Pressable>
  );
}

export default function AccountSettings() {
  const router = useRouter();
  const { handleLogout } = useLogout();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: APP_COLORS['primary-background'],
        paddingVertical: 20,
      }}
    >
      <SettingsRow
        title="Profile Details"
        subtitle="Update your name, email and avatar"
        icon="person-outline"
        onPress={() => router.push('/settings/edit-profile')}
      />
      <SettingsRow
        title="Subscription & Billing"
        subtitle="Manage your plan and payment methods"
        icon="card-outline"
        // onPress={() => router.push("/settings/account/subscription")}
      />
      <SettingsRow
        title="Logout"
        icon="log-out-outline"
        danger
        onPress={handleLogout}
      />
      <SettingsRow
        title="Delete Account"
        subtitle="Permanently remove your account"
        icon="trash-outline"
        danger
        onPress={() => router.push('/settings/delete-account')}
      />
    </ScrollView>
  );
}
