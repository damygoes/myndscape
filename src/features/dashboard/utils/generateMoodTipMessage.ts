import { useAppLocale } from '@/services/i18n/useAppLocale';

export const generateIntro = (mood: string | undefined) => {
  const i18n = useAppLocale();
  if (!mood) {
    return {
      intro: i18n.t('TipCard.noMoodIntro'),
    };
  }

  const lowercaseMood = mood.charAt(0).toLowerCase() + mood.slice(1);

  return {
    intro: i18n.t('TipCard.moodIntro', { mood: lowercaseMood }),
  };
};
