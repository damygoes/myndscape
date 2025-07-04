import { Card, CardContent } from '@/components/card/Card';
import React from 'react';
import { Text } from 'react-native';
import { useUserProfile } from '../hooks/useUserProfile';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileDetails } from './ProfileDetails';

type Props = {
  userId: string;
};

export function ProfileDetailsWithAvatar({ userId }: Props) {
  const { user, loading, error, refreshUser } = useUserProfile(userId);

  const handleAvatarUpdate = async () => {
    await refreshUser();
  };

  const handleProfileUpdate = async () => {
    await refreshUser();
  };

  if (loading) return <Text>Loading profile...</Text>;
  if (error || !user) return <Text>Error loading profile.</Text>;

  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-4">
        <ProfileAvatar
          avatarUrl={user.avatar_url}
          userId={userId}
          userEmail={user.email}
          onAvatarUpdate={handleAvatarUpdate}
          shape="circle"
        />
        <ProfileDetails
          email={user.email}
          fullname={user.fullname}
          initialDisplayName={user.display_name}
          userId={userId}
          bio={user.bio}
          onProfileUpdate={handleProfileUpdate}
        />
      </CardContent>
    </Card>
  );
}