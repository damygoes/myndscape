import { SupabaseAuthProvider } from '@/services/SupabaseAuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../../global.css';
import '../../polyfills';
import { StatusBar } from 'expo-status-bar';
import { AuthManager } from '@/features/auth/components/AuthManager';


const queryClient = new QueryClient();

export default function RootLayout() {

  return (
    <SupabaseAuthProvider>
      <QueryClientProvider client={queryClient}>
        <AuthManager />
        <StatusBar style="dark" animated={true} translucent={true} />
      </QueryClientProvider>
    </SupabaseAuthProvider>
  );
}
