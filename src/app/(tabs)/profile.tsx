import { ThemedSafeAreaView } from '@/components/layouts/ThemedSafeAreaView';
import { useAuth } from '@/features/auth/components/AuthContext';
import { LogoutButton } from '@/features/auth/components/LogoutButton';
import { ProfileDetailsWithAvatar } from '@/features/profile/components/ProfileDetailsWithAvatar';
import { supabase } from '@/services/supabase';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

export default function ProfileScreen() {
  const { session, loading } = useAuth();
  const user = session?.user;

  const [avatarUrl, setAvatarUrl] = useState<string | null>(user?.user_metadata?.avatar_url || null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

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
      <View className="flex-1 gap-4 px-4 py-10">
        <ProfileDetailsWithAvatar
          email={user.email || ''}
          initialDisplayName={user.user_metadata?.display_name || ''}
          initialAvatarUrl={avatarUrl}
          userId={user.id}
          onAvatarUpdate={setAvatarUrl}
        />
       <LogoutButton />
      </View>
    </ThemedSafeAreaView>
  );
}
