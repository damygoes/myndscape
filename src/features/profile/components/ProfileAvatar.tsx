import { COLORS } from '@/constants/colors';
import { supabase } from '@/services/supabase';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
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
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

  const [uploading, setUploading] = useState(false);

  const handlePickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const file = result.assets[0];
      await uploadAvatar(file.uri);
    }
  };

  const uploadAvatar = async (uri: string) => {
    try {
      setUploading(true);

      const { data: userData } = await supabase.auth.getUser();

      if (!userData?.user?.id) {
        throw new Error('No logged in user found. Cannot update avatar.');
      }

      const fileName = `${userId}-${Date.now()}.jpg`;

      const testImageUri =
        'https://dummyimage.com/300x300/cccccc/000000&text=Logo';

      const response = await fetch(testImageUri);

      if (!response.ok) {
        throw new Error('Failed to fetch image from URI');
      }

      const blob = await response.blob();
      console.log('Blob size:', blob.size);

      if (blob.size === 0) {
        throw new Error('Blob is empty');
      }

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, blob, { upsert: true });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Create a signed URL for the uploaded avatar
      const { data, error } = await supabase.storage
        .from('avatars')
        .createSignedUrl(fileName, 60 * 60);

      if (error) throw error;

      const signedUrl = data.signedUrl;
      console.log('signed URL:', signedUrl);

      // Update avatar_url in users table
      const { error: updateError } = await supabase
        .from('users')
        .update({ avatar_url: signedUrl })
        .eq('id', userId);

      if (updateError) throw updateError;

      onAvatarUpdate(signedUrl);
    } catch (error) {
      console.error('Avatar upload failed:', error);
      Alert.alert(
        'Avatar Upload Failed',
        'Could not upload avatar. Please try again.'
      );
    } finally {
      setUploading(false);
    }
  };

  const getInitials = () => {
    if (!userEmail) return '';
    const namePart = userEmail.split('@')[0];
    return namePart
      .split(/[\W_]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  };

  const containerStyle = {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: shape === 'circle' ? 999 : 12,
    backgroundColor: colors.background,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    overflow: 'hidden' as const,
  };

  const initialsStyle = {
    color: colors.textMuted,
    fontSize: 36,
    fontWeight: 'bold' as const,
  };

  return (
    <TouchableOpacity
      onPress={uploading ? undefined : handlePickAvatar}
      activeOpacity={0.7}
    >
      <View style={containerStyle}>
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
            onError={(e) => console.log('Image load error:', e.nativeEvent)}
          />
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              backgroundColor: colors.cardBackground,
              width: '100%',
              height: '100%',
            }}
          >
            <Text style={initialsStyle}>{getInitials() || '?'}</Text>
          </View>
        )}

        {uploading && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: colors.shadow,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: colors.background }}>Uploading...</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
