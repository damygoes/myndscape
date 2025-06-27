import { DarkTheme, DefaultTheme, Theme as NavigationTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { AppThemeContext } from './AppThemeContext';

type Props = {
  children: React.ReactNode;
};

export function AppThemeProvider({ children }: Props) {
  const colorScheme = useColorScheme();

  const theme: NavigationTheme = useMemo(() => {
    return colorScheme === 'dark'
      ? {
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            background: '#000',
            card: '#000',
            primary: '#fff',
            text: '#fff',
          },
        }
      : {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: '#fff',
            card: '#fff',
            primary: '#000',
            text: '#000',
          },
        };
  }, [colorScheme]);

  return (
    <AppThemeContext.Provider value={theme}>
      {children}
    </AppThemeContext.Provider>
  );
}
