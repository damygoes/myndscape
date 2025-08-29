import { useEffect } from 'react';
import { useUserSettingsContext } from '@/features/user/contexts/UserSettingsContext';
import { i18n as i18nInstance } from './i18n';

export function useAppLocale() {
  const { data } = useUserSettingsContext();

  useEffect(() => {
    if (data?.language) {
      i18nInstance.locale = data.language;
    }
  }, [data?.language]);

  return {
    t: i18nInstance.t.bind(i18nInstance),
    changeLanguage: (lang: string) => {
      i18nInstance.locale = lang;
    },
    locale: i18nInstance.locale,
  };
}
