import { Button } from '@/components/button/Button';
import { APP_COLORS } from '@/constants/colors';
import { Plan } from '@/features/paywall/types';
import { useCurrentUserProfile } from '@/features/profile/hooks/useCurrentUserProfile';
import { useUserUsageContext } from '@/features/user/contexts/UserUsageContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Text, View } from 'react-native';
import { useDeleteUserAccount } from '../hooks/useDeleteUserAccount';

export default function AccountDeletionScreen() {
  const { data: userUsage } = useUserUsageContext();
  const { userId } = useCurrentUserProfile();
  const { mutateAsync, isPending } = useDeleteUserAccount();

  const isPremium = userUsage?.plan_id === Plan.PREMIUM;

  const handleDelete = async () => {
    if (!userId) {
      console.error('User ID is undefined. Cannot delete account.');
      Alert.alert('Error', 'Unable to delete account. Please try again later.');
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
        Thinking of leaving?
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
          You currently have a{' '}
          <Text style={{ fontWeight: '600' }}>Premium subscription</Text>. You
          can downgrade to our free plan and keep enjoying journaling, mood
          tracking, and insights without losing everything.
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
          We’re sad to see you go 💔. If you delete your account, all your
          entries, mood history, reminders, and personalized insights will be
          permanently erased.
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
          ⚠️ What will be deleted:
        </Text>
        <Text
          style={{
            fontFamily: 'Manrope',
            fontSize: 14,
            color: APP_COLORS['body-text-disabled'],
            marginTop: 12,
          }}
        >
          • Your subscription (if active){'\n'}• All journal entries{'\n'}• Mood
          tracking history{'\n'}• AI summaries & insights{'\n'}• Reminders &
          personal settings
        </Text>
      </View>

      {/* Actions */}
      <Button
        title="Keep my account"
        onPress={() => router.back()}
        style={{
          marginBottom: 16,
        }}
        disabled={isPending}
      />
      <Button
        title="Permanently Delete Account"
        onPress={handleDelete}
        variant="outline"
        disabled={isPending}
        loading={isPending}
      />
    </View>
  );
}
