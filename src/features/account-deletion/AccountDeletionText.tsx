import { APP_COLORS, COLORS } from '@/constants/colors';
import { Alert, ActivityIndicator, Text, View } from 'react-native';
import { useDeleteUserAccount } from './hooks/useDeleteUserAccount';
import { Button } from '@/components/button/Button';

export function AccountDeletionText({ userId }: { userId: string }) {
  const deleteMutation = useDeleteUserAccount();

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteMutation.mutate(
              { id: userId },
              {
                onError: (error) => {
                  Alert.alert(
                    'Error',
                    error.message || 'Failed to delete account'
                  );
                },
                onSuccess: () => {
                  Alert.alert(
                    'Account Deleted',
                    'Your account has been deleted.'
                  );
                },
              }
            );
          },
        },
      ]
    );
  };

  if (deleteMutation.isPending) {
    return (
      <View style={{ alignItems: 'center', marginVertical: 8 }}>
        <ActivityIndicator color={COLORS.dark.danger} />
      </View>
    );
  }

  return (
    <Button
      title="Delete My Account"
      onPress={handleDeleteAccount}
      variant="ghost"
      style={{
        backgroundColor: 'transparent',
        paddingVertical: 0,
        paddingHorizontal: 0,
      }}
      textStyle={{
        fontSize: 14,
        color: APP_COLORS.error,
      }}
    />
  );
}
