import { supabase } from '@/services/supabase/supabase';
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const redirectTo = makeRedirectUri({
  scheme: 'ai.myndscape',
});

console.log('🔗 Redirect URI:', redirectTo);

export const useAuthActions = () => {
  const sendMagicLink = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: redirectTo,
      },
    });

    if (error) throw error;
    console.log('✅ Magic link sent');
  };

  const createSessionFromUrl = async (url: string) => {
    try {
      const urlObj = new URL(url);
      const fragmentParams = new URLSearchParams(urlObj.hash.substring(1));
      const queryParams = new URLSearchParams(urlObj.search.substring(1));

      // Check for OAuth callback (has code and code_verifier)
      const code = fragmentParams.get('code') || queryParams.get('code');
      const codeVerifier =
        fragmentParams.get('code_verifier') || queryParams.get('code_verifier');

      // Check for session callback (has access_token and refresh_token)
      const accessToken =
        fragmentParams.get('access_token') || queryParams.get('access_token');
      const refreshToken =
        fragmentParams.get('refresh_token') || queryParams.get('refresh_token');

      // Check for verification URL (has token and type)
      const token = fragmentParams.get('token') || queryParams.get('token');
      const type = fragmentParams.get('type') || queryParams.get('type');

      if (code && codeVerifier) {
        // Handle OAuth callback with PKCE
        console.log('🔄 Processing OAuth callback');
        const { data, error } = await supabase.auth.exchangeCodeForSession(url);
        if (error) {
          console.error('❌ exchangeCodeForSession error:', error.message);
          throw error;
        }
        console.log('✅ OAuth session created:');
        return data.session;
      } else if (accessToken && refreshToken) {
        // Handle session callback (magic link success)
        console.log('🔄 Processing session callback');
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (error) {
          console.error('❌ setSession error:', error.message);
          throw error;
        }
        console.log('✅ Magic link session created:');
        return data.session;
      } else if (token && type === 'magiclink') {
        // Handle verification URL (direct token verification)
        console.log('🔄 Processing magic link verification');
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'magiclink',
        });
        if (error) {
          console.error('❌ verifyOtp error:', error.message);
          throw error;
        }
        console.log('✅ Magic link session created:');
        return data.session;
      } else {
        console.error('❌ Unknown URL format or missing parameters', {
          hasCode: !!code,
          hasAccessToken: !!accessToken,
          hasToken: !!token,
          type,
        });
        return null;
      }
    } catch (err) {
      console.error('❌ Error processing URL:', err);
      throw err;
    }
  };

  const performOAuth = async (provider: 'github' | 'google' | 'twitter') => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });

    if (error) throw error;

    const res = await WebBrowser.openAuthSessionAsync(
      data?.url ?? '',
      redirectTo
    );

    if (res.type === 'success' && res.url) {
      await createSessionFromUrl(res.url);
    }
  };

  return {
    sendMagicLink,
    createSessionFromUrl,
    performOAuth,
  };
};
