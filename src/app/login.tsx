import { ThemedSafeAreaView } from '@/components/layouts/ThemedSafeAreaView';
import { COLORS } from '@/constants/colors';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Image } from 'expo-image';
import React from 'react';
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function LandingScreen() {
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

  return (
    <ThemedSafeAreaView style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <View className="flex flex-col items-center justify-center gap-12 w-full h-full">
          <View className='flex flex-col items-center justify-center w-full gap-4'>
            <Image
              source={require('../../assets/icon-transparent.png')}
              contentFit="contain"
              cachePolicy="memory-disk"
              transition={300}
              priority="high"
              style={{ width: 80, height: 80 }}
            />

            <Text
              className="text-2xl font-bold text-center"
              style={{ color: colors.textPrimary }}
            >
              Log in or Sign Up
            </Text>
          </View>
          <View className="w-full">
            <LoginForm />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ThemedSafeAreaView>
  );
}