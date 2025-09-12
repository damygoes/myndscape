import { APP_COLORS } from '@/constants/colors';
import { Text } from 'react-native';

export default function ThemeBadge({ theme }: { theme: string; style?: any }) {
  return (
    <Text
      style={{
        color: APP_COLORS['body-text'],
        fontSize: 12,
        fontWeight: '400',
        backgroundColor: APP_COLORS.secondary + '15',
        borderWidth: 0,
        borderRadius: 9999,
        paddingVertical: 4,
        paddingHorizontal: 10,
        fontFamily: 'Manrope',
      }}
    >
      {theme}
    </Text>
  );
}
