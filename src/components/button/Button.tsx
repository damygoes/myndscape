import React from 'react';
import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    StyleSheet,
    View,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { IconSymbol, IconSymbolName } from '../ui/IconSymbol';
import { APP_COLORS } from '@/constants/colors';

type ButtonVariant = 'primary' | 'secondary' | 'danger';
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

    const backgroundColors: Record<ButtonVariant, string> = {
        primary: APP_COLORS.primary,
        secondary: APP_COLORS.secondary,
        danger: APP_COLORS.error,
    };

    const textColors: Record<ButtonVariant, string> = {
        primary: APP_COLORS.white,
        secondary: APP_COLORS.black,
        danger: APP_COLORS.error,
    };

    const paddingSizes: Record<ButtonSize, number> = {
        small: 8,
        medium: 12,
        large: 16,
    };

    const renderIcon = () => {
        if (!icon || loading) return null;
        return <IconSymbol name={icon} size={20} color={textColors[variant]} style={{ marginHorizontal: 8 }} />;
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isDisabled}
            style={[
                styles.button,
                {
                    backgroundColor: isDisabled ? '#A1A1AA' : backgroundColors[variant],
                    paddingVertical: paddingSizes[size],
                    paddingHorizontal: paddingSizes[size] * 2,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                style,
            ]}
        >
            {loading && <ActivityIndicator color={textColors[variant]} style={{ marginRight: 8 }} />}
            {!loading && icon && iconPosition === 'left' && renderIcon()}
            <Text style={[{ color: textColors[variant], fontSize: 16 }, textStyle]}>{title}</Text>
            {!loading && icon && iconPosition === 'right' && renderIcon()}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 999,
    },
});
