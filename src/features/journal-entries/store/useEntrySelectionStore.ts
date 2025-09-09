import { create } from 'zustand';
import { JournalEntry } from '../types';

interface EntrySelectionStore {
  selectionMode: boolean;
  selectedIds: Set<string>;

  // actions
  setSelectionMode: (mode: boolean) => void;
  toggleEntry: (entry: JournalEntry) => void;
  setSelectedEntries: (entries: JournalEntry[]) => void;
  clearSelection: () => void;
  selectAll: (entries: JournalEntry[]) => void;

  // derived helpers
  isSelected: (entry: JournalEntry) => boolean;
  isAllSelected: (allEntries: JournalEntry[]) => boolean;
}

export const useEntrySelectionStore = create<EntrySelectionStore>((set, get) => ({
  selectionMode: false,
  selectedIds: new Set(),

  setSelectionMode: (mode) => set({ selectionMode: mode }),

  toggleEntry: (entry) => {
    set((state) => {
      const newIds = new Set(state.selectedIds);
      if (newIds.has(entry.id)) {
        newIds.delete(entry.id);
      } else {
        newIds.add(entry.id);
      }
      return { selectedIds: newIds };
    });
  },

  setSelectedEntries: (entries) => set({ selectedIds: new Set(entries.map((e) => e.id)) }),

  clearSelection: () => set({ selectedIds: new Set() }),

  selectAll: (entries) => set({ selectedIds: new Set(entries.map((e) => e.id)) }),

  isSelected: (entry) => get().selectedIds.has(entry.id),

  isAllSelected: (allEntries) => {
    const { selectedIds } = get();
    return allEntries.length > 0 && allEntries.every((e) => selectedIds.has(e.id));
  },
}));
