import { APP_COLORS } from '@/constants/colors';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { IconSymbol, IconSymbolName } from '../ui/IconSymbol.ios';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'outline'
  | 'link'
  | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';
type IconPosition = 'left' | 'right';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: IconSymbolName;
  iconPosition?: IconPosition;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;

  const paddingSizes: Record<ButtonSize, number> = {
    small: 8,
    medium: 12,
    large: 16,
  };

  const getBackgroundColor = () => {
    if (variant === 'link' && isDisabled) return 'transparent'; // No background
    if (isDisabled) return APP_COLORS.grey;
    switch (variant) {
      case 'primary':
        return APP_COLORS.primary;
      case 'secondary':
        return APP_COLORS.secondary;
      case 'danger':
        return APP_COLORS.error;
      case 'outline':
      case 'link':
      case 'ghost':
        return 'transparent';
      default:
        return APP_COLORS.primary;
    }
  };

  const getTextColor = () => {
    if (isDisabled) return APP_COLORS.white;
    switch (variant) {
      case 'primary':
        return APP_COLORS.white;
      case 'secondary':
        return APP_COLORS.black;
      case 'danger':
        return APP_COLORS.white;
      case 'outline':
        return APP_COLORS.primary;
      case 'link':
        return APP_COLORS.primary;
      case 'ghost':
        return APP_COLORS['body-text'];
      default:
        return APP_COLORS.white;
    }
  };

  const getBorder = () => {
    if (variant === 'link' && isDisabled) return { borderWidth: 0 };
    if (variant === 'outline') {
      return { borderWidth: 1.5, borderColor: APP_COLORS.primary };
    }
    if (variant === 'ghost' || variant === 'link') {
      return { borderWidth: 0 };
    }
    return {};
  };

  const renderIcon = () => {
    if (!icon || loading) return null;
    return (
      <IconSymbol
        name={icon}
        size={14}
        color={getTextColor()}
        style={{
          marginRight: iconPosition === 'left' ? 16 : 0,
          marginLeft: iconPosition === 'right' ? 16 : 0,
        }}
      />
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          paddingVertical:
            variant === 'link' && isDisabled ? 0 : paddingSizes[size],
          paddingHorizontal:
            variant === 'link' && isDisabled ? 0 : paddingSizes[size] * 2,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        getBorder(),
        style,
      ]}
    >
      {loading && (
        <ActivityIndicator color={getTextColor()} style={{ marginRight: 8 }} />
      )}
      {!loading && icon && iconPosition === 'left' && renderIcon()}
      <Text
        style={[
          {
            color: getTextColor(),
            fontSize: 16,
            textDecorationLine: variant === 'link' ? 'underline' : 'none',
            fontFamily: 'Manrope',
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
      {!loading && icon && iconPosition === 'right' && renderIcon()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
  },
});
