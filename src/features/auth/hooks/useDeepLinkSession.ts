import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuthActions } from './useAuthActions';

export const useDeepLinkSession = () => {
  const { createSessionFromUrl } = useAuthActions();
  const router = useRouter();

  useEffect(() => {
    const handleDeepLink = async ({ url }: { url: string }) => {
      try {
        const urlObj = new URL(url);
        const fragmentParams = new URLSearchParams(urlObj.hash.substring(1));
        const queryParams = new URLSearchParams(urlObj.search.substring(1));

        const accessToken =
          fragmentParams.get('access_token') || queryParams.get('access_token');
        const type = fragmentParams.get('type') || queryParams.get('type');

        if (accessToken && (type === 'magiclink' || type === 'signup')) {
          const session = await createSessionFromUrl(url);
          if (session) {
            console.log('✅ Session established');
            router.replace('/');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
