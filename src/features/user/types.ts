import type { Features, PlanType } from '../paywall/types';

export type UserProfile = {
  email: string;
  username: string | null;
  isonboarded: boolean;
  created_at: string;
  avatar_url?: string | null;
  bio?: string | null;
  emotion_check?: string | null;
};

export type UserUsage = {
  plan_id: PlanType;
  entries_used: number;
  monthly_limit: number;
  entries_remaining: number;
  features: Features;
};

export type UserSettings = {
  user_id: string;
  allow_notifications: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string; // 'en', 'de', 'es', etc.
  created_at: string;
  updated_at: string;
};
