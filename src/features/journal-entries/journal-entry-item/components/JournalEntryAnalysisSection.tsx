import { COLORS } from '@/constants/colors';
import React from 'react';
import { Text, useColorScheme, View } from 'react-native';
import { ThemesBadges } from './ThemesBadges';
import { TipSection } from './TipSection';
import { Plan } from '@/features/paywall/types';
import { PaywallGate } from '@/features/paywall/components/PaywallGate';
interface Props {
  summary: string | null;
  themes: string | null;
  tip: string | null;
}

export const JournalEntryAnalysisSection = ({
  summary,
  themes,
  tip,
}: Props) => {
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

  if (!summary && !themes && !tip) return null;

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: colors.background,
        gap: 26,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
      }}
    >
      {summary && (
        <Text
          className="text-base font-normal"
          style={{ color: colors.textPrimary }}
        >
          {summary}
        </Text>
      )}

      <PaywallGate require={Plan.PREMIUM}>
        <ThemesBadges themes={themes} />
        <TipSection tip={tip} />
      </PaywallGate>
    </View>
  );
};
