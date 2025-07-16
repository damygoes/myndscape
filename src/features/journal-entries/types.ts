export type JournalEntry = {
  id: string;
  user_id: string;
  content: string;
  mood: string;
  summary: string | null;
  themes: string | null;
  tip: string | null;
  created_at: string;
};
