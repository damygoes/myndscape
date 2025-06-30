import { moodKeywords, tipsByMood } from '@/utils/moodUtils';

export const getTipForMood = (mood?: string): string => {
  if (!mood) return tipsByMood.default;

  const normalizedMood = mood.toLowerCase();

  // ✅ Direct exact match
  if (tipsByMood[normalizedMood]) {
    return tipsByMood[normalizedMood];
  }

  // ✅ Optional: Fuzzy keyword matching (only if you want partial mood detection)
  const matchedKeyword = moodKeywords.find((keyword) =>
    normalizedMood.includes(keyword.toLowerCase())
  );

  if (matchedKeyword && tipsByMood[matchedKeyword]) {
    return tipsByMood[matchedKeyword];
  }

  // ✅ Fallback to default tip
  return tipsByMood.default;
};