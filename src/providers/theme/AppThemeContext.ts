import { Theme as NavigationTheme } from '@react-navigation/native';
import React from 'react';

export const AppThemeContext = React.createContext<NavigationTheme | undefined>(undefined);
