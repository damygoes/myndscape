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
          className="px-2 py-1 mb-1 mr-2 text-xs italic text-gray-700 bg-blue-100 rounded-full dark:bg-gray-600 dark:text-gray-300"
        >
          {theme}
        </Text>
      ))}
    </View>
  );
};
