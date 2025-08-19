import { ErrorState } from '@/components/ErrorState';
import { LoadingState } from '@/components/LoadingState';
import { COLORS } from '@/constants/colors';
import React from 'react';
import { useColorScheme } from 'react-native';
import { useUserProfile } from '../hooks/useUserProfile';
import { ProfileForm } from './ProfileForm';

type Props = { userId: string };

export function ProfileDetailsWithForm({ userId }: Props) {
  const { user, loading, error, refreshUser } = useUserProfile(userId);
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

  if (loading) return <LoadingState message="Loading profile..." />;
  if (error || !user) return <ErrorState message="Failed to load profile." />;

  return (
    <ProfileForm
      userId={userId}
      email={user.email}
      fullname={user.username}
      bio={user.bio}
      initialDisplayName={user.username}
      onProfileUpdate={refreshUser}
    />
  );
}
