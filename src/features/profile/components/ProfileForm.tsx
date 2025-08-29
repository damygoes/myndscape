import { Button } from '@/components/button/Button';
import { APP_COLORS } from '@/constants/colors';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useUpdateUserProfile } from '../hooks/useUpdateUserProfile';
import { renderField } from '../utils/renderField';
import { useAppLocale } from '@/services/i18n/useAppLocale';

type Props = {
  userId: string;
  email: string;
  bio?: string | null;
  username: string | null;
  onProfileUpdate?: () => void;
};

export function ProfileForm({
  userId,
  email,
  bio,
  username,
  onProfileUpdate,
}: Props) {
  const i18n = useAppLocale();
  const [displayName, setDisplayName] = useState(username || '');
  const [userBio, setUserBio] = useState(bio || '');
  const [editMode, setEditMode] = useState(false);

  const updateProfile = useUpdateUserProfile(userId);

  const handleSave = async () => {
    try {
      await updateProfile.mutateAsync({
        username: displayName,
        bio: userBio,
      });
      await onProfileUpdate?.();
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: APP_COLORS['primary-background'],
          shadowColor: APP_COLORS['background-stroke'],
        },
      ]}
    >
      {renderField({
        label: i18n.t('ProfileForm.username'),
        value: displayName,
        setValue: setDisplayName,
        editing: editMode,
      })}

      {renderField({
        label: i18n.t('ProfileForm.bio'),
        value: userBio,
        setValue: setUserBio,
        editing: editMode,
        multiline: true,
      })}

      <Text
        style={[
          styles.label,
          { color: APP_COLORS['body-text-disabled'], fontFamily: 'Manrope' },
        ]}
      >
        {i18n.t('ProfileForm.email')}
      </Text>
      <Text
        style={[
          styles.staticText,
          { color: APP_COLORS['body-text'], fontFamily: 'Manrope' },
        ]}
      >
        {email}
      </Text>

      <View style={styles.actions}>
        {editMode ? (
          <>
            <Button
              title={i18n.t('ProfileForm.save')}
              onPress={handleSave}
              loading={updateProfile.isPending}
              size="small"
            />
            <Button
              title={i18n.t('ProfileForm.cancel')}
              onPress={() => setEditMode(false)}
              variant="outline"
              size="small"
              disabled={updateProfile.isPending}
            />
          </>
        ) : (
          <Button
            title={i18n.t('ProfileForm.update')}
            onPress={() => setEditMode(true)}
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
  label: { fontSize: 12, marginBottom: 0 },
  staticText: {
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row-reverse',
    gap: 12,
    marginTop: 24,
  },
});
