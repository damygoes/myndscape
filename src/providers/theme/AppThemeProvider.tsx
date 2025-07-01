import { colors } from '@/utils/colors';
import { DefaultTheme, Theme as NavigationTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { AppThemeContext } from './AppThemeContext';

type Props = {
  children: React.ReactNode;
};

export function AppThemeProvider({ children }: Props) {

  const theme: NavigationTheme = useMemo(() => {
    const baseColors = {
      background: colors.background,
      card: colors.cardBackground,
      border: colors.border,
      text: colors.textPrimary,
      primary: colors.primary,
      notification: colors.warning,
    };

    return {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        ...baseColors,
      },
    };
  }, []);

  return (
    <AppThemeContext.Provider value={theme}>
      {children}
    </AppThemeContext.Provider>
  );
}
