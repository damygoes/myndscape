import React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SafeScrollViewProps extends ScrollViewProps {
  tabBarHeight?: number; 
  padding?: number;
  className?: string; 
}

export function SafeScrollView({
  children,
  tabBarHeight = 20, // default tab bar height
  padding = 16, 
  contentContainerStyle,
  className,
  ...props
}: SafeScrollViewProps) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
    className={`p-4 pt-6 ${className || ''}`}
      {...props}
      contentContainerStyle={[
        contentContainerStyle,
        {
          paddingBottom: insets.bottom + tabBarHeight + padding,
        },
      ]}
    >
      {children}
    </ScrollView>
  );
}
