import { Input } from '@/components/input/Input';
import { Button } from '@/components/button/Button';
import { COLORS } from '@/constants/colors';
import { useAuthActions } from '@/features/auth/hooks/useAuthActions';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { router } from 'expo-router';

export function LoginForm() {
  const { sendMagicLink } = useAuthActions();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleBackToOnboarding = () => {
    router.replace('/onboarding');
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (error) setError(null);
  };

  return (
    <View className="w-full gap-8 px-2 py-4">
      <Input
        label="Email"
        placeholder="Enter your email address"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
        error={error || undefined}
      />

      <View>
        <Button
          title="Send Access Link"
          onPress={handleSendLink}
          loading={loading}
          variant="primary"
          size="large"
        />

        <Button
          title="Tell me about Myndscape"
          onPress={handleBackToOnboarding}
          disabled={loading}
          variant="link"
          size="small"
          style={{ marginTop: 24 }}
        />
      </View>
    </View>
  );
}
