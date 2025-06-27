import { AuthProvider } from '@/features/auth/components/AuthContext';
import { AppThemeProvider } from '@/providers/theme/AppThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import '../../global.css';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Slot />
        </QueryClientProvider>
      </AppThemeProvider>
    </AuthProvider>
  );
}
