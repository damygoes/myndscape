import { Text, View, Pressable } from 'react-native';
import { APP_COLORS } from '@/constants/colors';

type SettingsCardProps = {
  title: string;
  subtitle: string;
  onPress?: () => void;
};

export default function SettingsCard({
  title,
  subtitle,
  onPress,
}: SettingsCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: APP_COLORS.offwhite,
        padding: 16,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: APP_COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        minHeight: 80,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: APP_COLORS['body-text'],
            marginBottom: 4,
            fontFamily: 'Manrope',
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: APP_COLORS['body-text-disabled'],
            fontFamily: 'Manrope',
          }}
        >
          {subtitle}
        </Text>
      </View>
    </Pressable>
  );
}
