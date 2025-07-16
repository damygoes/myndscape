import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { StyleProp, ViewStyle } from 'react-native';

type IconSymbolName = 'home' | 'history' | 'profile';

// Map generic names to SF Symbols names
const SF_SYMBOLS_MAPPING: Record<IconSymbolName, SymbolViewProps['name']> = {
  home: 'house',
  history: 'clock',
  profile: 'person',
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
