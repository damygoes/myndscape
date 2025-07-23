import { COLORS } from '@/constants/colors';
import { useAuthActions } from '@/features/auth/hooks/useAuthActions';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

export function LoginForm() {
  const { sendMagicLink } = useAuthActions();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

  const handleSendLink = async () => {
    setLoading(true);

    const trimmedEmail = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!trimmedEmail || !isValidEmail) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      await sendMagicLink(trimmedEmail);
      Alert.alert('Check Your Email', 'We sent you a magic link to log in.');
    } catch (err) {
      console.error('Magic link error:', err);
      const message =
        err instanceof Error ? err.message : 'An unknown error occurred.';
      Alert.alert('Login Error', message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (error) setError(null); // Clear error when user starts typing
  };

  return (
    <View className="w-full gap-8 px-2 py-4">
      <View>
        <TextInput
          placeholder="Your email"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={colors.textSecondary}
          style={{
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 16,
            padding: 18,
            backgroundColor: colors.inputBackground,
            color: colors.textPrimary,
          }}
        />

        {error && (
          <Text
            style={{
              color: colors.danger,
              fontSize: 14,
              fontWeight: '400',
              marginVertical: 12,
            }}
          >
            {error}
          </Text>
        )}
      </View>

      <TouchableOpacity
        onPress={handleSendLink}
        disabled={loading}
        style={{
          backgroundColor: colors.primary,
          padding: 18,
          borderRadius: 999,
          alignItems: 'center',
        }}
      >
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Ionicons name="mail-outline" size={20} color={colors.white} />
            <Text
              style={{ fontWeight: 'bold', color: colors.white, fontSize: 18 }}
            >
              Send Magic Link
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
