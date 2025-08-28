import { Plan, type PlanDefinition } from './types';

export const plans: PlanDefinition[] = [
  {
    id: Plan.FREE,
    name: 'Free',
    price: '€0',
    featuresText: ['✓ Summaries of your journal entries', '✓ Mood detection'],
    featureFlags: {
      ai: { summary: true, themes: false, tips: false },
    },
  },
  {
    id: Plan.PREMIUM,
    name: 'Premium',
    price: '€9.99/mo',
    featuresText: [
      '✓ Summaries of your journal entries',
      '✓ Mood detection',
      '✓ Theme identification (stress, joy, fatigue, and more)',
      '✓ Personalized coping tips',
      '✓ Export your journals as PDF',
      '✓ Priority support whenever you need help',
    ],
    featureFlags: {
      ai: { summary: true, themes: true, tips: true },
    },
    badge: 'Most Popular',
  },
];
