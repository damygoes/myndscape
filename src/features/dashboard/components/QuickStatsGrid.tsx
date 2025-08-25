import { View, Text, ActivityIndicator } from 'react-native';
import { APP_COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useWellnessScore } from '@/features/wellness-score/hooks/useWellnessScore';

export function QuickStatsGrid() {
  const { data, isLoading, isError } = useWellnessScore();

  if (isLoading) {
    return (
      <View style={{ padding: 16, alignItems: 'center' }}>
        <ActivityIndicator size="small" color={APP_COLORS.primary} />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={{ padding: 16, alignItems: 'center' }}>
        <Text style={{ color: APP_COLORS['body-text-disabled'] }}>
          Failed to load stats
        </Text>
      </View>
    );
  }

  const { currentStreak, longestStreak, todayEntries } = data;
  const streakPercent =
    longestStreak > 0 ? Math.round((currentStreak / longestStreak) * 100) : 0;

  const stats = [
    {
      icon: 'flame-outline',
      label: 'Current Streak',
      value: `${currentStreak} day${currentStreak !== 1 ? 's' : ''}`,
    },
    {
      icon: 'trophy-outline',
      label: 'Longest Streak',
      value: `${longestStreak} day${longestStreak !== 1 ? 's' : ''}`,
    },
    {
      icon: 'document-text-outline',
      label: `Entr${todayEntries > 1 ? 'ies' : 'y'} Today`,
      value: `${todayEntries ?? 0}`,
    },
  ];

  return (
    <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
      {/* Stats Cards */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {stats.map((s) => (
          <View
            key={s.label}
            style={{
              flex: 1,
              backgroundColor: APP_COLORS.offwhite,
              borderRadius: 16,
              padding: 14,
              marginHorizontal: 4,
              alignItems: 'center',
            }}
          >
            <Ionicons
              name={s.icon as any}
              size={22}
              color={APP_COLORS.primary}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: APP_COLORS['body-text'],
                marginTop: 6,
                fontFamily: 'Manrope',
              }}
            >
              {s.value}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: APP_COLORS['body-text-disabled'],
                marginTop: 2,
                fontFamily: 'Manrope',
              }}
            >
              {s.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Progress Bar Below Cards */}
      <View style={{ marginTop: 16, width: '100%' }}>
        <Text
          style={{
            fontSize: 12,
            color: APP_COLORS['body-text-disabled'],
            marginBottom: 4,
            textAlign: 'center',
            fontFamily: 'Manrope',
          }}
        >
          Progress Toward Longest Streak
        </Text>

        <View
          style={{
            width: '100%',
            height: 24,
            backgroundColor: APP_COLORS.grey,
            borderRadius: 999,
            overflow: 'hidden',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: `${streakPercent}%`,
              height: '100%',
              backgroundColor: APP_COLORS.primary,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: '400',
                fontFamily: 'Manrope',
                fontSize: 14,
              }}
            >
              {streakPercent}%
            </Text>
          </View>

          {/* Show 0% inside the bar even if width is 0 */}
          {streakPercent === 0 && (
            <Text
              style={{
                position: 'absolute',
                width: '100%',
                textAlign: 'center',
                color: APP_COLORS['body-text-disabled'],
                fontWeight: '400',
                fontFamily: 'Manrope',
                fontSize: 14,
              }}
            >
              0%
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
