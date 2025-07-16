import { COLORS } from '@/constants/colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';

export default function HistoryStackLayout() {
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
        name="add-entry"
        options={{
          title: 'Add Entry',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="edit-entry/[id]"
        options={{
          title: 'Edit Entry',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="entry-details/[id]"
        options={{
          title: 'Entry Details',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
