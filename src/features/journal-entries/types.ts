export type JournalEntry = {
  id: string;
  user_id: string;
  content: string;
  mood: string;
  summary: string | null;
  themes: string | null;
  tip: string | null;
  created_at: string;
  mood_score: number | null;
  localized: Record<string, AnalysedEntry>;
};

interface AnalysedEntry {
  mood: string;
  mood_score: number;
  themes: string;
  summary: string;
  tip: string;
};

export interface LocalisedAnalysedEntry extends AnalysedEntry {
  localized: Record<string, AnalysedEntry>;
};