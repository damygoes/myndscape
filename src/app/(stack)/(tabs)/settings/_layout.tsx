import { COLORS } from '@/constants/colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { Stack } from 'expo-router';

export default function ProfileStackLayout() {
  const i18n = useAppLocale();
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        },
        headerBackTitle: i18n.t('Common.back'),
        gestureEnabled: true, // enable swipe back gestures
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerShadowVisible: false,
          headerShown: false, // no header for main profile
        }}
      />
      <Stack.Screen
        name="edit-profile"
        options={{
          title: i18n.t('ProfileDetails.title'),
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="general"
        options={{
          title: i18n.t('Settings.General.title'),
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="account"
        options={{
          title: i18n.t('Settings.Account.title'),
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="(support)/support"
        options={{
          title: i18n.t('Settings.Support.title'),
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="delete-account"
        options={{
          title: i18n.t('DeleteAccount.title'),
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="(support)/faqs"
        options={{
          headerShown: false,
          title: i18n.t('Support.FAQs.title'),
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="(support)/legal"
        options={{
          title: i18n.t('Support.Legal.title'),
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
