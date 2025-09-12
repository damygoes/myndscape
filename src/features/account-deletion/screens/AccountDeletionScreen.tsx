import { Button } from '@/components/button/Button';
import { APP_COLORS } from '@/constants/colors';
import { Plan } from '@/features/paywall/types';
import { useCurrentUserProfile } from '@/features/profile/hooks/useCurrentUserProfile';
import { useUserUsageContext } from '@/features/user/contexts/UserUsageContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Text, View } from 'react-native';
import { useDeleteUserAccount } from '../hooks/useDeleteUserAccount';
import { useAppLocale } from '@/services/i18n/useAppLocale';

export default function AccountDeletionScreen() {
  const { t } = useAppLocale();
  const { data: userUsage } = useUserUsageContext();
  const { userId } = useCurrentUserProfile();
  const { mutateAsync, isPending } = useDeleteUserAccount();

  const isPremium = userUsage?.plan_id === Plan.PREMIUM;

  const handleDelete = async () => {
    if (!userId) {
      console.error('User ID is undefined. Cannot delete account.');
      Alert.alert(
        t('DeleteAccountModal.Alerts.errorTitle'),
        t('DeleteAccountModal.Alerts.errorDescription')
      );
      return;
    }
    try {
      await mutateAsync({ id: userId });
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: APP_COLORS['primary-background'],
        padding: 20,
      }}
    >
      {/* Icon / Illustration */}
      <View style={{ alignItems: 'center', marginVertical: 24 }}>
        <Ionicons name="warning-outline" size={64} color={APP_COLORS.error} />
      </View>

      {/* Heading */}
      <Text
        style={{
          fontFamily: 'Manrope',
          fontSize: 22,
          fontWeight: '700',
          textAlign: 'center',
          color: APP_COLORS['body-text'],
          marginBottom: 12,
        }}
      >
        {t('DeleteAccountModal.title')}
      </Text>

      {/* Dynamic Description */}
      {isPremium ? (
        <Text
          style={{
            fontFamily: 'Manrope',
            fontSize: 16,
            textAlign: 'center',
            color: APP_COLORS['body-text-disabled'],
            marginBottom: 20,
          }}
        >
          {t('DeleteAccountModal.Description.premium')}
        </Text>
      ) : (
        <Text
          style={{
            fontFamily: 'Manrope',
            fontSize: 16,
            textAlign: 'center',
            color: APP_COLORS['body-text-disabled'],
            marginBottom: 20,
          }}
        >
          {t('DeleteAccountModal.Description.free')}
        </Text>
      )}

      {/* Warning Box */}
      <View
        style={{
          backgroundColor: APP_COLORS.offwhite,
          borderRadius: 12,
          padding: 16,
          marginBottom: 32,
          borderWidth: 1,
          borderColor: APP_COLORS['body-text-disabled'],
        }}
      >
        <Text
          style={{
            fontFamily: 'Manrope',
            fontSize: 14,
            color: APP_COLORS['body-text'],
          }}
        >
          {t('DeleteAccountModal.Warning.title')}
        </Text>
        <Text
          style={{
            fontFamily: 'Manrope',
            fontSize: 14,
            color: APP_COLORS['body-text-disabled'],
            marginTop: 12,
          }}
        >
          {t('DeleteAccountModal.Warning.list.0')}
          {'\n'}
          {t('DeleteAccountModal.Warning.list.1')}
          {'\n'}
          {t('DeleteAccountModal.Warning.list.2')}
          {'\n'}
          {t('DeleteAccountModal.Warning.list.3')}
          {'\n'}
          {t('DeleteAccountModal.Warning.list.4')}
        </Text>
      </View>

      {/* Actions */}
      <Button
        title={t('DeleteAccountModal.Actions.keepAccount')}
        onPress={() => router.back()}
        style={{
          marginBottom: 16,
        }}
        disabled={isPending}
      />
      <Button
        title={t('DeleteAccountModal.Actions.deleteAccount')}
        onPress={handleDelete}
        variant="outline"
        disabled={isPending}
        loading={isPending}
      />
    </View>
  );
}
