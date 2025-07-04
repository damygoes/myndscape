import { SafeScrollView } from '@/components/layouts/SafeScrollView';
import { ThemedSafeAreaView } from '@/components/layouts/ThemedSafeAreaView';
import { useAuth } from '@/features/auth/components/AuthContext';
import { LogoutButton } from '@/features/auth/components/LogoutButton';
import { ProfileDetailsWithAvatar } from '@/features/profile/components/ProfileDetailsWithAvatar';
import React from 'react';
import { Text } from 'react-native';

export default function ProfileScreen() {
  const { session, loading } = useAuth();
  const user = session?.user;

  if (loading) {
    return (
      <ThemedSafeAreaView>
        <Text>Loading...</Text>
      </ThemedSafeAreaView>
    );
  }

  if (!user) {
    return (
      <ThemedSafeAreaView>
        <Text>You are not logged in.</Text>
      </ThemedSafeAreaView>
    );
  }

  return (
    <ThemedSafeAreaView>
      <SafeScrollView className="mb-6">
        <ProfileDetailsWithAvatar userId={user.id} />
        <LogoutButton />
      </SafeScrollView>
    </ThemedSafeAreaView>
  );
}
