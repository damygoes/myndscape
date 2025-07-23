import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Slot } from 'expo-router';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { COLORS } from '@/constants/colors';
import { useDeepLinkSession } from '@/features/auth/hooks/useDeepLinkSession';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSupabaseSession } from '@/services/SupabaseAuthProvider';
import { useEffect } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LoadingState } from '../LoadingState';

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
      router.replace('/login');
    }
  }, [authLoading, session]);

  if ((authLoading || !fontsLoaded) && session) {
    return <LoadingState />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View
        style={{
          height:
            insets.top ||
            (Platform.OS === 'android' ? StatusBar.currentHeight : 44),
          backgroundColor,
          zIndex: 10,
        }}
      />
      <Slot />
      <ExpoStatusBar
        translucent={false}
        backgroundColor={
          colorScheme === 'dark'
            ? COLORS.dark.background
            : COLORS.light.background
        }
        style={colorScheme === 'dark' ? 'light' : 'dark'}
      />
    </ThemeProvider>
  );
}
