import { colors } from '@/utils/colors';
import React from 'react';
import { Text, View } from 'react-native';
import { ThemesBadges } from './ThemesBadges';
import { TipSection } from './TipSection';

interface Props {
  summary: string | null;
  themes: string | null;
  tip: string | null;
}

export const JournalEntryAnalysisSection = ({ summary, themes, tip }: Props) => {
  if (!summary && !themes && !tip) return null;

  return (
    <View 
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.surfaceBackground,
        gap: 26,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
      }}>
      {summary && (
        <Text className="text-base font-normal" style={{color: colors.textPrimary}}>
          {summary}
        </Text>
      )}

      <ThemesBadges themes={themes} />
      <TipSection tip={tip} />
    </View>
  );
};