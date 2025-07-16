import { COLORS } from '@/constants/colors';
import { DashboardSection } from '@/features/dashboard/components/DashboardSection';
import { useCurrentUserEntries } from '@/features/journal-entries/hooks/useCurrentUserEntries';
import { Text, View, useColorScheme } from 'react-native';

export const QuickStats = () => {
  const { data: entries = [] } = useCurrentUserEntries();
  const totalEntries = entries?.length ?? 0;

  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

  return (
    <DashboardSection>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: 18,
            fontWeight: '600',
          }}
        >
          Quick Stats
        </Text>
      </View>
      <View style={{ paddingVertical: 8 }}>
        <Text
          style={{
            color: colors.primary,
            fontSize: 24,
            fontWeight: '600',
            marginTop: 8,
          }}
        >
          {totalEntries} total entries
        </Text>
      </View>
    </DashboardSection>
  );
};
