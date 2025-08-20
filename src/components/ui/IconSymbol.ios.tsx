import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { StyleProp, ViewStyle } from 'react-native';

export type IconSymbolName = 'close' | 'dot' | 'home' | 'history' | 'profile' | 'settings' | 'tip-bulb' | 'visibility' | 'visibilityOff';

// Map generic names to SF Symbols names
const SF_SYMBOLS_MAPPING: Record<IconSymbolName, SymbolViewProps['name']> = {
  close: 'xmark',
  dot: 'circle.fill',
  home: 'house',
  history: 'list.dash',
  profile: 'person',
  settings: 'gearshape',
  'tip-bulb': 'lightbulb.circle',
  visibility: 'eye',
  visibilityOff: 'eye.slash',
};

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = 'regular',
}: {
  name: IconSymbolName;
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <SymbolView
      weight={weight}
      tintColor={color}
      resizeMode="scaleAspectFit"
      name={SF_SYMBOLS_MAPPING[name]}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}
