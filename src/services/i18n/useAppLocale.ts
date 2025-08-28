import { useEffect } from 'react';
import { useUserSettingsContext } from '@/features/user/contexts/UserSettingsContext';
import { i18n } from './i18n';

export function useAppLocale() {
  const { data } = useUserSettingsContext();

  useEffect(() => {
    if (data?.language) {
      i18n.locale = data.language; // set locale from user settings
    }
  }, [data?.language]);

  return i18n;
}