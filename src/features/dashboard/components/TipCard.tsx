import { APP_COLORS } from '@/constants/colors';
import { DashboardSection } from '@/features/dashboard/components/DashboardSection';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, useColorScheme } from 'react-native';
import { generateMoodTipMessage } from '../utils/generateMoodTipMessage';
import { getTipForMood } from '../utils/getTipForMood';
import { useCurrentUserJournalEntries } from '@/features/journal-entries/hooks/useCurrentUserJournalEntries';
import { IconSymbol } from '@/components/ui/IconSymbol.ios';

export const TipCard = () => {
  const { data: entries = [] } = useCurrentUserJournalEntries();
  const lastMood = entries?.[0]?.mood;
  const tip = getTipForMood(lastMood);
  const { intro, tip: tipText } = generateMoodTipMessage(lastMood, tip);

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
        <IconSymbol name="tip-bulb" color={APP_COLORS.success} />
        <Text
          style={{
            color: APP_COLORS['body-text'],
            fontSize: 18,
            fontWeight: '600',
            fontFamily: 'Manrope',
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
            color: APP_COLORS['body-text'],
            lineHeight: 20,
            fontFamily: 'Manrope',
          }}
        >
          {intro}
        </Text>
        <Text style={{ color: APP_COLORS.secondary, lineHeight: 20, fontFamily: 'Manrope' }}>
          {tipText}
        </Text>
      </View>
    </DashboardSection>
  );
};
