import React from 'react';
import { View } from 'react-native';
import { parseThemes } from '../utils';
import ThemeBadge from './ThemeBadge';
interface Props {
  themes: string | null;
}

export const ThemesBadges = ({ themes }: Props) => {
  const themeList = parseThemes(themes);

  if (themeList.length === 0) return null;

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      {themeList.map((theme, index) => (
        <ThemeBadge key={index} theme={theme} />
      ))}
    </View>
  );
};
