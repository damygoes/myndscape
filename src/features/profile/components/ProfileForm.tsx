import { COLORS } from '@/constants/colors';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { useUpdateUserProfile } from '../hooks/useUpdateUserProfile';
import { renderField } from '../utils/renderField';

type Props = {
  userId: string;
  email: string;
  fullname?: string | null;
  bio?: string | null;
  initialDisplayName: string | null;
  onProfileUpdate: () => void;
};

export function ProfileForm({
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
        username: displayName,
        bio: userBio,
      });
      await onProfileUpdate();
      setEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.cardBackground, shadowColor: colors.shadow },
      ]}
    >
      {renderField({
        label: 'Display Name (username)',
        value: displayName,
        setValue: setDisplayName,
        editing,
        colors,
      })}

      {renderField({
        label: 'Bio',
        value: userBio,
        setValue: setUserBio,
        editing,
        colors,
        multiline: true,
      })}

      <Text style={[styles.label, { color: colors.textMuted }]}>Email</Text>
      <Text style={[styles.staticText, { color: colors.textPrimary }]}>
        {email}
      </Text>

      <View style={styles.actions}>
        {editing ? (
          <>
            <TouchableOpacity
              onPress={handleSave}
              disabled={saving}
              style={[styles.button, { backgroundColor: colors.primary }]}
            >
              {saving ? (
                <ActivityIndicator color={colors.textPrimary} />
              ) : (
                <Text style={{ color: colors.white }}>Save</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setEditing(false)}
              style={styles.button}
            >
              <Text style={{ color: colors.textPrimary }}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            onPress={() => setEditing(true)}
            style={[styles.button, { backgroundColor: colors.primary }]}
          >
            <Text style={{ color: colors.white, fontWeight: '500' }}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 24,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 30,
    width: '100%',
    gap: 16,
  },
  label: { fontSize: 14, marginBottom: 4 },
  staticText: {
    fontSize: 18,
  },
  actions: {
    flexDirection: 'row-reverse',
    gap: 12,
    marginTop: 24,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
});
