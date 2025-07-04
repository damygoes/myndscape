import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuthActions } from './useAuthActions';

export const useDeepLinkSession = () => {
  const { createSessionFromUrl } = useAuthActions();
  const router = useRouter();

  useEffect(() => {
    const handleDeepLink = async ({ url }: { url: string }) => {
    console.log('Deep link URL:', url);

    try {
      const urlObj = new URL(url);
      const fragment = urlObj.hash.substring(1); // remove leading '#'
      const params = new URLSearchParams(fragment);

      const accessToken = params.get('access_token');
      const type = params.get('type');

      if (accessToken && (type === 'magiclink' || type === 'signup')) {
        const session = await createSessionFromUrl(url);

        if (session) {
          console.log('✅ Session established, redirecting to dashboard');
          router.replace('/');
        }
      }
    } catch (err) {
      console.error('Failed to parse deep link URL:', err);
    }
  };


    const subscription = Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => subscription.remove();
  }, []);
};
