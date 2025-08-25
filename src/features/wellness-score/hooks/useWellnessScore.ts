import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabase';
import { useSupabaseSession } from '@/services/SupabaseAuthProvider';
import { wellnessScoreKeys } from '@/lib/queryKeys';

type MoodScoreMap = { [key: string]: number };

const moodScores: MoodScoreMap = {
  happy: 100,
  good: 80,
  neutral: 60,
  sad: 40,
  angry: 20,
  depressed: 0,
};

function getMoodScore(mood?: string): number {
  if (!mood) return 50;
  return moodScores[mood.toLowerCase()] ?? 50;
}

export function useWellnessScore() {
  const { session } = useSupabaseSession();
  const userId = session?.user.id;

  return useQuery({
    queryKey: wellnessScoreKeys.detail(userId!),
    enabled: !!userId,
    queryFn: async () => {
      // 1. Fetch today’s entries
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const { data: entries, error } = await supabase
        .from('journal_entries')
        .select('mood, created_at')
        .eq('user_id', userId)
        .gte('created_at', startOfDay.toISOString());

      if (error) throw error;

      if (!entries || entries.length === 0) {
        // No entry today = score 0, streak resets
        const { currentStreak, longestStreak } = await calculateStreak(userId!);
        return { score: 0, currentStreak: 0, longestStreak, todayEntries: 0 };
      }

      // 2. Calculate average mood score
      const moodAvg =
        entries.reduce((sum, e) => sum + getMoodScore(e.mood), 0) /
        entries.length;

      // 3. Check streak
      const { currentStreak, longestStreak } = await calculateStreak(userId!);

      // 4. Apply bonus
      const bonus = currentStreak >= 3 ? 5 : 0; // +5% bonus for streak >= 3 days
      const score = Math.min(Math.round(moodAvg + bonus), 100);

      return {
        score,
        currentStreak,
        longestStreak,
        todayEntries: entries.length,
      };
    },
  });
}

// helper to calculate both current and longest streaks
async function calculateStreak(userId: string) {
  const { data: entries } = await supabase
    .from('journal_entries')
    .select('created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (!entries) return { currentStreak: 0, longestStreak: 0 };

  let currentStreak = 0;
  let longestStreak = 0;

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const e of entries) {
    const entryDate = new Date(e.created_at);
    entryDate.setHours(0, 0, 0, 0);

    if (entryDate.getTime() === currentDate.getTime()) {
      // entry today or consecutive day
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (entryDate.getTime() === currentDate.getTime() - 86400000) {
      // consecutive yesterday
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      // streak broken
      break;
    }
  }

  currentStreak = streak;

  // Calculate longest streak across all history
  longestStreak = calculateLongest(entries);

  return { currentStreak, longestStreak };
}

// Helper to find longest streak
function calculateLongest(entries: { created_at: string }[]) {
  if (entries.length === 0) return 0;

  let longest = 1;
  let current = 1;

  for (let i = 1; i < entries.length; i++) {
    const prev = new Date(entries[i - 1].created_at);
    const curr = new Date(entries[i].created_at);

    prev.setHours(0, 0, 0, 0);
    curr.setHours(0, 0, 0, 0);

    const diff = (prev.getTime() - curr.getTime()) / 86400000;

    if (diff === 1) {
      current++;
      longest = Math.max(longest, current);
    } else if (diff > 1) {
      current = 1;
    }
  }

  return longest;
}
