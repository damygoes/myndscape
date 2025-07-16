import { RootLayoutContent } from '@/components/layouts/RootLayoutContent';
import { SupabaseAuthProvider } from '@/services/SupabaseAuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../../global.css';
import '../../polyfills';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <SupabaseAuthProvider>
      <QueryClientProvider client={queryClient}>
        <RootLayoutContent />
      </QueryClientProvider>
    </SupabaseAuthProvider>
  );
}
