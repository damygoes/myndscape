import * as Linking from 'expo-linking';
import { useEffect } from 'react';
import { useAuthActions } from './useAuthActions';
import { useSupabaseSession } from '@/services/SupabaseAuthProvider';

export const useDeepLinkSession = () => {
  const { createSessionFromUrl } = useAuthActions();
  const { setSession } = useSupabaseSession(); // only set session
  console.log('[DeepLink] Hook loaded');

  useEffect(() => {
    const handleDeepLink = async ({ url }: { url: string }) => {
      try {
        const urlObj = new URL(url);
        const fragmentParams = new URLSearchParams(urlObj.hash.substring(1));
        const queryParams = new URLSearchParams(urlObj.search.substring(1));

        const accessToken =
          fragmentParams.get('access_token') || queryParams.get('access_token');
        const type = fragmentParams.get('type') || queryParams.get('type');
        console.log('[DeepLink] Parsed URL:', {
          accessToken,
          type,
          url,
        });

        if (accessToken && (type === 'magiclink' || type === 'signup')) {
          const session = await createSessionFromUrl(url);
          if (session) {
            console.log('✅ Session established');
            console.log('✅ Session in useDeepLinkSession:', session);
            setSession(session); // update context
          } else {
            console.error('❌ Failed to create session from URL');
          }
        }
      } catch (err) {
        console.error('❌ Failed to parse deep link URL:', err);
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => subscription.remove();
  }, []);
};
