import { supabase } from '@/services/supabase';
import { colors } from '@/utils/colors';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  avatarUrl: string | null;
  userId: string;
  userEmail: string;
  onAvatarUpdate: (url: string) => void;
  shape?: 'circle' | 'rounded';
};

export function ProfileAvatar({
  avatarUrl,
  userId,
  userEmail,
  onAvatarUpdate,
  shape = 'circle',
}: Props) {
  const [uploading, setUploading] = useState(false);

  const handlePickAvatar = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled && result.assets.length > 0) {
        const file = result.assets[0];
        await uploadAvatar(file.uri);
      }
    } catch (error) {
      console.error('Image picking error:', error);
    }
  };

  const uploadAvatar = async (uri: string) => {
    try {
      setUploading(true);

      const fileName = `avatars/${userId}-${Date.now()}.jpg`;
      const response = await fetch(uri);
      const blob = await response.blob();

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, blob, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: publicUrl } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      if (publicUrl?.publicUrl) {
        await supabase.auth.updateUser({
          data: { avatar_url: publicUrl.publicUrl },
        });

        onAvatarUpdate(publicUrl.publicUrl);
      }
    } catch (error) {
      console.error('Avatar upload failed:', error);
      Alert.alert('Upload Failed', 'Could not upload avatar. Try again.');
    } finally {
      setUploading(false);
    }
  };

  const getInitials = () => {
    if (!userEmail) return '';
    const namePart = userEmail.split('@')[0];
    return namePart.slice(0, 2).toUpperCase();
  };

  const containerStyle = {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: shape === 'circle' ? 999 : 12,
    backgroundColor: colors.surfaceBackground,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    overflow: 'hidden' as const,
    opacity: uploading ? 0.6 : 1,  // Slight fade during upload
  };

  return (
    <TouchableOpacity onPress={uploading ? undefined : handlePickAvatar} activeOpacity={0.7}>
      <View style={containerStyle}>
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
          />
        ) : (
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text style={{ color: colors.textMuted, fontSize: 24 }}>{getInitials()}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}