import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

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
  'grateful',
  'peaceful',
  'content',
  'funky',
  'despair',
  'desperate',
  'craving',
  'frustrated',
  'joyful',
] as const;

export type Mood = (typeof moodKeywords)[number];

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
  grateful: 'heart-outline',
  peaceful: 'leaf-outline',
  content: 'checkmark-circle-outline',
  funky: 'happy-outline',
  despair: 'sad-outline',
  desperate: 'alert-circle-outline',
  craving: 'fast-food-outline',
  frustrated: 'close-circle-outline',
  joyful: 'happy-outline',
};

export const moodColors: Record<Mood, string> = {
  happy: COLORS.moods.happy,
  sad: COLORS.moods.sad,
  anxious: COLORS.moods.anxious,
  excited: COLORS.moods.excited,
  neutral: COLORS.moods.neutral,
  stressed: COLORS.moods.stressed,
  tired: COLORS.moods.tired,
  optimistic: COLORS.moods.optimistic,
  reflective: COLORS.moods.reflective,
  hopeful: COLORS.moods.hopeful,
  grateful: COLORS.moods.grateful,
  peaceful: COLORS.moods.peaceful,
  content: COLORS.moods.content,
  funky: COLORS.moods.funky,
  despair: COLORS.moods.despair,
  desperate: COLORS.moods.desperate,
  craving: COLORS.moods.craving,
  frustrated: COLORS.moods.frustrated,
  joyful: COLORS.moods.joyful,
};

export const tipsByMood: Record<string, string> = {
  happy: 'Keep celebrating your wins, big or small!',
  sad: 'Consider reaching out to a friend or taking a walk.',
  anxious: 'Try a quick breathing exercise to calm your mind.',
  excited: 'Channel your energy into something creative today!',
  neutral: 'Take a moment to reflect on something positive today.',
  stressed:
    'Try doing some light stretching or journaling about what’s stressing you.',
  tired: 'Prioritize rest and hydration today.',
  optimistic: 'Use your positive mindset to tackle a small goal today.',
  reflective: 'Spend some time journaling about your thoughts and experiences.',
  hopeful:
    'Hold on to that hope—use it as motivation to take one small positive action today.',
  grateful: 'Write down three things you are grateful for today.',
  peaceful: 'Take a moment to meditate or enjoy some quiet time.',
  content: 'Enjoy the moment—do something that brings you joy today.',
  funky: 'Express yourself creatively—try a new art or music style!',
  despair: 'Reach out to someone you trust for support.',
  desperate:
    'Take a step back and breathe; consider talking to a professional.',
  craving: 'Satisfy your craving with a healthy alternative or a small treat.',
  frustrated: 'Take a break and do something you enjoy to reset your mood.',
  joyful: 'Share your joy with others—spread the positivity!',
  default: 'Take 5 minutes today to breathe deeply and reset your mood.',
};
