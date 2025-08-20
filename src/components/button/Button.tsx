import React from 'react';
import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    StyleSheet,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { IconSymbol, IconSymbolName } from '../ui/IconSymbol';
import { APP_COLORS } from '@/constants/colors';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline' | 'link';
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
        if (isDisabled) return '#A1A1AA';
        switch (variant) {
            case 'primary':
                return APP_COLORS.primary;
            case 'secondary':
                return APP_COLORS.secondary;
            case 'danger':
                return APP_COLORS.error;
            case 'outline':
            case 'link':
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
            default:
                return APP_COLORS.white;
        }
    };

    const getBorder = () => {
        if (variant === 'outline') {
            return { borderWidth: 1.5, borderColor: APP_COLORS.primary };
        }
        return {};
    };

    const renderIcon = () => {
        if (!icon || loading) return null;
        return (
            <IconSymbol
                name={icon}
                size={20}
                color={getTextColor()}
                style={{ marginHorizontal: 8 }}
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
                    paddingVertical: paddingSizes[size],
                    paddingHorizontal: paddingSizes[size] * 2,
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
            <Text style={[{ color: getTextColor(), fontSize: 16, textDecorationLine: variant === 'link' ? 'underline' : 'none' }, textStyle]}>
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
