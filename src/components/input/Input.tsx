import React, { useState } from 'react';
import {
    TextInput,
    View,
    Text,
    StyleSheet,
    TextStyle,
    ViewStyle,
    TextInputProps,
    Pressable,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { IconSymbol, IconSymbolName } from '../ui/IconSymbol';
import { APP_COLORS } from '@/constants/colors';

type IconPosition = 'left' | 'right';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    disabled?: boolean;
    icon?: IconSymbolName;
    iconPosition?: IconPosition;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    labelStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    disabled = false,
    icon,
    iconPosition = 'left',
    containerStyle,
    inputStyle,
    labelStyle,
    secureTextEntry,
    ...textInputProps
}) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const borderColor = error
        ? APP_COLORS.error
        : focused
            ? APP_COLORS.primary
            : APP_COLORS.grey;

    const textColor = disabled ? APP_COLORS['body-text-disabled'] : APP_COLORS['body-text'];

    const renderIcon = () =>
        icon ? (
            <IconSymbol
                name={icon}
                size={20}
                color={disabled ? APP_COLORS['body-text-disabled'] : APP_COLORS['body-text']}
                style={{ marginHorizontal: 8 }}
            />
        ) : null;

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

            <View
                style={[
                    styles.inputWrapper,
                    { borderColor, backgroundColor: disabled ? APP_COLORS['body-text-disabled'] : APP_COLORS.offwhite },
                ]}
            >
                {icon && iconPosition === 'left' && renderIcon()}

                <TextInput
                    style={[styles.input, { color: textColor }, inputStyle]}
                    editable={!disabled}
                    placeholderTextColor={APP_COLORS['body-text-disabled']}
                    secureTextEntry={secureTextEntry && !showPassword}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    {...textInputProps}
                />

                {/* If secureTextEntry, show password toggle instead of custom right icon */}
                {secureTextEntry ? (
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                        <MaterialIcons
                            name={showPassword ? 'visibility' : 'visibility-off'}
                            size={22}
                            color={APP_COLORS['body-text']}
                            style={{ marginHorizontal: 8 }}
                        />
                    </Pressable>
                ) : (
                    icon && iconPosition === 'right' && renderIcon()
                )}
            </View>

            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        marginBottom: 4,
        fontSize: 14,
        fontWeight: '500',
        color: APP_COLORS['body-text']
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
        borderRadius: 12
    },
    error: {
        marginTop: 4,
        color: APP_COLORS.error,
        fontSize: 13,
    },
});
