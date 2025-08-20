import { APP_COLORS, COLORS } from '@/constants/colors';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ThemedSafeAreaViewProps = React.ComponentProps<typeof SafeAreaView>;

export function ThemedSafeAreaView({
  style,
  ...props
}: ThemedSafeAreaViewProps) {

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: APP_COLORS['primary-background'] }, style]}
      edges={['top', 'bottom', 'left', 'right']}
      {...props}
    >
      {props.children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: '100%',
    width: '100%',
    paddingHorizontal: 16,
  },
});
