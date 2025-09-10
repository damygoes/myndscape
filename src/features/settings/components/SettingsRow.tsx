import { APP_COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

type SettingsRowProps = {
  title: string;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  rightElement?: ReactNode;
  danger?: boolean;
  showChevron?: boolean;
};

export function SettingsRow({
  title,
  subtitle,
  icon,
  onPress,
  rightElement,
  danger = false,
  showChevron = false,
}: SettingsRowProps) {
  const color = danger ? APP_COLORS.error : APP_COLORS['body-text'];

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
        backgroundColor: APP_COLORS.offwhite,
        borderBottomWidth: 1,
        borderBottomColor: APP_COLORS['body-text-disabled'] + '20',
      }}
    >
      <Ionicons name={icon} size={20} color={color} style={{ marginRight: 16 }} />

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            color,
          }}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={{
              fontSize: 13,
              color: APP_COLORS['body-text-disabled'],
              marginTop: 2,
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {/* Either render a custom rightElement OR default chevron */}
      {rightElement ??
        (showChevron && (
          <Ionicons
            name="chevron-forward"
            size={18}
            color={danger ? APP_COLORS.error : APP_COLORS['body-text-disabled']}
          />
        ))}
    </Pressable>
  );
}
