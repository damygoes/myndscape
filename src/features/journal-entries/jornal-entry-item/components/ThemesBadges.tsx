import { colors } from '@/utils/colors';
import React from 'react';
import { Text, View } from 'react-native';
import { parseThemes } from '../utils';

interface Props {
  themes: string | null;
}

export const ThemesBadges = ({ themes }: Props) => {
  const themeList = parseThemes(themes);

  if (themeList.length === 0) return null;

  return (
    <View className="flex-row flex-wrap">
      {themeList.map((theme, index) => (
        <Text
          key={index}
          className="px-2 py-1 mr-2 text-xs italic rounded-full"
          style={{
            color: colors.textSecondary,
            backgroundColor: colors.surfaceBackground,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 9999
          }}
        >
          {theme}
        </Text>
      ))}
    </View>
  );
};
