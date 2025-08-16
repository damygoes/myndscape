import { ThemedSafeAreaView } from '@/components/layouts/ThemedSafeAreaView';
import { COLORS } from '@/constants/colors';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function LandingScreen() {
    const colors = COLORS[useColorScheme() ?? 'light'];

    const handleGetStarted = () => {
        router.push('/login');
    };

    return (
        <ThemedSafeAreaView style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <View className="flex items-center justify-center w-full flex-1">
                <Image
                    source={require('../../assets/icon-transparent.png')}
                    contentFit="contain"
                    cachePolicy="memory-disk"
                    transition={300}
                    priority="high"
                    style={{ width: 150, height: 150 }}
                />

                <Text
                    className="text-5xl font-bold text-center"
                    style={{ color: colors.textPrimary }}
                >
                    myndscape
                </Text>
                <Text
                    style={{
                        color: colors.textSecondary,
                        fontSize: 14,
                        textTransform: 'uppercase',
                    }}
                >
                    Reflect. Understand. Evolve.
                </Text>
            </View>
            {/* Get Started */}
            <View className='w-full mb-16 h-[10%] shrink-0'>
                <TouchableOpacity
                    onPress={handleGetStarted}
                    style={{
                        backgroundColor: colors.primary,
                        padding: 14,
                        borderRadius: 999,
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Text
                        style={{ fontWeight: 'normal', color: colors.white, fontSize: 24 }}
                    >
                        Get Started
                    </Text>
                </TouchableOpacity>
            </View>
        </ThemedSafeAreaView>
    );
}
