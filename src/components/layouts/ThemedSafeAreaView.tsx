import { COLORS } from '@/constants/colors';
import React from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ThemedSafeAreaViewProps = React.ComponentProps<typeof SafeAreaView>;

export function ThemedSafeAreaView({
  style,
  ...props
}: ThemedSafeAreaViewProps) {
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }, style]}
      edges={['top', 'bottom', 'left', 'right']}
      {...props}
    >
      <StatusBar
        translucent={false}
        backgroundColor="transparent"
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
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
