export type JournalEntry = {
    id: string;
    user_id: string;
    content: string;
    mood: string;
    ai_summary?: string | null;
    created_at: string;
};
  