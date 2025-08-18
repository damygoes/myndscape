import type { Features, PlanType } from '../paywall/types';

export type UserProfile = {
  email: string;
  display_name?: string | null;
  fullname?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  created_at?: string;
};

export type UserUsage = {
  plan_id: PlanType;
  entries_used: number;
  monthly_limit: number;
  entries_remaining: number;
  features: Features;
};
