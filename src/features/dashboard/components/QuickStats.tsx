import { APP_COLORS, COLORS } from '@/constants/colors';
import { DashboardSection } from '@/features/dashboard/components/DashboardSection';
import { useCurrentUserJournalEntries } from '@/features/journal-entries/hooks/useCurrentUserJournalEntries';
import { Text, View, useColorScheme } from 'react-native';

export const QuickStats = () => {
  const { data: entries = [] } = useCurrentUserJournalEntries();
  const totalEntries = entries?.length ?? 0;

  return (
    <DashboardSection>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text
          style={{
            color: APP_COLORS['body-text'],
            fontSize: 18,
            fontWeight: '600',
            fontFamily: 'Manrope',
          }}
        >
          Quick Stats
        </Text>
      </View>
      <View style={{ paddingVertical: 8 }}>
        <Text
          style={{
            color: APP_COLORS['primary'],
            fontSize: 24,
            fontWeight: '600',
            marginTop: 8,
            fontFamily: 'Manrope',
          }}
        >
          {totalEntries} total entries
        </Text>
      </View>
    </DashboardSection>
  );
};
