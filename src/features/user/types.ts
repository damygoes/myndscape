export type UserProfile = {
  email: string;
  display_name?: string | null;
  fullname?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  created_at?: string;
};

export type UserUsage = {
  plan_id: string;
  entries_used: number;
  monthly_limit: number;
  entries_remaining: number;
  features: { ai: { summary: boolean; themes: boolean; tips: boolean } };
};