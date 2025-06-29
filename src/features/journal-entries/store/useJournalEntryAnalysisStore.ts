import { create } from 'zustand';

interface JournalEntryAnalysisState {
  analyzingIds: string[];
  startAnalyzing: (id: string) => void;
  stopAnalyzing: (id: string) => void;
}

export const useJournalEntryAnalysisStore = create<JournalEntryAnalysisState>((set) => ({
  analyzingIds: [],
  startAnalyzing: (id) =>
    set((state) => ({ analyzingIds: [...state.analyzingIds, id] })),
  stopAnalyzing: (id) =>
    set((state) => ({
      analyzingIds: state.analyzingIds.filter((entryId) => entryId !== id),
    })),
}));
