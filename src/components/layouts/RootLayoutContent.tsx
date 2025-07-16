import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useSupabaseSession } from '@/services/SupabaseAuthProvider';
import { useEffect } from 'react';
import { LoadingState } from '../LoadingState';

export function RootLayoutContent() {
  const { loading: authLoading, session } = useSupabaseSession();
  const colorScheme = useColorScheme();

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
      <Slot />
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}
