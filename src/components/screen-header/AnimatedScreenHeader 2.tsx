import { APP_COLORS } from '@/constants/colors';
import React from 'react';
import { Animated, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeaderMenu, MenuItem } from '../header-menu/HeaderMenu';

type Props = {
  title: string;
  subtitle?: string;
  scrollY?: Animated.Value;
  menuItems?: MenuItem[];
  showMenu?: boolean;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  backgroundColor?: string;
  scrollBackgroundColor?: string;
  borderColor?: string;
  titleStyle?: object;
  subtitleStyle?: object;
  applyTopPadding?: boolean;
};

export function AnimatedScreenHeader({
  title,
  subtitle,
  scrollY,
  menuItems = [],
  showMenu = true,
  leftComponent,
  rightComponent,
  backgroundColor = APP_COLORS['primary-background'],
  scrollBackgroundColor = APP_COLORS.offwhite,
  borderColor = APP_COLORS.grey,
  titleStyle,
  subtitleStyle,
  applyTopPadding = true,
}: Props) {
  const insets = useSafeAreaInsets();

  // Create animated background opacity based on scroll
  const bgOpacity =
    scrollY?.interpolate({
      inputRange: [0, 40, 120],
      outputRange: [0, 0.5, 1],
      extrapolate: 'clamp',
    }) ?? new Animated.Value(0);

  // Create animated background color
  const animatedBackgroundColor =
    scrollY?.interpolate({
      inputRange: [0, 120],
      outputRange: [backgroundColor, scrollBackgroundColor],
      extrapolate: 'clamp',
    }) ?? 'transparent';

  // Determine what to show on the right side
  const rightContent = () => {
    if (rightComponent) return rightComponent;
    if (showMenu && menuItems.length > 0) {
      return <HeaderMenu items={menuItems} />;
    }
    return null;
  };

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: animatedBackgroundColor,
        paddingTop: applyTopPadding ? insets.top : 4,
        paddingHorizontal: 6,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 10,
        }}
      >
        {/* Left component (optional) */}
        {leftComponent && <View style={{ marginRight: 12 }}>{leftComponent}</View>}

        {/* Title and subtitle container */}
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '600',
              fontFamily: 'Manrope',
              color: APP_COLORS['body-text'],
              ...titleStyle,
            }}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={{
                marginTop: 2,
                fontSize: 14,
                fontWeight: '400',
                color: APP_COLORS['body-text-disabled'],
                fontFamily: 'Manrope',
                maxWidth: '90%',
                ...subtitleStyle,
              }}
            >
              {subtitle}
            </Text>
          )}
        </View>

        {/* Right column: menu, custom component, or nothing */}
        {rightContent()}
      </View>

      {/* Optional shadow/border line that appears on scroll */}
      <Animated.View
        style={{
          height: 1,
          backgroundColor: borderColor,
          opacity: bgOpacity,
        }}
      />
    </Animated.View>
  );
}
