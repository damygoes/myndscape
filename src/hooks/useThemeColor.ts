import { COLORS } from '@/constants/colors';
import { useColorScheme } from 'react-native';

type ThemeColorName = keyof typeof COLORS.light;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ThemeColorName
) {
  const theme = useColorScheme() ?? 'light';
  return props[theme] ?? COLORS[theme][colorName];
}
