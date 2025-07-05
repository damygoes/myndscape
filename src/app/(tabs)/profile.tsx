import { SafeScrollView } from '@/components/layouts/SafeScrollView';
import { ThemedSafeAreaView } from '@/components/layouts/ThemedSafeAreaView';
import { useAuth } from '@/features/auth/components/AuthContext';
import { LogoutButton } from '@/features/auth/components/LogoutButton';
import { ProfileDetailsWithAvatar } from '@/features/profile/components/ProfileDetailsWithAvatar';
import React from 'react';
import { Text, View } from 'react-native';

export default function ProfileScreen() {
  const { session, loading } = useAuth();
  const user = session?.user;

  if (loading) {
    return (
      <ThemedSafeAreaView>
        <View className="items-center justify-start w-full min-h-full">
          <Text>Loading...</Text>
        </View>
      </ThemedSafeAreaView>
    );
  }

  if (!user) {
    return (
      <ThemedSafeAreaView>
        <View className="items-center justify-center flex-1 px-10">
          <Text>You are not logged in.</Text>
        </View>
      </ThemedSafeAreaView>
    );
  }

  return (
    <ThemedSafeAreaView>
      <SafeScrollView className="flex-1 mb-6">
        <View className="items-center justify-start w-full min-h-full">
          <ProfileDetailsWithAvatar userId={user.id} />
          <LogoutButton className='w-full' />
        </View>
      </SafeScrollView>
    </ThemedSafeAreaView>
  );
}
