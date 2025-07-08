import { supabase } from '@/services/supabase';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const appEnv = Constants.expoConfig?.extra?.EXPO_PUBLIC_APP_ENV;

console.log("🌍 APP_ENV in useAuthActions:", appEnv);

if (!appEnv) {
  throw new Error('APP_ENV is not defined in the app configuration');
}
const isDev = appEnv === 'development';

const redirectTo = isDev
  ? 'ai.reflect-dev://auth/callback'
  : 'ai.reflect://auth/callback';

console.log('🔗 Redirect URI:', redirectTo)

export const useAuthActions = () => {
  const sendMagicLink = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) throw error;
    console.log('✅ Magic link sent');
  };

  const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);

    if (errorCode) throw new Error(errorCode);

    const { access_token, refresh_token } = params;
    if (!access_token) return;

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (error) throw error;
    return data.session;
  };

  const performOAuth = async (
    provider: 'github' | 'google' | 'twitter' // etc
  ) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });

    if (error) throw error;

    const res = await WebBrowser.openAuthSessionAsync(data?.url ?? '', redirectTo);

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