import { useCurrentUserJournalEntries } from '@/features/journal-entries/hooks/useCurrentUserJournalEntries';
import { generateMoodTipMessage } from '../utils/generateMoodTipMessage';
import { getTipForMood } from '../utils/getTipForMood';

import { APP_COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export function TipCard() {
  const { data: entries = [] } = useCurrentUserJournalEntries();
  const lastMood = entries?.[0]?.mood;
  const tip = getTipForMood(lastMood);
  const { intro, tip: tipText } = generateMoodTipMessage(lastMood, tip);

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: APP_COLORS.primary,
        borderRadius: 12,
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
            fontSize: 14,
            fontWeight: '600',
            color: APP_COLORS.white,
            fontFamily: 'Manrope',
          }}
        >
          Tip of the day
        </Text>
      </View>
      <Text
        style={{
          color: APP_COLORS.white,
          fontSize: 14,
          fontWeight: '400',
          fontFamily: 'Manrope',
          lineHeight: 20,
        }}
      >
        {intro} {tipText}
      </Text>
    </View>
  );
}
