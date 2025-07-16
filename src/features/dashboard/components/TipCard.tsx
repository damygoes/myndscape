import { COLORS } from '@/constants/colors';
import { DashboardSection } from '@/features/dashboard/components/DashboardSection';
import { useCurrentUserEntries } from '@/features/journal-entries/hooks/useCurrentUserEntries';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, useColorScheme } from 'react-native';
import { generateMoodTipMessage } from '../utils/generateMoodTipMessage';
import { getTipForMood } from '../utils/getTipForMood';

export const TipCard = () => {
  const { data: entries = [] } = useCurrentUserEntries();
  const lastMood = entries?.[0]?.mood;
  const tip = getTipForMood(lastMood);
  const { intro, tip: tipText } = generateMoodTipMessage(lastMood, tip);

  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

  return (
    <DashboardSection style={{ marginBottom: 24 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          marginBottom: 12,
        }}
      >
        <Ionicons name="bulb-outline" size={18} color={colors.success} />
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: 18,
            fontWeight: '600',
          }}
        >
          Tip
        </Text>
      </View>

      {/* Content */}
      <View style={{ flexDirection: 'column', gap: 8 }}>
        <Text
          style={{
            fontWeight: '500',
            color: colors.textPrimary,
            lineHeight: 20,
          }}
        >
          {intro}
        </Text>
        <Text style={{ color: colors.textSecondary, lineHeight: 20 }}>
          {tipText}
        </Text>
      </View>
    </DashboardSection>
  );
};
