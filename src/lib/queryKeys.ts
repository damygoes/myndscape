export const journalEntriesKeys = {
    all: ['journal_entries'] as const,
    list: () => [...journalEntriesKeys.all, 'list'] as const,
    detail: (id: string) => [...journalEntriesKeys.all, 'detail', id] as const,
};
  