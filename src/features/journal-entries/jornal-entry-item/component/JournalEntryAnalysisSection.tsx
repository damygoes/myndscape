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
    <View className="gap-5 p-4 rounded-xl bg-blue-50 dark:bg-gray-700">
      {summary && (
        <Text className="text-base font-normal text-gray-800 dark:text-gray-100">
          {summary}
        </Text>
      )}

      <ThemesBadges themes={themes} />
      <TipSection tip={tip} />
    </View>
  );
};
