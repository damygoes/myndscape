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

      if (url.includes('access_token') && url.includes('type=magiclink')) {
        const session = await createSessionFromUrl(url);

        if (session) {
          console.log('✅ Session established, redirecting to dashboard');
          router.replace('/');
        }
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => subscription.remove();
  }, []);
};
