import { COLORS } from '@/constants/colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { Stack } from 'expo-router';

export default function HistoryStackLayout() {
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
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="entry-details/[id]"
        options={{
          title: i18n.t('JournalEntryDetails.title'),
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
