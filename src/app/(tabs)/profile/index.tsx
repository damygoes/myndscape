import { ErrorState } from '@/components/ErrorState';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { COLORS } from '@/constants/colors';
import { LogoutButton } from '@/features/auth/components/LogoutButton';
import { ProfileDetailsWithForm } from '@/features/profile/components/ProfileDetailsWithForm';
import { useSupabaseSession } from '@/services/SupabaseAuthProvider';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function ProfileScreen() {
  const { session } = useSupabaseSession();

  if (!session?.user) {
    return <ErrorState message="Failed to load your profile." />;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: COLORS.light.background,
        dark: COLORS.dark.background,
      }}
      headerImage={
        <Image
          source={require('../../../../assets/images/hero-3.jpg')}
          style={styles.headerImage}
          contentFit="cover"
          cachePolicy="memory-disk"
          transition={300}
          priority="high"
        />
      }
    >
      <ProfileDetailsWithForm userId={session.user.id} />
      <LogoutButton style={styles.logout} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: '100%',
  },
  container: { flex: 1, padding: 20 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logout: { marginTop: 24 },
});
