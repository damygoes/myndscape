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
    <View className="gap-5 p-4 rounded-xl">
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
