import { ThemedSafeAreaView } from '@/components/layouts/ThemedSafeAreaView';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { useThemeColor } from '@/hooks/useThemeColor';
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
            <View className="items-center gap-2 mb-8">
              <Text
                className="font-bold text-center text-7xl"
                style={{ color: textPrimary }}
              >
                Reflekt
              </Text>
              <Text style={{ color: textSecondary, fontSize: 16 }}>
                Notice the patterns. Nurture the change.
              </Text>
            </View>
            {/* Form */}
            <View className='w-full'>
            <LoginForm />
            </View>
          </View>
          {/* Footer */}
          <View className="flex flex-row items-center justify-center w-full py-4 mt-8">
            <Text style={{ color: textMuted, fontSize: 12 }}>
              © {new Date().getFullYear()} Reflekt. All rights reserved.
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ThemedSafeAreaView>
  );
}
