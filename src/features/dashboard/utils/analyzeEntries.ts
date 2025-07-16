import { JournalEntry } from '@/features/journal-entries/types';

export function countKeywordMentions({
  entries,
  keyword,
  since,
}: {
  entries: JournalEntry[];
  keyword: string;
  since: Date;
}) {
  const lowerKeyword = keyword.toLowerCase();
  return entries.filter((entry) => {
    const createdAt = new Date(entry.created_at);
    const textToSearch = [
      entry.content,
      entry.summary ?? '',
      entry.themes ?? '',
    ]
      .join(' ')
      .toLowerCase();

    return createdAt >= since && textToSearch.includes(lowerKeyword);
  }).length;
}

export function countMultipleKeywordMentions({
  entries,
  keywords,
  since,
}: {
  entries: JournalEntry[];
  keywords: string[];
  since: Date;
}) {
  const lowerKeywords = keywords.map((k) => k.toLowerCase());

  const result: Record<string, number> = {};

  for (const keyword of lowerKeywords) {
    result[keyword] = entries.filter((entry) => {
      const createdAt = new Date(entry.created_at);
      const text = [entry.content, entry.summary ?? '', entry.themes ?? '']
        .join(' ')
        .toLowerCase();
      return createdAt >= since && text.includes(keyword);
    }).length;
  }

  return result;
}
