import { Mood, moodColors, moodIcons } from '@/utils/moodUtils';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { JournalEntry } from '../types';
import { SUMMARY_TRUNCATION_LENGTH } from './constants';

export function getMoodIcon(mood: string): keyof typeof Ionicons.glyphMap {
  return moodIcons[mood.toLowerCase() as Mood] ?? 'help-circle-outline';
}

export function getMoodBadgeColor(mood: string) {
  const moodColor = moodColors[mood.toLowerCase() as Mood];
  return moodColor ?? '#7d8aa3ff';
}

export function extractMoodFromAISummary(summary: string): string {
  const moodMatch = summary.match(/Mood:\s*(\w+)/i);
  if (moodMatch && moodMatch[1]) {
    return moodMatch[1].toLowerCase(); // optional: normalize to lowercase
  }
  return 'neutral'; // fallback if parsing fails
}

export const formatRelativeDate = (dateString: string) => {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
};

export function parseThemes(themes: string | string[] | null | undefined): string[] {
  if (!themes) return [];

  // Already an array
  if (Array.isArray(themes)) {
    return themes.map((t) => t.toString().trim());
  }

  // Try parsing as JSON array string
  if (themes.trim().startsWith('[')) {
    try {
      const parsed = JSON.parse(themes);
      if (Array.isArray(parsed)) {
        return parsed.map((t) => t.toString().trim());
      }
    } catch (err) {
      console.warn('Failed to parse JSON themes:', themes);
    }
  }

  // Fallback: comma-separated string
  return themes.split(',').map((t) => t.trim());
}

export function truncateSummary(
  summary: string | null,
  maxLength = SUMMARY_TRUNCATION_LENGTH
) {
  if (!summary) return '';
  return summary.length > maxLength
    ? summary.slice(0, maxLength) + '...'
    : summary;
}

export function prepareJournalEntry(entry: JournalEntry) {
  const formattedDate = formatRelativeDate(entry.created_at);
  const themesList = parseThemes(entry.themes);
  const hasSummary = !!entry.summary;
  const hasThemes = themesList.length > 0;
  const hasTip = !!entry.tip;
  const hasAnalysis = hasSummary || hasThemes || hasTip;

  return {
    ...entry,
    formattedDate,
    themesList,
    hasSummary,
    hasThemes,
    hasTip,
    hasAnalysis,
  };
}
