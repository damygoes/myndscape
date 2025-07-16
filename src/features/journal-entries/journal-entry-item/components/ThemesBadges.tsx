import { COLORS } from '@/constants/colors';
import React from 'react';
import { useColorScheme, View } from 'react-native';
import { parseThemes } from '../utils';
import ThemeBadge from './ThemeBadge';
interface Props {
  themes: string | null;
}

export const ThemesBadges = ({ themes }: Props) => {
  const themeList = parseThemes(themes);

  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

  if (themeList.length === 0) return null;

  return (
    <View className="flex-row flex-wrap gap-3">
      {themeList.map((theme, index) => (
        <ThemeBadge key={index} theme={theme} />
      ))}
    </View>
  );
};
