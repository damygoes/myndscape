import { APP_COLORS } from '@/constants/colors';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useUpdateUserProfile } from '../hooks/useUpdateUserProfile';
import { renderField } from '../utils/renderField';
import { Button } from '@/components/button/Button';

type Props = {
  userId: string;
  email: string;
  bio?: string | null;
  username: string | null;
  onProfileUpdate: () => void;
};

export function ProfileForm({
  userId,
  email,
  bio,
  username,
  onProfileUpdate,
}: Props) {

  const [displayName, setDisplayName] = useState(username || '');
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
        { backgroundColor: APP_COLORS['primary-background'], shadowColor: APP_COLORS['background-stroke'] },
      ]}
    >
      {renderField({
        label: 'Username',
        value: displayName,
        setValue: setDisplayName,
        editing,
      })}

      {renderField({
        label: 'Bio',
        value: userBio,
        setValue: setUserBio,
        editing,
        multiline: true,
      })}

      <Text style={[styles.label, { color: APP_COLORS['body-text-disabled'] }]}>Email</Text>
      <Text style={[styles.staticText, { color: APP_COLORS['body-text'] }]}>
        {email}
      </Text>

      <View style={styles.actions}>
        {editing ? (
          <>
            <Button
              title='Save'
              onPress={handleSave}
              loading={saving}
              size='small'
            />
            <Button
              title='Cancel'
              onPress={() => setEditing(false)}
              variant='outline'
              size='small'
              disabled={saving}
            />
          </>
        ) : (
          <Button
            title='Edit Profile'
            onPress={() => setEditing(true)}
          />
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
});
