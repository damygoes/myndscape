import { useCurrentUserJournalEntries } from '@/features/journal-entries/hooks/useCurrentUserJournalEntries';
import { generateIntro } from '../utils/generateMoodTipMessage';
import { getTipForMood } from '../utils/getTipForMood';

import { APP_COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { useUserSettingsContext } from '@/features/user/contexts/UserSettingsContext';

export function TipCard() {
  const i18n = useAppLocale();
  const { data: entries = [] } = useCurrentUserJournalEntries();
  const { data } = useUserSettingsContext();

  const userLanguage = data?.language || 'en';

  const lastMood = entries?.[0]?.mood;
  const localizedLastEntryTip = entries?.[0]?.localized?.[userLanguage]?.tip;
  const lastEntryTip =
    userLanguage === 'en' ? entries?.[0]?.tip : localizedLastEntryTip;

  const { intro } = generateIntro(lastMood);

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
          {i18n.t('TipCard.title')}
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
        {intro} {lastEntryTip}
      </Text>
    </View>
  );
}
