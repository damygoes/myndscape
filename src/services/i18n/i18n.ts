import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

// 1. Define translations
const translations = {
  en: { welcome: 'Hello', name: 'Charlie' },
  fr: { welcome: 'Bonjour' },
  de: { welcome: 'Hallo' },
  es: { welcome: 'Hola' },
};

export const i18n = new I18n(translations);
i18n.enableFallback = true;

// Device fallback
i18n.locale = getLocales()[0].languageCode ?? 'en';