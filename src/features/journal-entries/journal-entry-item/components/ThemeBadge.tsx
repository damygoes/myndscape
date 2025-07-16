import { COLORS } from '@/constants/colors';
import { Text, useColorScheme } from 'react-native';

export default function ThemeBadge({
  theme,
  style,
}: {
  theme: string;
  style?: any;
}) {
  const themeColor = COLORS[useColorScheme() ?? 'light'];

  return (
    <Text
      style={{
        color: themeColor.textPrimary,
        fontSize: 14,
        fontWeight: '500',
        backgroundColor: themeColor.border,
        borderWidth: 0,
        borderRadius: 9999,
        paddingVertical: 6,
        paddingHorizontal: 10,
      }}
    >
      {theme}
    </Text>
  );
}
