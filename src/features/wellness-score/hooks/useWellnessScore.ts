import { wellnessScoreKeys } from '@/lib/queryKeys';
import { supabase } from '@/services/supabase/supabase';
import { useSupabaseSession } from '@/services/supabase/SupabaseAuthProvider';
import { useQuery } from '@tanstack/react-query';

export function useWellnessScore() {
  const { session } = useSupabaseSession();
  const userId = session?.user.id;

  return useQuery({
    queryKey: wellnessScoreKeys.detail(userId!),
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) throw new Error('No user ID found');

      // 1. Fetch today’s entries
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const { data: todayEntries, error: todayError } = await supabase
        .from('journal_entries')
        .select('mood_score, created_at')
        .eq('user_id', userId)
        .gte('created_at', startOfDay.toISOString());

      if (todayError) throw todayError;

      // 2. Fetch last 30 days of entries
      const startOfWindow = new Date();
      startOfWindow.setDate(startOfWindow.getDate() - 30);
      startOfWindow.setHours(0, 0, 0, 0);

      const { data: recentEntries, error: recentError } = await supabase
        .from('journal_entries')
        .select('mood_score, created_at')
        .eq('user_id', userId)
        .gte('created_at', startOfWindow.toISOString());

      if (recentError) throw recentError;

      // 3. Fetch all-time entries (for milestones & total entries)
      const { count: totalEntries, error: totalError } = await supabase
        .from('journal_entries')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      if (totalError) throw totalError;

      // --- Stats ---
      const { currentStreak, longestStreak } = await calculateStreak(userId);

      // ✅ Today’s score
      let wellnessScore = 0;

      if (todayEntries && todayEntries.length > 0) {
        const moodAvg =
          todayEntries.reduce((sum, e) => sum + (e.mood_score ?? 50), 0) /
          todayEntries.length;

        const bonus = currentStreak >= 3 ? 5 : 0;
        wellnessScore = Math.round((moodAvg + bonus) * 100) / 100;
      } else if (recentEntries && recentEntries.length > 0) {
        // fallback to average mood score over last 30 days
        const moodAvg =
          recentEntries.reduce((sum, e) => sum + (e.mood_score ?? 50), 0) /
          recentEntries.length;

        wellnessScore = Math.round(moodAvg * 100) / 100;
      }

      // 4. Fetch mood score for the latest entry
      const { data: latestEntry } = await supabase
        .from('journal_entries')
        .select('mood_score')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1);

      const latestEntryMoodScore = latestEntry?.[0]?.mood_score ?? 0;

      return {
        score: latestEntryMoodScore, // Today’s score %
        wellnessScore, // Raw avg from today’s entries
        todayEntries: todayEntries?.length ?? 0,
        currentStreak,
        longestStreak,
        consistencyPercent: calculateConsistency(recentEntries),
        totalEntries: totalEntries ?? 0, // ✅ all-time
      };
    },
  });
}

// --- Helpers ---
function calculateConsistency(entries: { created_at: string }[]) {
  if (!entries || entries.length === 0) return 0;

  const uniqueDays = new Set(
    entries.map((e) => {
      const d = new Date(e.created_at);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    })
  );

  return Math.round((uniqueDays.size / 30) * 100);
}

async function calculateStreak(userId: string) {
  const { data: entries } = await supabase
    .from('journal_entries')
    .select('created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (!entries || entries.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // Deduplicate entries by day
  const uniqueDays = Array.from(
    new Set(
      entries.map((e) => {
        const d = new Date(e.created_at);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
      })
    )
  ).sort((a, b) => b - a); // newest first

  // Calculate current streak
  let streak = 0;
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const day of uniqueDays) {
    if (day === today.getTime()) {
      streak++;
      today.setDate(today.getDate() - 1);
    } else if (day === today.getTime() - 86400000) {
      streak++;
      today.setDate(today.getDate() - 1);
    } else {
      break; // gap found, stop counting
    }
  }

  // Calculate longest streak
  const longestStreak = calculateLongest(entries);

  return { currentStreak: streak, longestStreak };
}

function calculateLongest(entries: { created_at: string }[]) {
  if (entries.length === 0) return 0;

  // Deduplicate by day
  const uniqueDays = Array.from(
    new Set(
      entries.map((e) => {
        const d = new Date(e.created_at);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
      })
    )
  ).sort((a, b) => b - a);

  if (uniqueDays.length === 0) return 0;

  // Walk through unique days to calculate longest streak
  let longest = 1;
  let current = 1;

  for (let i = 1; i < uniqueDays.length; i++) {
    const diff = (uniqueDays[i - 1] - uniqueDays[i]) / 86400000;

    if (diff === 1) {
      current++;
      longest = Math.max(longest, current);
    } else if (diff > 1) {
      current = 1;
    }
  }

  return longest;
}
