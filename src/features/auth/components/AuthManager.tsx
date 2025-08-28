import { LoadingState } from '@/components/LoadingState';
import { useCurrentUserProfile } from '@/features/profile/hooks/useCurrentUserProfile';
import { useSupabaseSession } from '@/services/supabase/SupabaseAuthProvider';
import { router, useRootNavigationState } from 'expo-router';
import { useEffect } from 'react';
import { useDeepLinkSession } from '../hooks/useDeepLinkSession';

export function AuthManager({ children }: { children: React.ReactNode }) {
  useDeepLinkSession();
  const { loading: authLoading, session } = useSupabaseSession();
  const { data: user, isLoading: profileLoading } = useCurrentUserProfile();

  // Check if navigation is ready
  const rootNavigationState = useRootNavigationState();
  const isNavigationReady = rootNavigationState?.key != null;

  useEffect(() => {
    // Don't navigate until navigation is ready and auth/profile data is loaded
    if (authLoading || !isNavigationReady) {
      return;
    }

    if (!session) {
      router.replace('/onboarding');
    } else if (user && !user.isonboarded) {
      router.replace(
        `/quick-onboarding-profile-info?userId=${session?.user.id}`
      );
    } else {
      router.replace('/');
    }
  }, [isNavigationReady, authLoading, profileLoading, session, user]);

  // Only render children once everything is ready
  if (authLoading || !isNavigationReady) {
    return <LoadingState message="Loading..." />;
  }

  return <>{children}</>;
}
