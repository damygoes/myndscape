import { useAuthActions } from '@/features/auth/hooks/useAuthActions';
import { useDeepLinkSession } from '@/features/auth/hooks/useDeepLinkSession';
import { colors } from '@/utils/colors';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

export function LoginForm() {
  const { sendMagicLink } = useAuthActions();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useDeepLinkSession(); // ✅ Listens for magic link redirects

  const handleSendLink = async () => {
    setLoading(true);
    try {
      await sendMagicLink(email);
      Alert.alert('Check Your Email', 'We sent you a magic link to log in.');
    } catch (err) {
      console.error('Magic link error:', err);
      const message = err instanceof Error ? err.message : 'An unknown error occurred.';
      Alert.alert('Login Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="w-full gap-8 p-8">
      <TextInput
        placeholder="Your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={colors.textSecondary}
        style={{
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: 8,
          padding: 12,
          backgroundColor: colors.inputBackground,
          color: colors.textPrimary,
        }}
      />

      <TouchableOpacity
        onPress={handleSendLink}
        disabled={loading}
        style={{
          backgroundColor: colors.primary,
          padding: 12,
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        {loading ? (
          <ActivityIndicator color={colors.textPrimary} />
        ) : (
          <Text style={{ fontWeight: 'bold' }}>Send Magic Link</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
