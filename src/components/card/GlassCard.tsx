import { COLORS } from '@/constants/colors';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Platform,
  StyleProp,
  View,
  ViewStyle,
  useColorScheme,
} from 'react-native';

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevated?: boolean;
  padding?: number;
  borderRadius?: number;
}

export const GlassCard = ({
  children,
  style,
  elevated = true,
  padding = 24,
  borderRadius = 22,
}: GlassCardProps) => {
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = COLORS[theme];

  return (
    <View
      style={[
        {
          position: 'relative',
          borderRadius,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {/* Blur Background */}
      <BlurView
        tint={theme}
        intensity={60}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius,
          backgroundColor:
            theme === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(255, 255, 255, 0.3)',
        }}
      />

      {/* Gradient Light Overlay */}
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
          borderRadius,
        }}
        pointerEvents="none"
      />

      {/* Inner border highlight */}
      <View
        style={{
          position: 'absolute',
          top: 1,
          left: 1,
          right: 1,
          bottom: 1,
          borderRadius: borderRadius - 1,
          borderWidth: 1,
          borderColor:
            theme === 'dark'
              ? 'rgba(255, 255, 255, 0.06)'
              : 'rgba(255, 255, 255, 0.2)',
          zIndex: 1,
        }}
        pointerEvents="none"
      />

      {/* Content */}
      <View
        style={{
          zIndex: 2,
          borderRadius,
          padding,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: elevated ? 0.1 : 0,
          shadowRadius: 16,
          backgroundColor: 'transparent',
          ...(Platform.OS === 'android' ? { elevation: elevated ? 8 : 0 } : {}),
        }}
      >
        {children}
      </View>
    </View>
  );
};
