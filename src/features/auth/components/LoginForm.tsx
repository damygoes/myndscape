import { Button } from '@/components/button/Button';
import { Input } from '@/components/input/Input';
import { useAuthActions } from '@/features/auth/hooks/useAuthActions';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';

export function LoginForm() {
  const { t } = useAppLocale();
  const { sendMagicLink } = useAuthActions();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendLink = async () => {
    setLoading(true);

    const trimmedEmail = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!trimmedEmail || !isValidEmail) {
      setError(t('LoginForm.ValidationError.email'));
      setLoading(false);
      return;
    }

    try {
      await sendMagicLink(trimmedEmail);
      Alert.alert(
        t('LoginForm.Alert.successTitle'),
        t('LoginForm.Alert.successDescription')
      );
    } catch (err) {
      console.error('Magic link error:', err);
      const message =
        err instanceof Error
          ? err.message
          : t('LoginForm.Alert.errorDescription');
      Alert.alert(t('LoginForm.Alert.errorTitle'), message);
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
        label={t('LoginForm.emailLabel')}
        placeholder={t('LoginForm.emailPlaceholder')}
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
        error={error || undefined}
      />

      <View>
        <Button
          title={t('LoginForm.button')}
          onPress={handleSendLink}
          loading={loading}
          variant="primary"
          size="large"
        />

        <Button
          title={t('LoginForm.infoButton')}
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
