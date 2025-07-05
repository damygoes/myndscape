import { Card, CardContent } from '@/components/card/Card';
import { colors } from '@/utils/colors';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useUpdateUserProfile } from '../hooks/useUpdateUserProfile';

type Props = {
  userId: string;
  email: string;
  fullname?: string | null;
  bio?: string | null;
  initialDisplayName: string | null;
  onProfileUpdate: () => void;
};

export function ProfileDetails({
  userId,
  email,
  fullname,
  bio,
  initialDisplayName,
  onProfileUpdate,
}: Props) {
  const [displayName, setDisplayName] = useState(initialDisplayName || '');
  const [fullName, setFullName] = useState(fullname || '');
  const [userBio, setUserBio] = useState(bio || '');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      await useUpdateUserProfile(userId, {
        display_name: displayName,
        fullname: fullName,
        bio: userBio,
      });

      Alert.alert('Profile updated');
      await onProfileUpdate();
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Could not update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card style={{ width: '100%' }}>
      <CardContent className="gap-4">
        <View className="gap-2">
          <Text style={{ color: colors.textMuted }}>Full Name:</Text>
          {editing ? (
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              style={{
                borderColor: colors.border,
                borderWidth: 1,
                padding: 8,
                borderRadius: 6,
                backgroundColor: colors.inputBackground,
                color: colors.textPrimary,
              }}
            />
          ) : (
            <Text className="text-lg" style={{ color: colors.textPrimary }}>{fullName || 'Not set'}</Text>
          )}
        </View>

        <View className="gap-2">
          <Text style={{ color: colors.textMuted }}>Display Name (username):</Text>
          {editing ? (
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="Enter your username"
              style={{
                borderColor: colors.border,
                borderWidth: 1,
                padding: 8,
                borderRadius: 6,
                backgroundColor: colors.inputBackground,
                color: colors.textPrimary,
              }}
            />
          ) : (
            <Text className="text-lg" style={{ color: colors.textPrimary}} >{displayName || 'Not set'}</Text>
          )}
        </View>

        <View className="gap-2">
          <Text style={{ color: colors.textMuted }}>Bio:</Text>
          {editing ? (
            <TextInput
              multiline
              numberOfLines={3}
              value={userBio}
              onChangeText={setUserBio}
              placeholder="Tell us about yourself"
              style={{
                borderColor: colors.border,
                borderWidth: 1,
                padding: 8,
                borderRadius: 6,
                backgroundColor: colors.inputBackground,
                textAlignVertical: 'top', // ensures multiline starts at the top
                color: colors.textPrimary,
              }}
            />
          ) : (
            <Text className="text-base" style={{ color: colors.textPrimary }}>{userBio || 'Not set'}</Text>
          )}
        </View>

        {/* Email (read-only) */}
        <View className="gap-2">
          <Text style={{ color: colors.textMuted }}>Email:</Text>
          <Text className="text-lg" style={{ color: colors.textPrimary }}>{email}</Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row-reverse justify-start gap-6 mt-8">
          {editing ? (
            <>
              <TouchableOpacity
                onPress={handleSave}
                disabled={saving}
                style={{
                  backgroundColor: colors.primary,
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  borderRadius: 6,
                }}
              >
                {saving ? (
                  <ActivityIndicator color={colors.textPrimary} />
                ) : (
                  <Text style={{ color: colors.textPrimary, textAlign: 'center' }}>Save</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setEditing(false)}
                style={{
                  backgroundColor: colors.cardBackground,
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: colors.textPrimary, textAlign: 'center' }}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => setEditing(true)}
              style={{
                backgroundColor: colors.primary,
                paddingVertical: 10,
                paddingHorizontal: 16,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: colors.textPrimary, textAlign: 'center' }}>Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>
      </CardContent>
    </Card>
  );
}
