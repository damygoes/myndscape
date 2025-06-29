import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { SUMMARY_TRUNCATION_LENGTH } from './constants';

export const moodIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  happy: 'happy-outline',
  anxious: 'alert-circle-outline',
  neutral: 'remove-circle-outline',
  excited: 'rocket-outline',
  sad: 'sad-outline',
  tired: 'bed-outline',
  reflective: 'book-outline',
  optimistic: 'aperture-outline'
};


export const moodColors: Record<string, string> = {
  happy: 'bg-yellow-200 text-yellow-800',
  anxious: 'bg-red-200 text-red-800',
  neutral: 'bg-gray-300 text-gray-800',
  excited: 'bg-green-200 text-green-800',
  sad: 'bg-blue-200 text-blue-800',
  tired: 'bg-purple-200 text-purple-800',
  reflective: 'bg-indigo-200 text-indigo-800',
  optimistic: 'bg-green-100 text-green-800'
};

export function getMoodBadgeColor(mood: string) {
  return moodColors[mood.toLowerCase()] ?? 'bg-gray-300 text-gray-800';
}


export function extractMoodFromAISummary(summary: string): string {
  const moodMatch = summary.match(/Mood:\s*(\w+)/i);
  if (moodMatch && moodMatch[1]) {
    return moodMatch[1].toLowerCase();  // optional: normalize to lowercase
  }
  return 'neutral'; // fallback if parsing fails
}

export const formatRelativeDate = (dateString: string) => {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
};

export function parseThemes(themes: string | null | undefined): string[] {
  if (!themes) return [];

  // Try parsing as JSON array
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

  // Fallback: treat as comma-separated string
  return themes.split(',').map((t) => t.trim());
}

export function truncateSummary(summary: string | null, maxLength = SUMMARY_TRUNCATION_LENGTH) {
  if (!summary) return '';
  return summary.length > maxLength ? summary.slice(0, maxLength) + '...' : summary;
}