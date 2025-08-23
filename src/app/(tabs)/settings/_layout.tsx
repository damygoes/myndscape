import { COLORS } from '@/constants/colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';

export default function ProfileStackLayout() {
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
          title: 'Edit Profile',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="general"
        options={{
          title: 'General',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="account"
        options={{
          title: 'Account',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="wellness"
        options={{
          title: 'Wellness',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="support"
        options={{
          title: 'Support',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="delete-account"
        options={{
          title: 'Delete Account',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
