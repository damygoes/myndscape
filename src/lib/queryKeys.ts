export const journalEntriesKeys = {
  all: ['journal_entries'] as const,
  list: (opts?: { userId?: string | null; search?: string; sortOrder?: string }) =>
    [...journalEntriesKeys.all, 'list', opts ?? {}] as const,
  detail: (id: string) => [...journalEntriesKeys.all, 'detail', id] as const,
};

export const userProfileKeys = {
  all: ['user_profile'] as const,
  detail: (userId: string) => [...userProfileKeys.all, 'detail', userId] as const,
};

export const wellnessScoreKeys = {
  all: ['wellnessScore'] as const,
  detail: (userId: string) => [...wellnessScoreKeys.all, userId] as const,
};

export const userSettingsKeys = {
  all: ['user_settings'] as const,
  detail: (userId: string) => [...userSettingsKeys.all, 'detail', userId] as const,
};
