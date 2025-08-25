import { generateMoodTipMessage } from '../utils/generateMoodTipMessage';
import { getTipForMood } from '../utils/getTipForMood';
import { useCurrentUserJournalEntries } from '@/features/journal-entries/hooks/useCurrentUserJournalEntries';

import { View, Text } from 'react-native';
import { APP_COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

export function TipCard() {
  const { data: entries = [] } = useCurrentUserJournalEntries();
  const lastMood = entries?.[0]?.mood;
  const tip = getTipForMood(lastMood);
  const { intro, tip: tipText } = generateMoodTipMessage(lastMood, tip);

  return (
    <View
      style={{
        padding: 24,
        backgroundColor: APP_COLORS.primary,
        borderRadius: 24,
        marginHorizontal: 16,
        marginBottom: 20,
      }}
    >
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}
      >
        <Ionicons
          name="bulb-outline"
          size={20}
          color={APP_COLORS.white}
          style={{ marginRight: 8 }}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: APP_COLORS.white,
            fontFamily: 'Manrope',
          }}
        >
          Tip of the day
        </Text>
      </View>
      <Text
        style={{ color: APP_COLORS.white, fontSize: 14, fontFamily: 'Manrope' }}
      >
        {intro} {tipText}
      </Text>
    </View>
  );
}
