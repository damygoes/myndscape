import { ThemedSafeAreaView } from '@/components/layouts/ThemedSafeAreaView';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { colors } from '@/utils/colors';
import React from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';

export default function LandingScreen() {
  return (
    <ThemedSafeAreaView>
      <KeyboardAvoidingView
        style={{ flex: 1, padding: 16 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <View className="flex flex-col items-center justify-center w-full h-full gap-8" >
          <View className="flex flex-col items-center justify-center flex-1 w-full gap-10" >
            {/* Header */}
            <View className="items-center">
              <Text className="text-5xl font-bold text-center">Welcome to VibeLog</Text>
              <Text style={{ color: colors.textMuted }}>Your daily mood & productivity tracker</Text>
            </View>
            {/* Form */}
            <LoginForm />
          </View>
          {/* Footer */}
          <View className="mt-8">
            <Text style={{ color: colors.textMuted, fontSize: 12 }}>© 2025 VibeLog Inc.</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ThemedSafeAreaView>
  );
}