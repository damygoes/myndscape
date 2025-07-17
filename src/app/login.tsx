import { ThemedSafeAreaView } from '@/components/layouts/ThemedSafeAreaView';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Image } from 'expo-image';
import React from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';

export default function LandingScreen() {
  const textPrimary = useThemeColor({}, 'textPrimary');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const textMuted = useThemeColor({}, 'textMuted');

  return (
    <ThemedSafeAreaView>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <View className="flex flex-col items-center justify-center w-full h-full">
          {/* Header */}
          <View className="flex flex-col items-center justify-center flex-1 w-full gap-10">
            {/* Header */}
            <View className="items-center gap-1 mb-8">
              <Image
                source={require('../../assets/icon-transparent.png')}
                contentFit="contain"
                cachePolicy="memory-disk"
                transition={300}
                priority="high"
                style={{ width: 100, height: 100 }}
              />

              <Text
                className="text-6xl font-bold text-center"
                style={{ color: textPrimary }}
              >
                myndscape
              </Text>
              <Text
                style={{
                  color: textSecondary,
                  fontSize: 14,
                  textTransform: 'uppercase',
                }}
              >
                Reflect. Understand. Evolve.
              </Text>
            </View>
            {/* Form */}
            <View className="w-full">
              <LoginForm />
            </View>
          </View>
          {/* Footer */}
          <View className="flex flex-row items-center justify-center w-full py-4 mt-8">
            <Text style={{ color: textMuted, fontSize: 14 }}>
              Myndscape. {new Date().getFullYear()}
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ThemedSafeAreaView>
  );
}
