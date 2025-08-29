import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

import en from '@/translations/en.json';
import de from '@/translations/de.json';
import fr from '@/translations/fr.json';

// 1. Define translations
export const i18n = new I18n({
  en,
  fr,
  de,
});

i18n.enableFallback = true;

// Device fallback
i18n.locale = getLocales()[0].languageCode ?? 'en';
