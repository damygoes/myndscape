import { COLORS } from '@/constants/colors';
import { cn } from '@/utils/clsx';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { Platform, View, ViewProps, useColorScheme } from 'react-native';

interface CardProps extends ViewProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  elevated?: boolean;
}

const getThemeColors = (theme: 'light' | 'dark') => COLORS[theme];

export const Card = ({
  children,
  className,
  intensity = 60,
  style,
  elevated = true,
  ...props
}: CardProps) => {
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = getThemeColors(theme);

  return (
    <View style={{ position: 'relative', borderRadius: 28 }} {...props}>
      {/* Background Glass Blur Layer */}
      <BlurView
        tint={theme}
        intensity={intensity}
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            borderRadius: 28,
            backgroundColor:
              theme === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(255, 255, 255, 0.3)',
            overflow: 'hidden',
          },
        ]}
      />

      {/* Apple-style gradient light overlay */}
      <LinearGradient
        colors={
          theme === 'dark'
            ? ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.02)']
            : ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']
        }
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 28,
        }}
        pointerEvents="none"
      />

      {/* Inner glow / border highlight */}
      <View
        style={{
          position: 'absolute',
          top: 1,
          left: 1,
          right: 1,
          bottom: 1,
          borderRadius: 27,
          borderWidth: 1,
          borderColor:
            theme === 'dark'
              ? 'rgba(255, 255, 255, 0.06)'
              : 'rgba(255, 255, 255, 0.2)',
          zIndex: 1,
        }}
        pointerEvents="none"
      />

      {/* Content Layer */}
      <View
        className={cn('gap-2 p-6 rounded-3xl', className)}
        style={[
          {
            zIndex: 2,
            borderRadius: 28,
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: elevated ? 0.1 : 0,
            shadowRadius: 16,
            ...(Platform.OS === 'android'
              ? { elevation: elevated ? 8 : 0 }
              : {}),
          },
          style,
        ]}
      >
        {children}
      </View>
    </View>
  );
};
