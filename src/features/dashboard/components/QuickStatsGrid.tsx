import { APP_COLORS } from '@/constants/colors';
import { useWellnessScore } from '@/features/wellness-score/hooks/useWellnessScore';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, Text, View } from 'react-native';

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

  const {
    currentStreak,
    todayEntries,
    consistencyPercent,
    totalEntries,
    wellnessScore,
  } = data;

  const stats = [
    {
      icon: 'flame-outline',
      label: 'Current Streak',
      value: `${currentStreak} day${currentStreak !== 1 ? 's' : ''}`,
    },
    {
      icon: 'happy-outline',
      label: 'Avg. Wellness',
      value: `${wellnessScore}%`,
    },
    {
      icon: 'document-text-outline',
      label: `Entr${todayEntries > 1 ? 'ies' : 'y'} Today`,
      value: `${todayEntries ?? 0}`,
    },
    {
      icon: 'book-outline',
      label: 'Total Entries',
      value: `${totalEntries ?? 0}`,
    },
  ];

  return (
    <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
      {/* Stats Cards */}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        {stats.map((s) => (
          <View
            key={s.label}
            style={{
              flexBasis: '48%',
              flexGrow: 1,
              backgroundColor: APP_COLORS.offwhite,
              borderRadius: 12,
              padding: 20,
              alignItems: 'center',
              marginBottom: 12,
              minHeight: 120,
              minWidth: 120,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 3, // Android shadow
            }}
          >
            <Ionicons
              name={s.icon as any}
              size={28}
              color={APP_COLORS.primary}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: APP_COLORS.secondary,
                marginTop: 6,
                fontFamily: 'Manrope',
              }}
            >
              {s.value}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: APP_COLORS.secondary,
                marginTop: 2,
                fontFamily: 'Manrope',
                textAlign: 'center',
              }}
            >
              {s.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Progress Bar Below Cards */}
      <View style={{ marginTop: 16, width: '100%' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 4,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              color: APP_COLORS['body-text-disabled'],
              fontFamily: 'Manrope',
            }}
          >
            Consistency (Last 30 Days)
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              color: APP_COLORS['body-text-disabled'],
              fontFamily: 'Manrope',
            }}
          >
            {consistencyPercent}%
          </Text>
        </View>

        {/* 3D Progress Bar */}
        <View
          style={{
            width: '100%',
            height: 12,
            backgroundColor: APP_COLORS.grey,
            borderRadius: 999,
            overflow: 'hidden',
            shadowColor: APP_COLORS.black,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 3,
          }}
        >
          {/* Filled portion with gradient */}
          <LinearGradient
            colors={[APP_COLORS.primary, APP_COLORS.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: `${consistencyPercent}%`,
              height: '100%',
              borderRadius: 999,
            }}
          >
            {/* Glossy highlight */}
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '50%',
                backgroundColor: 'rgba(255,255,255,0.25)',
                borderTopLeftRadius: 999,
                borderTopRightRadius: 999,
              }}
            />
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}
