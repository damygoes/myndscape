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
    happy: 'bg-yellow-200 text-yellow-800',
    sad: 'bg-blue-200 text-blue-800',
    anxious: 'bg-red-200 text-red-800',
    excited: 'bg-green-200 text-green-800',
    neutral: 'bg-gray-300 text-gray-800',
    stressed: 'bg-red-300 text-red-900',
    tired: 'bg-purple-200 text-purple-800',
    optimistic: 'bg-green-100 text-green-800',
    reflective: 'bg-indigo-200 text-indigo-800',
    hopeful: 'bg-orange-200 text-orange-800',
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
  