import { GlassCard } from '@/components/card/GlassCard';
import { ThemedView } from '@/components/ThemedView';
import { COLORS } from '@/constants/colors';
import { ReactNode } from 'react';
import { StyleSheet, useColorScheme, ViewStyle } from 'react-native';

type Props = {
  children: ReactNode;
  style?: ViewStyle;
  glassCardProps?: Partial<React.ComponentProps<typeof GlassCard>>;
  wrapInCard?: boolean;
};

export const DashboardSection = ({
  children,
  style,
  wrapInCard = true,
  glassCardProps,
}: Props) => {
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = COLORS[theme];

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: 'transparent' }, style]}
    >
      {wrapInCard ? (
        <GlassCard
          {...glassCardProps}
          style={[{ width: '100%' }, glassCardProps?.style]}
        >
          {children}
        </GlassCard>
      ) : (
        children
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    width: '100%',
    fontFamily: 'Manrope',
  },
});
