import { COLORS } from '@/constants/colors';
import { Alert, ActivityIndicator, Text, View } from 'react-native';
import { useDeleteUserAccount } from './hooks/useDeleteUserAccount';

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
    <Text
      style={{
        color: COLORS.dark.danger,
        fontWeight: '400',
        textAlign: 'center',
        fontSize: 14,
        textDecorationLine: 'underline',
      }}
      onPress={handleDeleteAccount}
    >
      Delete My Account
    </Text>
  );
}
