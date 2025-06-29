import { create } from 'zustand';
import { JournalEntry } from '../types';

interface JournalEntriesStore {
  entries: JournalEntry[] | null;
  setEntries: (entries: JournalEntry[]) => void;
  clearEntries: () => void;
}

export const useJournalEntriesStore = create<JournalEntriesStore>((set) => ({
  entries: null,
  setEntries: (entries) => set({ entries }),
  clearEntries: () => set({ entries: null }),
}));
