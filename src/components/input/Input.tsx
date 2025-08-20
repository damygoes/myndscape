import React, { useState, forwardRef } from 'react';
import {
    TextInput as RNTextInput,
    View,
    Text,
    StyleSheet,
    TextStyle,
    ViewStyle,
    TextInputProps,
    Pressable,
} from 'react-native';
import { APP_COLORS } from '@/constants/colors';
import { IconSymbol, IconSymbolName } from '../ui/IconSymbol.ios';

type IconPosition = 'left' | 'right' | 'top-right' | 'top-left';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    disabled?: boolean;
    icon?: IconSymbolName;
    iconPosition?: IconPosition;
    onIconPress?: () => void;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    labelStyle?: TextStyle;
    floatingIconStyle?: ViewStyle;
}

export const Input = forwardRef<RNTextInput, InputProps>(({
    label,
    error,
    disabled = false,
    icon,
    iconPosition = 'left',
    containerStyle,
    inputStyle,
    labelStyle,
    secureTextEntry,
    onFocus,
    onBlur,
    onIconPress,
    floatingIconStyle,
    ...textInputProps
}, ref) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const borderColor = error
        ? APP_COLORS.error
        : focused
            ? APP_COLORS.secondary
            : APP_COLORS.grey;

    const textColor = disabled ? APP_COLORS['body-text-disabled'] : APP_COLORS['body-text'];

    const renderIcon = () => {
        if (!icon) return null;

        const iconElement = (
            <IconSymbol
                name={icon}
                size={20}
                color={disabled ? APP_COLORS['body-text-disabled'] : APP_COLORS['body-text']}
                style={{ marginHorizontal: 8 }}
            />
        );

        return onIconPress ? (
            <Pressable onPress={onIconPress}>{iconElement}</Pressable>
        ) : (
            iconElement
        );
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

            <View
                style={[
                    styles.inputWrapper,
                    { borderColor, backgroundColor: disabled ? APP_COLORS['body-text-disabled'] : APP_COLORS.offwhite },
                ]}
            >
                {/* Inline left */}
                {icon && iconPosition === 'left' && renderIcon()}

                <RNTextInput
                    ref={ref}
                    style={[styles.input, { color: textColor }, inputStyle]}
                    editable={!disabled}
                    placeholderTextColor={APP_COLORS['body-text-disabled']}
                    secureTextEntry={secureTextEntry && !showPassword}
                    onFocus={(e) => { setFocused(true); onFocus?.(e); }}
                    onBlur={(e) => { setFocused(false); onBlur?.(e); }}
                    {...textInputProps}
                />

                {/* Inline right */}
                {icon && iconPosition === 'right' && renderIcon()}

                {/* Absolute positions */}
                {icon && (iconPosition === 'top-right' || iconPosition === 'top-left') && (
                    <View
                        style={[
                            styles.iconFloating,
                            floatingIconStyle,
                            iconPosition === 'top-right' ? { right: 0 } : { left: 0 }
                        ]}
                    >
                        {renderIcon()}
                    </View>
                )}

                {/* Password toggle stays inline on the right */}
                {secureTextEntry && (
                    <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.iconFloating}>
                        <IconSymbol
                            name={showPassword ? 'visibility' : 'visibilityOff'}
                            size={22}
                            color={APP_COLORS['body-text']}
                        />
                    </Pressable>
                )}
            </View>

            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
});

const styles = StyleSheet.create({
    container: { width: '100%', marginBottom: 6 },
    label: {
        marginBottom: 4,
        fontSize: 14,
        fontWeight: '500',
        color: APP_COLORS['body-text'],
        fontFamily: 'Manrope',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 12,
        fontFamily: 'Manrope',
    },
    error: {
        marginTop: 4,
        color: APP_COLORS.error,
        fontSize: 13,
        fontFamily: 'Manrope',
    },
    iconFloating: {
        position: 'absolute',
        top: 4,
        padding: 2,
        zIndex: 1
    },
});