import { router, Slot, Stack } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Platform, StatusBar, View } from 'react-native';
import { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import 'react-native-reanimated';

import { COLORS } from '@/constants/colors';
import { useDeepLinkSession } from '@/features/auth/hooks/useDeepLinkSession';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSupabaseSession } from '@/services/SupabaseAuthProvider';
import { LoadingState } from '../LoadingState';
import { UserUsageProvider } from '@/features/user/contexts/UserUsageContext';

export function RootLayoutContent() {
  useDeepLinkSession();
  const { loading: authLoading, session } = useSupabaseSession();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  const backgroundColor =
    colorScheme === 'dark' ? COLORS.dark.background : COLORS.light.background;

  const [fontsLoaded] = useFonts({
    SpaceMono: require('../../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (!authLoading && !session) {
      router.replace('/welcome');
    }
  }, [authLoading, session]);

  if ((authLoading || !fontsLoaded) && session) {
    return <LoadingState />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <UserUsageProvider>
        <View
          style={{
            height:
              insets.top ||
              (Platform.OS === 'android' ? StatusBar.currentHeight : 44),
            backgroundColor,
            zIndex: 10,
          }}
        />

        {/* Root stack */}
        <Stack screenOptions={{ headerShown: false }}>
          {/* normal bottom tabs */}
          <Stack.Screen name="(tabs)/_layout" />

          {/* Global Paywall Modal */}
          <Stack.Screen
            name="paywall"
            options={{
              presentation: 'modal',
              headerShown: false,
              headerTransparent: true,
              headerShadowVisible: false,
              headerTintColor: colorScheme === 'dark' ? COLORS.dark.textPrimary : COLORS.light.textPrimary,
              title: 'Paywall',
              gestureEnabled: true,
            }}
          />
        </Stack>

        <ExpoStatusBar
          translucent={false}
          backgroundColor={backgroundColor}
          style={colorScheme === 'dark' ? 'light' : 'dark'}
        />
      </UserUsageProvider>
    </ThemeProvider>
  );
}
