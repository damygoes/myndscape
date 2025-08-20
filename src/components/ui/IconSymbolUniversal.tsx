import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ComponentProps } from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

export type IconSymbolNameUniversal = 'home' | 'history' | 'profile' | 'visibility' | 'visibilityOff' | 'clear-input';

const MAPPING: Record<
  IconSymbolNameUniversal,
  ComponentProps<typeof MaterialIcons>['name']
> = {
  home: 'home',
  history: 'history',
  profile: 'person',
  visibility: 'visibility',
  visibilityOff: 'visibility-off',
  'clear-input': 'clear',
};

export function IconSymbolUniversal({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolNameUniversal;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <MaterialIcons
      name={MAPPING[name]}
      size={size}
      color={color}
      style={style}
    />
  );
}
