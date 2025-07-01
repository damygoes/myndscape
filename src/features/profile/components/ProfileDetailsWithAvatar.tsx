import { Card, CardContent } from '@/components/card/Card';
import { supabase } from '@/services/supabase';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileDetails } from './ProfileDetails';

type Props = {
  email: string;
  initialDisplayName: string;
  initialAvatarUrl: string | null;
  userId: string;
  onAvatarUpdate: (url: string) => void;
};

export function ProfileDetailsWithAvatar({
  email,
  initialDisplayName,
  initialAvatarUrl,
  userId,
  onAvatarUpdate,
}: Props) {
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      const { error } = await supabase.auth.updateUser({
        data: { display_name: displayName },
      });

      if (error) throw error;

      Alert.alert('Profile updated');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Could not update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="flex flex-col items-center gap-4">
        <ProfileAvatar
          avatarUrl={initialAvatarUrl}
          userId={userId}
          userEmail={email}
          onAvatarUpdate={onAvatarUpdate}
          shape="circle"
        />
        <ProfileDetails
            email={email}
            initialDisplayName={initialDisplayName}
        />
      </CardContent>
    </Card>
  );
}
