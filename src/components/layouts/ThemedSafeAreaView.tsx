import { AppThemeContext } from '@/providers/theme/AppThemeContext';
import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

type ThemedSafeAreaViewProps = React.ComponentProps<typeof SafeAreaView>;

export function ThemedSafeAreaView({ style, ...props }: ThemedSafeAreaViewProps) {
  const theme = useContext(AppThemeContext);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme?.colors.background }, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: '100%',
    width: '100%',
  },
});
