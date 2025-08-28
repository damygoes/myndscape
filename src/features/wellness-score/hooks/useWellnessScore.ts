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
        const { currentStreak, longestStreak } = await calculateStreaks(
          userId!
        );
        return { score: 0, currentStreak: 0, longestStreak, todayEntries: 0 };
      }

      // 2. Calculate average mood score
      const moodAvg =
        entries.reduce((sum, e) => sum + getMoodScore(e.mood), 0) /
        entries.length;

      // 3. Check streak
      const { currentStreak, longestStreak } = await calculateStreaks(userId!);

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
// --- Unified streak calculation ---
async function calculateStreaks(userId: string) {
  const { data: entries } = await supabase
    .from('journal_entries')
    .select('created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (!entries || entries.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // 1. Normalize to unique days
  const days = Array.from(
    new Set(
      entries.map((e) => {
        const d = new Date(e.created_at);
        d.setHours(0, 0, 0, 0);
        return d.toISOString();
      })
    )
  )
    .map((d) => new Date(d))
    .sort((a, b) => b.getTime() - a.getTime()); // newest → oldest

  // 2. Calculate current streak (starting from today)
  let currentStreak = 0;
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const day of days) {
    if (day.getTime() === today.getTime()) {
      currentStreak++;
      today.setDate(today.getDate() - 1);
    } else if (day.getTime() === today.getTime()) {
      // already handled above
      continue;
    } else {
      break; // streak broken
    }
  }

  // 3. Calculate longest streak across history
  let longestStreak = 1;
  let streak = 1;

  for (let i = 1; i < days.length; i++) {
    const diff = (days[i - 1].getTime() - days[i].getTime()) / 86400000;

    if (diff === 1) {
      streak++;
      longestStreak = Math.max(longestStreak, streak);
    } else {
      streak = 1; // reset
    }
  }

  return { currentStreak, longestStreak };
}
