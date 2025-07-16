import { COLORS } from '@/constants/colors';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
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
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

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
    <View
      style={{
        backgroundColor: colors.cardBackground,
        borderRadius: 24,
        padding: 24,
        width: '100%',
        shadowColor: colors.shadow,
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 30,
        overflow: 'hidden',
      }}
    >
      {/* Full Name */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ color: colors.textMuted, marginBottom: 4 }}>
          Full Name:
        </Text>
        {editing ? (
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
            placeholderTextColor={colors.inputPlaceholder}
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
          <Text style={{ color: colors.textPrimary, fontSize: 18 }}>
            {fullName || 'Not set'}
          </Text>
        )}
      </View>

      {/* Display Name */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ color: colors.textMuted, marginBottom: 4 }}>
          Display Name (username):
        </Text>
        {editing ? (
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Enter your username"
            placeholderTextColor={colors.inputPlaceholder}
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
          <Text style={{ color: colors.textPrimary, fontSize: 18 }}>
            {displayName || 'Not set'}
          </Text>
        )}
      </View>

      {/* Bio */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ color: colors.textMuted, marginBottom: 4 }}>Bio:</Text>
        {editing ? (
          <TextInput
            multiline
            numberOfLines={3}
            value={userBio}
            onChangeText={setUserBio}
            placeholder="Tell us about yourself"
            placeholderTextColor={colors.inputPlaceholder}
            style={{
              borderColor: colors.border,
              borderWidth: 1,
              padding: 8,
              borderRadius: 6,
              backgroundColor: colors.inputBackground,
              textAlignVertical: 'top',
              color: colors.textPrimary,
            }}
          />
        ) : (
          <Text style={{ color: colors.textPrimary, fontSize: 16 }}>
            {userBio || 'Not set'}
          </Text>
        )}
      </View>

      {/* Email */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ color: colors.textMuted, marginBottom: 4 }}>Email:</Text>
        <Text style={{ color: colors.textPrimary, fontSize: 18 }}>{email}</Text>
      </View>

      {/* Action Buttons */}
      <View
        style={{
          flexDirection: 'row-reverse',
          justifyContent: 'flex-start',
          gap: 16,
          marginTop: 24,
        }}
      >
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
                <Text
                  style={{
                    color: colors.textPrimary,
                    textAlign: 'center',
                    fontSize: 16,
                  }}
                >
                  Save
                </Text>
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
              <Text
                style={{
                  color: colors.textPrimary,
                  textAlign: 'center',
                  fontSize: 16,
                }}
              >
                Cancel
              </Text>
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
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                color: colors.textPrimary,
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
