import { SupabaseAuthProvider } from '@/services/SupabaseAuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../../global.css';
import '../../polyfills';
import { StatusBar } from 'expo-status-bar';
import { AuthManager } from '@/features/auth/components/AuthManager';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { UserProfileProvider } from '@/features/user/contexts/UserProfileContext';
import { UserUsageProvider } from '@/features/user/contexts/UserUsageContext';

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
            <UserUsageProvider>
              <Slot />
            </UserUsageProvider>
          </UserProfileProvider>
        </AuthManager>
        <StatusBar style="dark" animated={true} translucent={true} />
      </QueryClientProvider>
    </SupabaseAuthProvider>
  );
}
