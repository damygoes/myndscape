import { APP_COLORS } from '@/constants/colors';
import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconSymbol, IconSymbolName } from '../ui/IconSymbol.ios';

interface FloatingButtonProps {
  onPress: () => void;
  icon: IconSymbolName;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: number; // diameter of the circle
  style?: object;
  disabled?: boolean;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  onPress,
  icon,
  variant = 'primary',
  size = 56,
  style,
  disabled = false,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return APP_COLORS.grey;
    switch (variant) {
      case 'primary':
        return APP_COLORS.primary;
      case 'secondary':
        return APP_COLORS.secondary;
      case 'danger':
        return APP_COLORS.error;
      case 'outline':
      case 'ghost':
        return 'transparent';
      default:
        return APP_COLORS.primary;
    }
  };

  const getBorder = () => {
    if (variant === 'outline')
      return { borderWidth: 1.5, borderColor: APP_COLORS.primary };
    return {};
  };

  return (
    <View
      style={[
        {
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <BlurView
        intensity={50}
        style={[
          styles.blur,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      >
        <TouchableOpacity
          onPress={onPress}
          disabled={disabled}
          style={[
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: getBackgroundColor(),
              justifyContent: 'center',
              alignItems: 'center',
            },
            getBorder(),
          ]}
          activeOpacity={0.8}
        >
          <IconSymbol
            name={icon}
            size={24}
            color={variant === 'ghost' ? APP_COLORS['body-text'] : 'white'}
          />
        </TouchableOpacity>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  blur: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
