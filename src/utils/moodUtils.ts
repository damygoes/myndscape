import { Ionicons } from '@expo/vector-icons';
import { colors } from './colors';

export const moodKeywords = [
    'happy',
    'sad',
    'anxious',
    'excited',
    'neutral',
    'stressed',
    'tired',
    'optimistic',
    'reflective',
    'hopeful',
] as const;
  
  export type Mood = typeof moodKeywords[number];
  
  
  export const moodIcons: Record<Mood, keyof typeof Ionicons.glyphMap> = {
    happy: 'happy-outline',
    sad: 'sad-outline',
    anxious: 'alert-circle-outline',
    excited: 'rocket-outline',
    neutral: 'remove-circle-outline',
    stressed: 'alert-outline',
    tired: 'bed-outline',
    optimistic: 'aperture-outline',
    reflective: 'book-outline',
    hopeful: 'sunny-outline',
};
  
  
export const moodColors: Record<Mood, string> = {
    happy: colors.moods.happy,
    sad: colors.moods.sad,
    anxious: colors.moods.anxious,
    excited: colors.moods.excited,
    neutral: colors.moods.neutral,
    stressed: colors.moods.stressed,
    tired: colors.moods.tired,
    optimistic: colors.moods.optimistic,
    reflective: colors.moods.reflective,
    hopeful: colors.moods.hopeful
};

export const tipsByMood: Record<string, string> = {
    happy: 'Keep celebrating your wins, big or small!',
    sad: 'Consider reaching out to a friend or taking a walk.',
    anxious: 'Try a quick breathing exercise to calm your mind.',
    excited: 'Channel your energy into something creative today!',
    neutral: 'Take a moment to reflect on something positive today.',
    stressed: 'Try doing some light stretching or journaling about what’s stressing you.',
    tired: 'Prioritize rest and hydration today.',
    optimistic: 'Use your positive mindset to tackle a small goal today.',
    reflective: 'Spend some time journaling about your thoughts and experiences.',
    hopeful: 'Hold on to that hope—use it as motivation to take one small positive action today.',
    default: 'Take 5 minutes today to breathe deeply and reset your mood.',
};
  