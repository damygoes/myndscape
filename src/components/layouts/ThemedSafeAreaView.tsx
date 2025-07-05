import { AppThemeContext } from '@/providers/theme/AppThemeContext';
import React, { useContext } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ThemedSafeAreaViewProps = React.ComponentProps<typeof SafeAreaView>;

export function ThemedSafeAreaView({ style, ...props }: ThemedSafeAreaViewProps) {
  const theme = useContext(AppThemeContext);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme?.colors.background }, style]}
      edges={['top', 'bottom', 'left', 'right']}
      {...props}
    >
      <StatusBar
        translucent={false}
        backgroundColor="transparent"
        barStyle="light-content"
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
  },
});