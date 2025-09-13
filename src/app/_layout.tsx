import { AuthManager } from '@/features/auth/components/AuthManager';
import { UserProfileProvider } from '@/features/user/contexts/UserProfileContext';
import { UserSettingsProvider } from '@/features/user/contexts/UserSettingsContext';
import { UserUsageProvider } from '@/features/user/contexts/UserUsageContext';
import { SupabaseAuthProvider } from '@/services/supabase/SupabaseAuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import '../../polyfills';

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Manrope: require('../../assets/fonts/Manrope-VariableFont_wght.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SupabaseAuthProvider>
      <QueryClientProvider client={queryClient}>
        <AuthManager>
          <UserProfileProvider>
            <UserSettingsProvider>
              <UserUsageProvider>
                <Slot />
              </UserUsageProvider>
            </UserSettingsProvider>
          </UserProfileProvider>
        </AuthManager>
        <StatusBar style="dark" animated={true} translucent={true} />
      </QueryClientProvider>
    </SupabaseAuthProvider>
  );
}
