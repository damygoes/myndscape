import { Card, CardContent } from '@/components/card/Card';
import { supabase } from '@/services/supabase';
import { colors } from '@/utils/colors';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
  email: string;
  initialDisplayName: string;
};

export function ProfileDetails({ email, initialDisplayName }: Props) {
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      const { error } = await supabase.auth.updateUser({
        data: { display_name: displayName },
      });

      if (error) throw error;

      Alert.alert('Profile updated');
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
          <Text style={{ color: colors.textMuted }}>Display Name:</Text>
          {editing ? (
            <TextInput
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="Enter your name"
              style={{
                borderColor: colors.border,
                borderWidth: 1,
                padding: 8,
                borderRadius: 6,
                backgroundColor: colors.inputBackground,
              }}
            />
          ) : (
            <Text className="text-lg font-medium">{displayName || 'Not set'}</Text>
          )}
        </View>

        {/* Email */}
        <View className="gap-2">
          <Text style={{ color: colors.textMuted }}>Email:</Text>
          <Text className="text-lg font-medium">{email}</Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row-reverse justify-start gap-4 mt-4">
          {editing ? (
            <>
              <TouchableOpacity
                onPress={handleSave}
                disabled={saving}
                style={{
                  backgroundColor: colors.primary,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 6,
                  opacity: saving ? 0.6 : 1,
                }}
              >
                <Text style={{ color: colors.background, fontWeight: 'bold' }}>
                  {saving ? 'Saving...' : 'Save'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setEditing(false)}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 6,
                  backgroundColor: colors.cardBackground,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text style={{ color: colors.textPrimary }}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => setEditing(true)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 6,
                backgroundColor: colors.primary,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>
      </CardContent>
    </Card>
  );
}