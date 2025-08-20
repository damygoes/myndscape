import * as Linking from 'expo-linking';
import { useEffect } from 'react';
import { useAuthActions } from './useAuthActions';
import { useSupabaseSession } from '@/services/SupabaseAuthProvider';

export const useDeepLinkSession = () => {
  const { createSessionFromUrl } = useAuthActions();
  const { setSession } = useSupabaseSession();
  console.log('[DeepLink] Hook loaded');

  useEffect(() => {
    const handleDeepLink = async ({ url }: { url: string }) => {
      try {
        console.log('[DeepLink] Processing URL:', url);

        const urlObj = new URL(url);
        const fragmentParams = new URLSearchParams(urlObj.hash.substring(1));
        const queryParams = new URLSearchParams(urlObj.search.substring(1));

        // Check for OAuth callback
        const code = fragmentParams.get('code') || queryParams.get('code');

        // Check for session callback (magic link success)
        const accessToken = fragmentParams.get('access_token') || queryParams.get('access_token');
        const refreshToken = fragmentParams.get('refresh_token') || queryParams.get('refresh_token');

        // Check for verification URL
        const token = fragmentParams.get('token') || queryParams.get('token');
        const type = fragmentParams.get('type') || queryParams.get('type');

        console.log('[DeepLink] Parsed URL:', {
          code: code ? 'present' : 'missing',
          accessToken: accessToken ? 'present' : 'missing',
          refreshToken: refreshToken ? 'present' : 'missing',
          token: token ? 'present' : 'missing',
          type,
        });

        if (code || accessToken || (token && type === 'magiclink')) {
          const session = await createSessionFromUrl(url);
          if (session) {
            console.log('✅ Session established from deep link');
            setSession(session);
          } else {
            console.error('❌ Failed to create session from URL');
          }
        } else {
          console.log('ℹ️ URL does not contain auth parameters, ignoring');
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
  }, [createSessionFromUrl, setSession]);
};