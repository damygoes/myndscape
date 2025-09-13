import React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SafeScrollViewProps extends ScrollViewProps {
  tabBarHeight?: number;
  padding?: number;
}

export function SafeScrollView({
  children,
  tabBarHeight = 20, // default tab bar height
  padding = 16,
  contentContainerStyle,
  ...props
}: SafeScrollViewProps) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      {...props}
      contentContainerStyle={[
        contentContainerStyle,
        {
          paddingTop: 6,
          paddingLeft: 4,
          paddingRight: 4,
          paddingBottom: insets.bottom + tabBarHeight + padding,
        },
      ]}
    >
      {children}
    </ScrollView>
  );
}
