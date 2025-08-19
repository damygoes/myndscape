import { supabase } from '@/services/supabase';
import { makeRedirectUri } from 'expo-auth-session';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
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
    const { data, error } = await supabase.auth.exchangeCodeForSession(url);
    if (error) {
      console.error("❌ exchangeCodeForSession error:", error.message);
      throw error;
    }
    console.log("✅ Session created:", data.session);
    return data.session;
  };


  // const createSessionFromUrl = async (url: string) => {
  //   const { params, errorCode } = QueryParams.getQueryParams(url);
  //   if (errorCode) throw new Error(errorCode);
  //   const { access_token, refresh_token } = params;
  //   if (!access_token) return;
  //   const { data, error } = await supabase.auth.setSession({
  //     access_token,
  //     refresh_token,
  //   });
  //   if (error) throw error;
  //   return data.session;
  // };

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
