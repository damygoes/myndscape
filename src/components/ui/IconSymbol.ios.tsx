import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { StyleProp, ViewStyle } from 'react-native';

export type IconSymbolName =
  | 'add'
  | 'close'
  | 'chevron-left'
  | 'chevron-right'
  | 'dot'
  | 'home'
  | 'history'
  | 'more'
  | 'profile'
  | 'search'
  | 'select'
  | 'settings'
  | 'sort-ascending'
  | 'sort-descending'
  | 'tip-bulb'
  | 'trash'
  | 'visibility'
  | 'visibilityOff';

// Map generic names to SF Symbols names
const SF_SYMBOLS_MAPPING: Record<IconSymbolName, SymbolViewProps['name']> = {
  add: 'plus',
  close: 'xmark',
  'chevron-left': 'chevron.left',
  'chevron-right': 'chevron.right',
  dot: 'circle.fill',
  home: 'house',
  history: 'list.dash',
  more: 'ellipsis',
  profile: 'person',
  search: 'magnifyingglass',
  select: 'checkmark',
  settings: 'gearshape',
  'sort-ascending': 'arrow.up',
  'sort-descending': 'arrow.down',
  'tip-bulb': 'lightbulb.circle',
  trash: 'trash',
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
